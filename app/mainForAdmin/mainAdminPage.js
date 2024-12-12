import React, { useState } from 'react';
import { Stack } from 'expo-router';
import * as S from './style2';
import { useRouter } from 'expo-router';
import card2 from '../../assets/images/measuring.png'
import card3 from '../../assets/images/sewing1.png'
import card4 from '../../assets/images/data3.png'
import BottomTabBar from './bottomBar'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalendarCard from './cards/calendarCard';
import Profile from './cards/profile'
import { useTranslation } from 'react-i18next';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const mainAdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Home');
  const [showCards, setShowCards] = useState(true);
  const { t } = useTranslation();

  const handleCardPress = (name) => {
    router.push(`/mainForAdmin/cards/${name}`);
  };

  const handleTabPress = (route) => {
    setActiveTab(route);
    if(route=='Exit'){
      router.replace('/');
    }

    else if(route=='Home'){
      setShowCards(true); 
    }

    else{
      setShowCards(!showCards); 
      console.log(route);
    }

  };


  return (
    <SafeAreaProvider>
      <Stack.Screen
              options={{
                headerShown: false,

              }}
            />
      <S.Container4>
 
 {showCards&& 
          <S.CardContainer>
            {(width<600)&&(
              <>
              <S.Card1 onPress={() => handleCardPress('card1')}>
              <CalendarCard />

              </S.Card1>
            
                <S.Card2 onPress={() => handleCardPress('card2')}>
                  <S.CardImage source={card2} />
                  <S.CardTitle>{t('card2Title')}</S.CardTitle>
                </S.Card2>

                <S.SmallCardContainer>

                      <S.Card3 onPress={() => handleCardPress('card3')}>
                        <S.CardImage source={card3} />
                        <S.CardTitle>{t('card3Title')}</S.CardTitle>
                      </S.Card3>

                      <S.Card4 onPress={() => handleCardPress('card4')}>
                        <S.CardImage source={card4} />
                        <S.CardTitle>{t('card4Title')}</S.CardTitle>
                      </S.Card4>
                </S.SmallCardContainer>
              </>
              )}
              {(width>600)&&(
              <>

                <S.Card1 onPress={() => handleCardPress('card1')}>
                  <CalendarCard />
                </S.Card1>
                <S.CardForWeb2 onPress={() => handleCardPress('card2')}>
                  <S.CardImage source={card2} />
                  <S.CardTitle>{t('card2Title')}</S.CardTitle>
                </S.CardForWeb2>

                <S.CardForWeb2 onPress={() => handleCardPress('card3')}>
                  <S.CardImage source={card3} />
                  <S.CardTitle>{t('card3Title')}</S.CardTitle>
                </S.CardForWeb2>

                <S.CardForWeb2 onPress={() => handleCardPress('card4')}>
                  <S.CardImage source={card4} />
                  <S.CardTitle>{t('card4Title')}</S.CardTitle>
                </S.CardForWeb2>
              </>
              )}

          </S.CardContainer>

 }

{!showCards&& 
          <Profile/>

}

          <BottomTabBar onTabPress={handleTabPress} activeTab={activeTab} />
      </S.Container4>
      

    </SafeAreaProvider>
  );
}

export default mainAdminPage;
