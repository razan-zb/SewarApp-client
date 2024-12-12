// Screen1.js
import React, { useState ,useEffect} from 'react';
import * as S from '../style2';
import SearchCard2 from './sections/searchCard2'
import { FontAwesome } from '@expo/vector-icons';
import {  Text } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import {fetchClientsData} from '../../../helpers/api';
import { useTranslation } from 'react-i18next';


//Measuring  List Page
const Card2 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  // eslint-disable-next-line no-unused-vars
  const [activeTab, setActiveTab] = useState('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = clients.filter(client =>
      client.firstName.toLowerCase().includes(query) ||
      client.lastName.toLowerCase().includes(query)
    );
    setFilteredClients(filtered);
  };

  const fetchData = async () => {
    try {

      const clients = await fetchClientsData();
      setClients(clients);
      setFilteredClients(clients)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    handleSearch();
  },[searchQuery])

  //Click on the plus sign
  const handlePress = () => {
    // Handle the button press here
    router.push({
      pathname: 'mainForAdmin/cards/sections/measuresForOne',
    
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleTabPress = (route) => {
    setActiveTab(route);
    // Handle tab press logic
    if(route=='Exit'){
      router.replace('/');
    }

    if(route=='Home'){
      router.replace('/mainForAdmin/mainAdminPage?name=razan');
    }

  };



  const handlePressItem = (user) => {
  
     router.push({
       pathname: 'mainForAdmin/cards/sections/measuresForOne',
       params:user,
     });
  };

  return (
    <S.Card2Container>
         <Stack.Screen
            options={{
                headerStyle: { backgroundColor: "#cccccc" },
                headerShadowVisible: false,
                headerTitle: "",
                headerShown: true,
                headerTintColor: "#73224B",
            }}
            />
          <SearchCard2
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSearch={handleSearch}
           />


      <S.ListContainer>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <S.ContentContainer key={client._id} onPress={() => handlePressItem(client)}>
                    <S.CustomName>{client.firstName} {client.lastName}</S.CustomName>
                  </S.ContentContainer>
                ))
              ) : (
                <Text>{t('noClientAvailable')}</Text>
              )}
      </S.ListContainer>

      <S.CircleButton onPress={handlePress}>
        <FontAwesome name="plus" size={24} color="#fff" />
      </S.CircleButton>



    </S.Card2Container>
  );
};

export default Card2;