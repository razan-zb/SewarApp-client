import React, {useState } from 'react';
import * as SC from './styleMain';
import { useRouter} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { Alert,Platform, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import {logIn} from '../helpers/api'
import { useTranslation } from 'react-i18next';


const LogIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const correctUsername = 'Sewar';
  const correctPassword = 'sewar123';

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, buttons);
    }
  };
  const handleUsernameChange = (text) => {
    setUsername(text);
    setIsUsernameCorrect(text === correctUsername);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordCorrect(text === correctPassword);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const fetchData = async () => {
    try {
      if (username === "" || password === "") {
        showAlert(
          'Login Failed',
          'Empty inputs. Please try again.',
          [{ text: 'OK' }]
        );
      } else {
        const respond = await logIn(username, password);
        if (respond.status) {
          try {
            router.push(`./mainForAdmin/mainAdminPage?name=${respond.user.name}`);
          } catch (error) {
            console.log('Error saving user details', error);
          }
        } else {
          showAlert(
            'Login Failed',
            'Incorrect username or password. Please try again.',
            [{ text: 'OK' }]
          );
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleLogin2 = () => {
    fetchData();
    
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogin = () => {
    router.push('/mainForAdmin/mainAdminPage?name=razan');
  };

  return (

        <SC.Container2>
          <Stack.Screen
              options={{
                headerStyle: { backgroundColor: "#cccccc" },
                headerShadowVisible: false,
                headerTitle: "",
                headerShown: true,
                headerTintColor: "#73224B",
              }}
            />

            <SC.Container3>
              <SC.InputContainer>
                <SC.LogInTitle>{t('logIn')}</SC.LogInTitle>
                <SC.Label1>{t('UserName')}</SC.Label1>
                <SC.InputWrapper>
                  <SC.Input1
                    placeholder={t('EnterUserName')}
                    onChangeText={handleUsernameChange}
                    value={username}
                    underlineColorAndroid="transparent"
                  />
                  {isUsernameCorrect && 
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  }
                </SC.InputWrapper>
              </SC.InputContainer>
              <SC.InputContainer>
                <SC.Label1>{t('Password')}</SC.Label1>
                <SC.InputWrapper>
                  <SC.Input1
                    placeholder={t('EnterPassword')}
                    onChangeText={handlePasswordChange}
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    underlineColorAndroid="transparent"
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Ionicons
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      size={24}
                      color="#73224B"
                    />
                  </TouchableOpacity>
                  {isPasswordCorrect && 
                    <Ionicons name="checkmark-circle" size={24} color="green" />
                  }
                </SC.InputWrapper>
              </SC.InputContainer>
              <SC.LoginButton onPress={handleLogin2}>
                <SC.ButtonText2>{t('LogInButton')}</SC.ButtonText2>
              </SC.LoginButton>

            </SC.Container3>
  

        </SC.Container2>
  );
}

export default LogIn;
