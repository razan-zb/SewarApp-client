import * as SC from '../styleEditingCard4'; 
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect,useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, Button,View } from 'react-native';
import {UpdateFashionItem,DeleteFashionItem} from '../../../../helpers/api'
import { Alert,Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any other icon set
import { useRouter } from 'expo-router';

const DetailsScreen = () => {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [item1, setItem] = useState();
  const { id } = useLocalSearchParams();
  const [TheImages, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [sizeRange, setSizeRange] = useState('');
  const [discreption, setDiscreption] = useState('');

  const fetchData = async () => {
    const results = await AsyncStorage.getItem('fashionItems');
    const parsedResults = JSON.parse(results);
    const foundItem = parsedResults.find(item => item._id === id);

    if (foundItem) {
      const temps = foundItem.photos.map((photoUrl, index) => ({
        id: (index + 1).toString(),
        src: photoUrl,
      }));
      setImages(temps);
      setItem(foundItem);
      setPrice(`${foundItem.price}`);
      setProductName(foundItem.name);
      setSizeRange(foundItem.size);
      setDiscreption(foundItem.description);
    }
  };

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, buttons);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Wrapped in useCallback
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const handleTabPress = () => {
    setActiveTab(!activeTab);
  };

  const handleSave = async () => {
    const updatedItem = {
      _id: item1._id,
      name: productName,
      size: sizeRange,
      price: price,
      description: discreption,
      photos: item1.photos,
      type: item1.type,
    };
    const result = await UpdateFashionItem(updatedItem);
    if (result) {
      showAlert('Success', 'The Item updated successfully.', [{ text: 'OK' }]);
      setIsEditing(false);
    } else {
      showAlert('Failed', 'Something is wrong.', [{ text: 'OK' }]);
    }
  };

  const handleDelete = async () => {
    const result = await DeleteFashionItem(item1._id);
    if (result) {
      showAlert('Success', 'The Item is deleted.', [{ text: 'OK' }]);
      setIsEditing(false);
      router.replace({
        pathname: `/mainForAdmin/cards/card4`,
      });
    } else {
      showAlert('Failed', 'Something is wrong.', [{ text: 'OK' }]);
    }
  };

  return item1 ? (
    <SC.PageContainer2>
      <SC.ViewSection height={activeTab ? 'auto' : '100%'}>
        <SC.Button44 onPress={() => setIsEditing(!isEditing)}>
          <Icon name={isEditing ? 'close-outline' : 'pencil-outline'} size={20} color="white" />
          <SC.ButtonText>{isEditing ? 'Cancel' : 'Edit'}</SC.ButtonText>
        </SC.Button44>

        <FlatList
          data={TheImages}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={handleViewableItemsChanged} // UseCallback ensures stability
          renderItem={({ item }) => (
            <SC.ImageContainer height={activeTab ? 500 : 700}>
              <SC.BlurredBackground3 source={{ uri: item.src }} blurRadius={15} />
              <SC.ImageItem source={{ uri: item.src }} />
            </SC.ImageContainer>
          )}
        />

        <SC.DotContainer>
          {TheImages?.map((_, index) => (
            <SC.Dot key={index} active={index === currentIndex} />
          ))}
        </SC.DotContainer>

        <SC.ArrowButton onPress={handleTabPress} activeTab={activeTab}>
          <FontAwesome name={!activeTab ? 'arrow-up' : 'arrow-down'} size={24} color="#73224B" />
        </SC.ArrowButton>
      </SC.ViewSection>

      <View>
        {activeTab && (
          <SC.Details>
            {isEditing ? (
              <>
                <SC.EditableInput placeholder="الاسم" value={productName} onChangeText={setProductName} />
                <SC.EditableInput placeholder="القياس" value={sizeRange} onChangeText={setSizeRange} />
                <SC.EditableInput placeholder="السعر" value={price} onChangeText={setPrice} />
                <SC.EditableInput placeholder="وصف" value={discreption} onChangeText={setDiscreption} />

                <SC.miniView>
                  <Button title="Save" onPress={handleSave} />
                  <Button title="Delete" onPress={handleDelete} />
                </SC.miniView>
              </>
            ) : (
              <>
                <SC.DetailText>{productName}</SC.DetailText>
                <SC.DetailText>Size range: {sizeRange}</SC.DetailText>
                <SC.PriceText>{price} ₪</SC.PriceText>
                <SC.DetailTextDiscrebtion>{discreption}</SC.DetailTextDiscrebtion>
              </>
            )}
          </SC.Details>
        )}
      </View>
    </SC.PageContainer2>
  ) : (
    <SC.PageContainer2 />
  );
};

export default DetailsScreen;