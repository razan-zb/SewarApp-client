/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StyleSheet, PanResponder, View, TouchableOpacity, Image,Text } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 
import * as S from './cardStyle';
import { MaterialIcons, FontAwesome, Ionicons, Entypo } from '@expo/vector-icons'; // Add Entypo for color icon

const DrawablePage = ({ pageId }) => {
  const [lines, setLines] = useState([]); 
  const [textElements, setTextElements] = useState([]); 
  const [images, setImages] = useState([]); 
  const [selectedText, setSelectedText] = useState(null); 
  const [isEditing, setIsEditing] = useState(false); 
  const [canDraw, setCanDraw] = useState(false); 
  const [selectedColor, setSelectedColor] = useState('white'); // State for selected color
  const [backgroundColor, setBackgroundColor] = useState('black'); // State for background color
  const [history, setHistory] = useState([]);

  const loadElements = async () => {
    try {
      const storedLines = await AsyncStorage.getItem(`drawnLines_${pageId}`);
      const storedTexts = await AsyncStorage.getItem(`textElements_${pageId}`);
      const storedImages = await AsyncStorage.getItem(`images_${pageId}`);

      if (storedLines) setLines(JSON.parse(storedLines));
      if (storedTexts) setTextElements(JSON.parse(storedTexts));
      if (storedImages) setImages(JSON.parse(storedImages));
    } catch (error) {
      console.error("Error loading saved data: ", error);
    }
  };

  const saveElements = async (newLines, newTextElements, newImages) => {
    try {
      await AsyncStorage.setItem(`drawnLines_${pageId}`, JSON.stringify(newLines));
      await AsyncStorage.setItem(`textElements_${pageId}`, JSON.stringify(newTextElements));
      await AsyncStorage.setItem(`images_${pageId}`, JSON.stringify(newImages));
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  useEffect(() => {
    loadElements(); 
  }, []);

  useEffect(() => {
    saveElements(lines, textElements, images); 
  }, [lines, textElements, images]);

  const selectText = (index) => {
    setSelectedText(index);
    setIsEditing(true); 
  };
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => canDraw, 
    onPanResponderMove: (evt) => {
      if (!canDraw) return; 

      const { locationX, locationY } = evt.nativeEvent;
      const lastLine = lines[lines.length - 1];
      if (lastLine) {
        lastLine.points.push({ x: locationX, y: locationY });
        setLines([...lines]);
        const newLine = { points: [{ x: locationX, y: locationY }], color: selectedColor };
        setHistory([...history, { type: 'line', element: newLine }]); // Track action

      }
    },
    onPanResponderGrant: (evt) => {
      if (!canDraw) return;

      const { locationX, locationY } = evt.nativeEvent;
      setLines([...lines, { points: [{ x: locationX, y: locationY }], color: selectedColor }]); // Include color in the line
    }
  });

  const textPanResponder = (index) => PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      const updatedTextElements = [...textElements];
      updatedTextElements[index].x += dx;
      updatedTextElements[index].y += dy;
      setTextElements(updatedTextElements);
    },
  });


  const createImagePanResponder = (index) => {
    let lastScale = 1; // To store the last scale value for pinch-to-zoom
    let initialWidth, initialHeight;
  
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.numberActiveTouches === 2) {
          // Handle pinch-to-zoom (resizing)
          const { scale } = evt.nativeEvent;
          if (scale) {
            const updatedImages = [...images];
            const image = updatedImages[index];
            
            const newScale = scale / lastScale; // Calculate new scale relative to last scale
            
            if (!initialWidth) {
              initialWidth = 200; // Assuming default width/height is 200, adjust as needed
              initialHeight = 200;
            }
  
            image.width = initialWidth * newScale;
            image.height = initialHeight * newScale;
            
            setImages(updatedImages);
            lastScale = scale;
          }
        } else {
          // Handle dragging
          const { dx, dy } = gestureState;
          setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[index].position.x += dx;
            updatedImages[index].position.y += dy;
            return updatedImages;
          });
        }
      },
      onPanResponderRelease: () => {
        lastScale = 1; // Reset last scale when the gesture ends
        initialWidth = null;
        initialHeight = null;
      },
    });
  };

  const clearCanvas =async () => {
    setLines([]);
    setTextElements([]);   
    setImages([]);
    setHistory([]); 

  };



  const undoLastAction = () => {
    if (history.length === 0) return;

    const lastAction = history[history.length - 1];
    setHistory(history.slice(0, -1)); 

    if (lastAction.type === 'line') {
      setLines(lines.slice(0, -1)); 
    } else if (lastAction.type === 'image') {
      setImages(images.slice(0, -1)); 
    } else if (lastAction.type === 'text') {
      setTextElements(textElements.slice(0, -1));
    }
  };
  
  const addText = (text) => {
    const newTextElement = { text, x: 50, y: 50 }; 
    setTextElements([...textElements, newTextElement]);
    setHistory([...history, { type: 'text', element: newTextElement }]); 
    setIsEditing(false);
  };

  const editSelectedText = (newText) => {
    if (selectedText !== null) {
      const updatedTextElements = [...textElements];
      updatedTextElements[selectedText].text = newText;
      setTextElements(updatedTextElements);
    }
  };

  const toggleDrawingMode = () => {
    setCanDraw((prevCanDraw) => !prevCanDraw); 
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  


    if (!result.canceled) {
      const newImage = { 
        uri: result.assets[0].uri, 
        position: { x: 100, y: 100 }, 
        width: 200, 
        height: 200, 
      };
      setImages([...images, newImage]); 
      setHistory([...history, { type: 'image', element: newImage }]); 
    }
  };
  

  const toggleBackgroundColor = () => {
    setBackgroundColor((prev) => (prev === 'black' ? 'white' : 'black'));
  };

  const pickColor = (color) => {
    setSelectedColor(color);
  };

  return (
    <S.DrawablePageContainer {...panResponder.panHandlers} style={{ backgroundColor }}>
        <TouchableOpacity onPress={toggleBackgroundColor}
          style={{
            position: 'absolute', 
            top: -30, 
            right: 10, 
            zIndex: 10 
            }}>
          <Ionicons name="contrast-outline" size={30} color="#0073e6" />
        </TouchableOpacity>
      <Svg style={styles.canvas}>
        {lines.map((line, index) => (
          <Polyline
            key={index}
            points={line.points.map(p => `${p.x},${p.y}`).join(' ')}
            stroke={line.color}
            strokeWidth="3"
            fill="none"
          />
        ))}
      </Svg>

      {images.map((image, index) => (
  <View
    key={index}
    {...createImagePanResponder(index).panHandlers} 
    style={[
      styles.selectedImage,
      { 
        top: image.position.y, 
        left: image.position.x,
        width: image.width || 200,  // Default width
        height: image.height || 200  // Default height
      },
    ]}
  >
    <Image
      source={{ uri: image.uri }}
      style={{ width: '100%', height: '100%' }} 
    />
  </View>
))}


      {textElements.map((element, index) => (
        <View
          key={index}
          {...textPanResponder(index).panHandlers}
          style={[
            styles.draggableText,
            { top: element.y, left: element.x },
            selectedText === index && styles.selectedText, 
          ]}
          onTouchEnd={() => selectText(index)} 
        >
          <Text style={{ color: backgroundColor=="black" ? "white" : "black" , fontSize: 18} }>{element.text}</Text>
        </View>
      ))}

      {isEditing && selectedText !== null && (
        <View>
          <S.TextInputInDraw
            value={textElements[selectedText]?.text}
            onChangeText={(newText) => editSelectedText(newText)}
          />
        </View>
      )}

      <S.ButtonsInDraw>
        <TouchableOpacity onPress={toggleDrawingMode}>
          <MaterialIcons
            name={canDraw ? "brush" : "edit-off"}
            size={30}
            color={canDraw ? selectedColor : '#0073e6'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => addText('New Text')}>
          <FontAwesome name="font" size={30} color="#0073e6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={undoLastAction}>
          <Ionicons name="arrow-undo-sharp" size={30} color="#0073e6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={clearCanvas}>
          <Ionicons name="trash" size={30} color="#0073e6" />
        </TouchableOpacity>

        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="images-outline" size={30} color="#0073e6" />
        </TouchableOpacity>

      {canDraw&&
        <S.ColorsContainer>
            <TouchableOpacity onPress={() => pickColor('red')}>
              <Entypo name="circle" size={30} color="red" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pickColor('blue')}>
              <Entypo name="circle" size={30} color="blue" />
            </TouchableOpacity>

          
            <TouchableOpacity onPress={() => pickColor('pink')}>
              <Entypo name="circle" size={30} color="pink" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pickColor('black')}>
              <Entypo name="circle" size={30} color="black" />
            </TouchableOpacity>
        </S.ColorsContainer>
      } 
      </S.ButtonsInDraw>
    </S.DrawablePageContainer>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
  draggableText: {
    position: 'absolute',
  },
  selectedText: {
    borderColor: 'blue',
    borderWidth: 1,
  },
  selectedImage: {
    position: 'absolute',
  },
});

export default DrawablePage;
