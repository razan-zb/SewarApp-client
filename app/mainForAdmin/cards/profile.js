/* eslint-disable react/prop-types */
// Profile.js
import React from 'react';
import * as S from '../style2'; // You can create a separate style file for Profile
import sewar from '../../../assets/images/SewarImage.jpg';
import {logout} from '../../../helpers/api';
import { useRouter} from 'expo-router'
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../../changeLangyage'



const Profile = () => {
  const router = useRouter();
  const { t } = useTranslation();

  
  
const handelLogOut =async ()=>{
  console.log("Logging out");
  try{
    const respond = await logout();
    if(respond){
      router.replace('/');
    }

  }catch(error){
    console.log(error);
  }

}

  return (
    <S.ProfileContainer>
      <S.ProfileImage source={sewar} />
      <S.ProfileName>Sewar</S.ProfileName>
      <S.ProfileInfo>Fashion Designer</S.ProfileInfo>

      
      <S.TextLabel>{t('select-language')}</S.TextLabel>
      <LanguageSelector/>
      
      <S.ProfileButton onPress={handelLogOut}>
        <S.ProfileButtonText>{t('log-out')}</S.ProfileButtonText>
      </S.ProfileButton>

    </S.ProfileContainer>
  );
};

export default Profile;
