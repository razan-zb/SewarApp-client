import React, { useRef, useEffect, useState, } from 'react';
import * as SC from './styleEditingCard4';
import { useRouter } from 'expo-router';
import Header from './card4Sections/header'; // Import the Header componentimport vedioDress1 from '../../assets/video/dressV1.mp4'
import { Icon } from 'react-native-elements';
import { TouchableOpacity, View, Image, Dimensions,ActivityIndicator,Alert,Button,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import {fetchUpdateUser,sendVideoFirebase,sendImageFirebase}from "../../../helpers/api"

const screenWidth = Dimensions.get('window').width; 


const MainForClient = () => {
  const router = useRouter();
  const scrollViewRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items2,setItem2]=useState([]);
  const [video1, setVideo1] = useState([]);
  const [items,setItems]=useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [types,setTypes]=useState([]);

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'OK' }]);
    }
  };


  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };


  const pickImage = async (name, imageId) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      const { uri } = result.assets[0];
  
      try {
        const blob = await uriToBlob(uri); // Convert URI to a Blob (if web)
        const formData = new FormData();

        if(Platform.OS==='web'){
          formData.append('file', blob, `${name}.png`);
        }else{
          formData.append('file', {
          uri: uri,  
          name: `${name}.png`,
          type: 'image/png',
        });
        }
        
  
        setLoading1(true);
  
        // Send the image to the server
        const downloadURL = await sendImageFirebase(formData);
  
        if (downloadURL) {
          console.log("yes1")
          const theUser = JSON.parse(await AsyncStorage.getItem('user'));
          console.log(downloadURL.url)
          console.log(imageId)
          theUser.miroPhotos[imageId] = downloadURL.url;
          await AsyncStorage.setItem('user', JSON.stringify(theUser));
          await changeData();

          const result = await fetchUpdateUser(theUser.email, theUser);
  
          if (result.message === "User updated successfully") {
            showAlert('Success', 'Image uploaded successfully!');
          }
  
          const updatedItems2 = items2.map((photo) =>
            photo.id === imageId ? { ...photo, src: downloadURL.url } : photo
          );
          setItem2(updatedItems2);
        }
        else{
          showAlert('Upload Failed', 'There was a problem uploading the image.');

        }
      } catch (error) {
        console.error("Error uploading image:", error);
        showAlert('Upload Failed', 'There was a problem uploading the image.');
      } finally {
        setLoading1(false);
      }
    }
  };

  const pickVideo = async (name,videoId) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const { uri } = result.assets[0];
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: `${name}.mp4`, 
        type: 'video/mp4',
      });
      try {
        setLoading(true);
        const downloadURL = await sendVideoFirebase(formData);
        if(downloadURL){  
          const theUser=JSON.parse(await AsyncStorage.getItem('user'))
          theUser.miroVideos[videoId]=downloadURL.url
          await AsyncStorage.setItem('user', JSON.stringify(theUser));
          await changeData();

          const result=await fetchUpdateUser(theUser.email,theUser)
          if(result.message==="User updated successfully"){
            showAlert('Success', 'Video uploaded successfully!');
          }
          const updatedVideo2 = video1.map(video => 
            video.id === videoId ? { ...video, src: downloadURL.url } : video
          );

          setVideo1(updatedVideo2)
        }
  
      } catch (error) {
        console.error("Error uploading video:", error);
        showAlert('Upload Failed', 'There was a problem uploading the video.');

      } finally {
        setLoading(false);
      }
      
      
      
    }
  };

  const changeData=async()=>{

    const theUser=JSON.parse(await AsyncStorage.getItem('user'))
    const temps = theUser.miroPhotos.map((photoUrl, index) => ({
      id: (index).toString(),
      src: photoUrl,
    }));
    setItem2(temps)

    const tempsForVideos = theUser.miroVideos.map((videoUrl, index) => ({
      id: (index).toString(),
      src: videoUrl,
    }));
    setVideo1(tempsForVideos);
  }
  const fetchData = async () => {

    try {
      const results = await AsyncStorage.getItem('fashionItems');
      const theUser=JSON.parse(await AsyncStorage.getItem('user'))
      const parsedResults = JSON.parse(results);
      const allTypes = parsedResults.map(item => item.type);
      const uniqueTypes = [...new Set(allTypes)];
      setTypes(uniqueTypes)
      setItems(parsedResults)
 
      const temps = theUser.miroPhotos.map((photoUrl, index) => ({
        id: (index).toString(),
        src: photoUrl,
      }));
      setItem2(temps)

      const tempsForVideos = theUser.miroVideos.map((videoUrl, index) => ({
        id: (index).toString(),
        src: videoUrl,
      }));
      setVideo1(tempsForVideos);

    }
    catch(error){
      console.error('Failed to fetch user from storage:', error);
    }
  };


 
  useEffect(() => {
    fetchData();
  }, []);


  const handlePressItem = (item) => {
    router.push({
      pathname: `/mainForAdmin/cards/card4Sections/detailsScreenEdit?id=${item._id}`,
    });

  };

  const navigateToCategory = (category) => {
    router.replace({
      pathname: '/mainForAdmin/cards/card4Sections/listOfItesEdit',
      params: { category }, 
    });
  };

    useEffect(() => {
      const intervalId = setInterval(() => {
        if (scrollViewRef.current) {
          const nextIndex = (currentIndex + 1) % items.length;
          scrollViewRef.current.scrollTo({
            x: nextIndex * screenWidth,
            animated: true,
          });
          setCurrentIndex(nextIndex);
        }
      }, 3000); // Scroll every 3 seconds
  
      return () => clearInterval(intervalId); 
    }, [currentIndex, items.length]);




  return (
    <SC.PageContainer>

      <Header/>
      <SC.ScrollContainer>
            <SC.ScrollCon
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {items2.map((item,index) => (
                <View key={index} style={{height: 200, width: screenWidth }}>
                 <SC.BlurredBackground source={{uri: item.src}} blurRadius={15} />

                  <Image
                      source={{ uri: item.src}}
                      style={{ width: screenWidth, height: 200 ,resizeMode:"contain",zIndex:2 }} 
                    
                  />
      
                  <View style={{  flexDirection: 'row', alignItems: 'center' }}>
                  {loading1 ? (
                      <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                         <><FontAwesome name="edit" size={30} color="#73224B" style={{ marginLeft: 10 }} />
                           <Button title="Change Image" color="#73224B" onPress={()=>{pickImage("mario"+item.id,item.id)}} />
                         </> 
                    )}
                    
                  </View>
                </View>
              ))}
              
            </SC.ScrollCon>


            {Platform.OS !== 'web' && video1.map((item, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <SC.StyledVideo2
                  key={index}
                  source={{ uri: item.src }}
                  useNativeControls={true}
                  resizeMode="cover"
                  shouldPlay={true}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <>
                      <FontAwesome name="edit" size={30} color="#73224B" style={{ marginRight: 10 }} />
                      <Button
                        title="Change Video"
                        color="#73224B"
                        onPress={() => pickVideo(`marioVideo${item.id}`, item.id)}
                      />
                    </>
                  )}
                </View>
              </View>
            ))}


          {Platform.OS === 'web' && screenWidth <= 600 && (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    }}
  >
    {video1.map((item, index) => (
      <div key={index} style={{ marginBottom: '20px', width: '100%', maxWidth: '600px' }}>
        <video
          src={item.src}
          controls
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
          {loading ? (
            <div style={{ marginRight: '10px' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </div>
          ) : (
            <>
              <FontAwesome name="edit" size={30} color="#73224B" style={{ marginRight: '10px' }} />
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#73224B',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
                onClick={() => pickVideo(`marioVideo${item.id}`, item.id)}
              >
                Change Video
              </button>
            </>
          )}
        </div>
      </div>
    ))}
  </div>
)}


        

        


           
          {types?.map((type,index) => (
              <View key={index}>

                <SC.Smallcontainer>
                    <SC.TitleForPage>{type}</SC.TitleForPage>
                    <TouchableOpacity onPress={() => navigateToCategory(type)}>
                      <Icon name="arrow-forward" size={25} color={"#73224B"} />
                    </TouchableOpacity>
                </SC.Smallcontainer>

                <SC.StyledFlatList
                  data={items.filter(item => item.type === type)}
                  keyExtractor={item => item._id}
                  numColumns={1}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <SC.Card onPress={() => handlePressItem(item)}>
                      <SC.BlurredBackground source={{ uri: item.photos[0]}} blurRadius={15} />
                      <SC.CardImage source={{ uri: item.photos[0]}} />
                    </SC.Card>
                  )}
                />

              </View>
            ))}

        </SC.ScrollContainer>

    </SC.PageContainer>
  );
};

export default MainForClient;
