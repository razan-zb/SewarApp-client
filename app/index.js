import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import * as SC from './styleMain';
import logo from '../assets/images/SewarLogo1.png';
import { Platform } from 'react-native';
import { fetchClientsData, fetchUserData, fetchTasksData, fetchFashionItemsData } from '../helpers/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadLanguage } from './i18n';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';


const Home = () => {
  const router = useRouter();
  const { t } = useTranslation();




  useEffect(() => {
    loadLanguage(); // Load the language on app startup

    // Request notification permissions
    const getPermissions = async () => {
      if (Platform.OS === 'ios') {
        await Notifications.requestPermissionsAsync();
      } 
    };

    getPermissions();

    // Set up a notification handler
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Clean up the listener on unmount
    return () => {
      notificationListener.remove();
    };
  }, []);

  const handleLogInPress = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      router.push(`./mainForAdmin/mainAdminPage?name=sewar`);
    } else {
      router.push('/LogIn');
    }
  };

  const fetchData = async () => {
    try {

      const clients = await fetchClientsData();
      console.log('Clients:', clients.length);
      
      const user = await fetchUserData('sewar.doe@example.com');
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('User:', user.name);
      
      const tasks = await fetchTasksData('1234567890');
      console.log('Tasks:', tasks.length);
      
      const fashionItems = await fetchFashionItemsData();
      await AsyncStorage.setItem('fashionItems', JSON.stringify(fashionItems));
      console.log('Fashion Items:', fashionItems.length);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVisited = () => {
    router.push('/client/mainForClient');
  };



  return (


    <SC.Container>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#008000" },
          headerShadowVisible: false,
          headerTitle: "",
          headerShown: false,
        }}
      />
      <SC.WelcomeBackground>
        <SC.ImageOnBox source={logo} />
        <SC.WelcomeText>{t('welcome')}</SC.WelcomeText>
        <SC.ButtonContainer2 onPress={handleVisited}>
          <SC.ButtonText2>{t('Visitor')}</SC.ButtonText2>
        </SC.ButtonContainer2>

        <SC.LogInButtonText onPress={handleLogInPress}>{t('logIn')}</SC.LogInButtonText>

      </SC.WelcomeBackground>
    </SC.Container>


  );
};



export default Home;
