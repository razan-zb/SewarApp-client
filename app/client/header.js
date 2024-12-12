import React, { useState,useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Linking, View } from 'react-native';
import { Icon } from 'react-native-elements'; // Or use 'expo/vector-icons' if using Expo
import { useRouter, usePathname } from 'expo-router';
import logo from '../../assets/images/SewarLogo1.png';
import * as SC from './styleClientPage';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const route = usePathname();
  const [types,setTypes]=useState([]);


  const feachData = async()=>{
    const results = await AsyncStorage.getItem('fashionItems');
    if(results !== null){
      const parsedResults = JSON.parse(results);
      const allTypes = parsedResults.map(item => item.type);

      const uniqueTypes = [...new Set(allTypes)];
      setTypes(uniqueTypes)
    }
  }
  useEffect(() => {
    feachData()
  }, []);



  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const goBack = () => {
    if (route === '/client/mainForClient') {
      router.back();
    } else {
      router.replace('client/mainForClient');
    }
  };

  const goHome = () => {
    router.replace('client/mainForClient');
  };

  const handleSubMenuToggle = () => {
    setSubMenuVisible(!subMenuVisible);
  };

  const navigateToCategory = (category) => {
    router.replace({
      pathname: '/client/headerSections/listOfItems',
      params: { category },
    });
  };

  const openUrl = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <SC.HeaderWrapper>
      <SC.HeaderContainer>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back" size={30} color={"#73224B"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={goHome}>
          <SC.Logo source={logo} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMenu}>
          <Icon name="menu" size={30} color={"#73224B"} />
        </TouchableOpacity>
      </SC.HeaderContainer>

      {menuVisible && (
        <SC.MenuContainer>
          <TouchableOpacity  onPress={() => router.replace('client/mainForClient')}>
            <SC.MenuText >{t('home')}</SC.MenuText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace('/client/headerSections/aboutUs')}>
            <SC.MenuText>{t('about_us')}</SC.MenuText>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubMenuToggle} style={styles.menuItemContainer}>
            <SC.MenuText>{t('my_designs')}</SC.MenuText>
            <Icon 
              name={subMenuVisible ? "arrow-drop-up" : "arrow-drop-down"} 
              size={24} 
              color="#000" 
            />
          </TouchableOpacity>

         
          {subMenuVisible && (
            <SC.MenuItemContainer>

              {types?.map((item,index) => (
                  <View key={index}>
                  <TouchableOpacity onPress={() => navigateToCategory(item)}>
                    <SC.MenuText>{item}</SC.MenuText>
                  </TouchableOpacity>
                 </View>
              ))}
            </SC.MenuItemContainer>
          )}

          <TouchableOpacity onPress={() => router.replace('/client/headerSections/contactUs')}>
            <SC.MenuText>{t('contact_us')}</SC.MenuText>
          </TouchableOpacity>

          {/* Container for Instagram and WhatsApp icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => openUrl('https://www.instagram.com/siwardesign_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')}>
              <Icon name="instagram" type="font-awesome" size={30} color={"#E4405F"} />
            </TouchableOpacity>
            


            <TouchableOpacity onPress={() => openUrl('https://www.instagram.com/siwardesign_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==')}>
              <Icon name="whatsapp" type="font-awesome" size={30} color={"#25D366"} />
            </TouchableOpacity>

            
          </View>
        </SC.MenuContainer>
      )}
    </SC.HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 150,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Adjusts spacing between icons
    marginTop: 10,
    width: 60,
  },
});

export default Header;
