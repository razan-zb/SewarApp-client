// ItemList.js
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Header from '../header';
import * as S from './styleHeader';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';



const ItemList = () => {


 const router = useRouter();
 const {category} = useLocalSearchParams();
 const [Items,setItems]=useState([])

 
 useEffect(() => {
  getData();

}, []);


  const handlePressItem = (item) => {
    router.push({
      pathname: `client/detailsScreen?id=${item._id}`
    });
  };



  const getData=async() => {
    const results = await AsyncStorage.getItem('fashionItems');
    const parsedResults = JSON.parse(results);
    const filteredItems = parsedResults.filter(item => item.type === category);
    setItems(filteredItems);
  }



  return (
    (category)?(
    <S.PageContainer>
        <Header/>
      <S.TitleForPage6 >{category==="All"?"Full Catalog":`${category}  Catalog`}</S.TitleForPage6>

      <S.StyledFlatList1
        data={Items || []}
        keyExtractor={(item,index) => index}
        renderItem={({item}) => (
            <S.Card1 onPress={() => handlePressItem(item)}>
              <S.BlurredBackground source={{ uri: item.photos[0]}} blurRadius={15} />
              <S.CardImage  source={{ uri: item.photos[0]}}/>
              {/* <S.CardName  style={{ fontSize: 29, fontFamily: 'cursive' }}>{item}</S.CardName> */}

            </S.Card1>
            
          )}
      />
    </S.PageContainer>):(<View>no items!!</View>)
  );
};

export default ItemList;
