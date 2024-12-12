import React, { useState, useEffect } from 'react';
import { I18nManager, Alert ,Platform} from 'react-native';
import RNRestart from 'react-native-restart';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { changeLanguage, getCurrentLanguage } from './i18n'; // Implement these

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language

  useEffect(() => {
    const fetchCurrentLanguage = async () => {
      const currentLanguage =  getCurrentLanguage(); 
      setSelectedLanguage(currentLanguage || 'en'); // Default to 'en' if no language is set
      const isRTL = currentLanguage === 'ar' || currentLanguage === 'heb';
      I18nManager.forceRTL(isRTL);
    };

    fetchCurrentLanguage();
  }, []);

  const handleLanguageChange = async (language) => {
    const isRTL = language === 'ar' || language === 'heb';
    setSelectedLanguage(language);
    
    await AsyncStorage.setItem('appLanguage', language); // Persist language
    changeLanguage(language); // Apply language change in i18n
  
    const showAlert = (title, message, buttons) => {
      if (Platform.OS === 'web') {
        alert(`${title}: ${message}`);
      } else {
        Alert.alert(title, message, buttons);
      }
    };
    // If RTL direction change is needed, force restart the app
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
    
      showAlert(
        'Restart Required',
        'Please restart the app to apply the language direction change.',
        [
          {
            text: 'OK',
            onPress: () => {
              if (RNRestart) {
                RNRestart.restart();
              } else {
                console.warn('RNRestart is not available');
              }
            },
          },
        ]
      );
    }
  };

  return (
    <RNPickerSelect
  onValueChange={handleLanguageChange}
  value={selectedLanguage}
  items={[
    { label: 'English', value: 'en' },
    { label: 'العربية', value: 'ar' },
    { label: 'עברית', value: 'heb' },
  ]}
  style={{
    inputIOS: {
      fontSize: 18,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: '#73224B',
      borderRadius: 4,
      color: '#73224B',
      width: 200,
      alignSelf: "center",
      textAlign: "center",
      marginTop: 10,
    },
    inputAndroid: {
      fontSize: 18,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#73224B',
      borderRadius: 8,
      color: '#73224B',
      marginTop: 10,
    },
    ...(Platform.OS === 'web' && {
      inputWeb: {
        fontSize: 18,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#73224B',
        borderRadius: 4,
        color: '#73224B',
        width: 200,
        alignSelf: "center",
        textAlign: "center",
        marginTop: 10,
        outline: 'none', // To remove the default outline on web
        cursor: 'pointer',
      },
    }),
  }}
/>
  );
};

export default LanguageSelector;
