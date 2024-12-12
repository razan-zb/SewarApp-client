import * as SC from './styleClientPage'; 
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

const DetailsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [item1, setItem] = useState();
  const { id } = useLocalSearchParams();
  const [TheImages, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState(false);

  // Fetching data from AsyncStorage and setting state
  const fetchData = async () => {
    const results = await AsyncStorage.getItem('fashionItems');
    const parsedResults = JSON.parse(results);
    const foundItem = parsedResults.find(item => item._id === id);
    
    setItem(foundItem);

    if (foundItem) {
      const temps = foundItem.photos.map((photoUrl, index) => ({
        id: (index + 1).toString(),
        src: photoUrl,
      }));
      setImages(temps);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Viewable items handler moved out of render method
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
    [] 
  );

  const handleTabPress = () => {
    setActiveTab(prev => !prev); // Toggle the activeTab state
  };

  return (
    item1 ? (
      <SC.PageContainer2>
        <SC.ViewSection height={activeTab ? 'auto' : '100%'}>
          <FlatList
            data={TheImages}
            keyExtractor={item => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={handleViewableItemsChanged} 
            renderItem={({ item }) => (
              <SC.ImageContainer height={activeTab ? 500 : 700}>
                <SC.BlurredBackground3 source={{ uri: item.src }} blurRadius={5} />
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
            <FontAwesome name={!activeTab ? "arrow-up" : "arrow-down"} size={24} color="#73224B" />
          </SC.ArrowButton>
        </SC.ViewSection>

        <View>
          {activeTab && (
            <SC.Details>
              <SC.DetailText>{item1.name}</SC.DetailText>
              <SC.DetailText>Size range: {item1.size}</SC.DetailText>
              <SC.PriceText>{item1.price} ₪</SC.PriceText>
              <SC.DetailTextDiscrebtion>{item1?.description}</SC.DetailTextDiscrebtion>
            </SC.Details>
          )}
        </View>

      </SC.PageContainer2>
    ) : (
      <SC.PageContainer2 />
    )
  );
};

export default DetailsScreen;
