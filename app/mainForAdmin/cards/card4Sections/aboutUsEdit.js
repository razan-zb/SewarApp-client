import React, {useEffect,useState } from 'react';
import * as S from '../styleEditingCard4';
import Header from './header';
import sewar from '../../../../assets/images/SewarImage.jpg';
import { useTranslation } from 'react-i18next';
import { TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchUpdateUser} from '../../../../helpers/api'


const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [userLog,setUserLog ]= useState();


  // State variables for editable text
  const [aboutMeText, setAboutMeText] = useState();
  const [myVisionText, setMyVisionText] = useState();

  // State to toggle between edit and view mode
  const [isEditing, setIsEditing] = useState(false);
  // Function to handle save
  const handleSave = () => {
    updateUserByEmail();
  };

  const updateUserByEmail = async () => {
    try {
      const updatedUser={
        _id: userLog._id,
        name: userLog.name, 
        email:userLog.email ,  
        phone:userLog.phone,
        password:userLog.password,
        aboutMeEn:userLog.aboutMeEn  ,
        aboutMeAr:userLog.aboutMeAr,
        aboutMeHe:userLog.aboutMeHe ,
        myVisionEn:userLog.myVisionEn,
        myVisionAr:userLog.myVisionAr,
        myVisionHe:userLog.myVisionHe,
      }

      if(i18n.language==='ar'){
        updatedUser.aboutMeAr=aboutMeText;
        updatedUser.myVisionAr=myVisionText;

      }
      else 
      if(i18n.language==='en'){
        updatedUser.aboutMeEn=aboutMeText;
        updatedUser.myVisionEn=myVisionText;
        
      }
      else 
      if(i18n.language==='heb'){
        updatedUser.aboutMeHe=aboutMeText;
        updatedUser.myVisionHe=myVisionText;
        
      }

      // eslint-disable-next-line no-unused-vars
      const result = await fetchUpdateUser(userLog.email,updatedUser);
      setIsEditing(false)
      return true;
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }; 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUserLog(JSON.parse(user));
          if(i18n.language==='ar'){
            setAboutMeText(JSON.parse(user).aboutMeAr)
            setMyVisionText(JSON.parse(user).myVisionAr);
            
          }
          else 
          if(i18n.language==='en'){
            setAboutMeText(JSON.parse(user).aboutMeEn)
            setMyVisionText(JSON.parse(user).myVisionEn);
            
          }
          else 
          if(i18n.language==='heb'){
            setAboutMeText(JSON.parse(user).aboutMeHe)
            setMyVisionText(JSON.parse(user).myVisionHe);
            
          }
    
        }
      } catch (error) {
        console.error('Failed to fetch user from storage:', error);
      }
    };

    fetchUser();
  }, []); 


  return (
    <S.PageContainer>
      <Header />
      <S.AboutUsContainer>
        <S.ContentContainer>
          <S.ProfileImage source={sewar} />
    
          <S.TextSection>
            <S.SectionTitle>{t('about_me_title')}</S.SectionTitle>
            {isEditing ? (
              <TextInput
                style={S.EditableInput}
                value={aboutMeText}
                onChangeText={setAboutMeText}
                multiline
              />
            ) : (
              <S.DescriptionText>{aboutMeText}</S.DescriptionText>
            )}



            <S.SectionTitle>{t('my_vision_title')}</S.SectionTitle>
            {isEditing ? (
              <TextInput
                style={S.EditableInput}
                value={myVisionText}
                onChangeText={setMyVisionText}
                multiline
              />
            ) : (
              <S.DescriptionText>{myVisionText}</S.DescriptionText>
            )}

     
            {isEditing && (
              <Button title={t('save_button_text')} onPress={handleSave} />
              
            )}
          </S.TextSection>
        </S.ContentContainer>

        <S.Button33 title={isEditing ? t('cancel_button_text') : t('edit_button_text')} onPress={() => setIsEditing(!isEditing)}>
          <S.ButtonText>
            {isEditing ? t('cancel_button_text') : t('edit_button_text')}    
          </S.ButtonText>
        </S.Button33>

      </S.AboutUsContainer>
    </S.PageContainer>
  );
};

export default AboutUs;
