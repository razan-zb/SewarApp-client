import React, {useEffect,useState } from 'react';
import * as S from './styleHeader';
import Header from '../header';
import sewar from '../../../assets/images/SewarImage.jpg';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const [aboutMeText, setAboutMeText] = useState();
  const [myVisionText, setMyVisionText] = useState();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
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
            <S.DescriptionText>{aboutMeText}</S.DescriptionText>
            <S.SectionTitle>{t('my_vision_title')}</S.SectionTitle>
            <S.DescriptionText>{myVisionText}</S.DescriptionText>
          </S.TextSection>
        </S.ContentContainer>
      </S.AboutUsContainer>
    </S.PageContainer>
  );
};

export default AboutUs;
