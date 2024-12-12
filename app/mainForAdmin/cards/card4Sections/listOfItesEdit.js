// ItemList.js
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Header from './header';
import * as S from '../styleEditingCard4';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import AddItemModal from './newFashionItemModal'


const ItemList = () => {


 const router = useRouter();
 const {category} = useLocalSearchParams();
 const [Items,setItems]=useState([])
 const [fashionItems, setFashionItems] = useState([]);
 const [isModalVisible, setModalVisible] = useState(false);

  // Function to handle saving the new item
  const saveItem = (newItem) => {
    setFashionItems([...fashionItems, newItem]);
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
  
    setModalVisible(!isModalVisible);
  };


  const handlePressItem = (item) => {
    router.push({
      pathname: `/mainForAdmin/cards/card4Sections/detailsScreenEdit?id=${item._id}`
    });
  };


  const getData=async() => {

    const results = await AsyncStorage.getItem('fashionItems');
    const parsedResults = JSON.parse(results);
    if(category==="All"){
      setItems(parsedResults);
    }
    else{
      const filteredItems = parsedResults.filter(item => item.type === category);
      setItems(filteredItems);
    }
    
  }

  useEffect(() => {
    getData();
  },[]);
  
  
  

  return (
    <S.PageContainer>
        <Header/>
        <S.TitleForPage6 >{category==="All"?"Full Catalog":`${category} Catalog`}</S.TitleForPage6>

      <S.StyledFlatList1
        data={Items || []}
        keyExtractor={(item,index) => index}
        renderItem={({item}) => (
            <S.Card1 onPress={() => handlePressItem(item)}>
               <S.CardImage  source={{ uri: item.photos[0]}}/>    
            </S.Card1>
            
          )}
      />
        <S.CircleButton onPress={toggleModal}>
          <FontAwesome name="plus" size={24} color="#fff" />
        </S.CircleButton>
        
        {/* Add Item Modal */}
        <AddItemModal 
          isVisible={isModalVisible} 
          setModalVisible={setModalVisible} 
          toggleModal={toggleModal} 
          saveItem={saveItem}
        />

      </S.PageContainer>

  );
};

export default ItemList;
