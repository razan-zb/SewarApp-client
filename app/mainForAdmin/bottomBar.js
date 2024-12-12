import * as S from './style2';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';  



// eslint-disable-next-line react/prop-types
const BottomTabBar = ({ onTabPress, activeTab }) => {

    return(

    <S.TabBarContainer>

       {['Exit', 'Home', 'Profile'].map((tab) => (
        <S.TabButton key={tab} onPress={() => onTabPress(tab)}>
             {activeTab === tab && (
          <S.Circle>
            <Icon name={tab === 'Home' ? "home-outline" : tab === 'Exit' ? "log-out-outline" : "person-outline"} size={30} color="#73224B" />
          </S.Circle>
        )}
        {activeTab !== tab && (
          <Icon name={tab === 'Home' ? "home-outline" : tab === 'Exit' ? "log-out-outline" : "person-outline"} size={30} color="#73224B" />
        )}
        </S.TabButton>
       ) 
    
    )}
  

    </S.TabBarContainer>
)
}
  
  export default BottomTabBar;