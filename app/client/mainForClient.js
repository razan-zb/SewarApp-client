import React, { useRef, useEffect, useState } from 'react';
import * as SC from './styleClientPage';
import { useRouter } from 'expo-router';
import Header from './header';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import {  View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const screenWidth = Dimensions.get('window').width; 


const MainForClient = () => {
  const router = useRouter();
  const scrollViewRef = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items2,setItem2]=useState([]);
  const [video1, setVideo1] = useState([]);
  const [items,setItems]=useState([]);
  const [types,setTypes]=useState([]);




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
        id: (index + 1).toString(),
        src: photoUrl,
      }));
      setItem2(temps)

      const tempsForVideos = theUser.miroVideos.map((videoUrl, index) => ({
        id: (index + 1).toString(),
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
      pathname: `client/detailsScreen?id=${item._id}`,
    });

  };

  const navigateToCategory = (category) => {
    router.replace({
      pathname: '/client/headerSections/listOfItems',
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
              <SC.firstView key={index} >
                <SC.BlurredBackground source={{  uri: item.src}} blurRadius={15} />

                <SC.MaroiImage
                    source={{ uri: item.src}}
                    style={{ resizeMode:"contain",zIndex:2}} 
                  />
              </SC.firstView>
            ))}
            
          </SC.ScrollCon>

        {Platform.OS!='web'&&screenWidth<=600&&

            <SC.ViewForVideo>
            {video1.map((item, index) => (
              <SC.StyledVideo2
                key={index}
                source={{ uri: item.src }}
                useNativeControls={true}
                resizeMode="cover" 
                shouldPlay={true}
      
              />
            ))}
            </SC.ViewForVideo>
          }

          {Platform.OS==='web'&&screenWidth <= 600 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
              {video1.map((item, index) => (
                <video
                  key={index}
                  src={item.src}
                  controls
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow effect
                  }}
                />
              ))}
            </div>
          )}


          {screenWidth>=600&&

              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px' ,gap:'10px',alignSelf:'center'}}>
              {video1.map((item, index) => (
                <video
                  key={index}
                  src={item.src}
                  controls
                  style={{
                    width: '350px',
                    maxWidth: '600px',
                    height: '600px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional shadow effect
                  }}
                />
              ))}
              </div>

            
          }
                    
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
