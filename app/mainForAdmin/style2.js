import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';


const { width,height } = Dimensions.get('window');
const cardWidth = (width - 48) ; 


export const SafeAreaView1=styled.SafeAreaView`
    background-color: #ffe6f2;
`

export const Container4 = styled.View`
    width: ${width}px;
    height:${height}px;
    background-color: #cccccc;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: space-between;  
 
`;



export const Container = styled.View`
  flex: 1;
  background-color: #ffe6f2;
  padding-horizontal: 16px;
  padding-top: 40px;
  align-items: center;
  justify-content: center;

`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-size: 18px;
  color: #333;
  text-align: center;
`;

export const CardContainer = styled.View`
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  justify-self:center;
  width: ${width}px;
  ${Platform.OS != 'web' && 'margin-top: 50px;'};
  ${width > 600 ? `
    gap:5px;
    flex-wrap: none;
    margin-top:40px;
  ` : `  

  `}

`;

export const Card = styled.TouchableOpacity`
  background-color: #cccccc ;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  shadow-color: #000;
  margin-top:35px;
`;

export const CardForWeb2 = styled.TouchableOpacity`
    width: 350px;
    height: 550px;
`;

//Card for the calender at the top
export const Card1 = styled(Card)`
  width: ${cardWidth}px;
  ${width > 600 ? `
  width: 350px;
  height: 550px;

    ` : `
    `}

`;

//Card for the measuring at the left
export const Card2 = styled(Card)`
  width: ${cardWidth/2}px;
  height: 330px;
  align-self: flex-end;



`;
//Card for the calender at the top
export const Card3 = styled(Card)`
  height: 150px;
  width: 95%;


`;

//Card for the calender at the top
export const Card4 = styled(Card)`
  height: 150px;
  width: 95%;
  margin-top:30px;
  
`;

export const SmallCardContainer = styled.View`
  flex-direction: column;
  width: ${cardWidth / 2}px;
  height: 320px;
  justify-content: space-between;
  align-items: flex-end;

  ${width > 600 ? `
  height: 300px;
  width: 400px;
  flex-direction: row;
  background-color: green;

    ` : `
    `}

  `;





export const CardImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  ${width > 600 ? `

    ` : `
    `}

`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #73224B;
`;


//styling for the bottom bar component 

export const TabText = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const TabBarContainer = styled.View`
  width: ${width}px;
  height: 80px;

  flex-direction: row;
  justify-content: space-around;
  border-top-width: 2px;
  border-color: #ccc;
  align-items: center;
  background-color: white;



`;

export const TabButton = styled(TouchableOpacity)`
  align-items: center;
  flex: 1;
  align-items: center;
  justify-content: center;

`;

export const Circle = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  margin-bottom:25px;
  background-color: #cccccc;

`;


export const Card2Container=styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #cccccc;
  



`


//Card2
export const ListContainer=styled.ScrollView`
    flex: 1;
    margin-bottom: 16px;
    margin-top: 30px;
    width:400px;
`

import { Platform } from 'react-native';

export const CustomName = styled.Text`
  font-size: 18px;
  text-align: center;
  ${Platform.select({
    web: `
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    `,
    default: `
      shadow-color: #000;
      shadow-opacity: 0.2;
      shadow-radius: 2px;
    `,
  })}
`;
export const ContentContainer =  styled(TouchableOpacity)`
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 16px;
  shadow-color: #73224B;
  shadow-opacity: 0.4;
  shadow-radius: 2px;
  margin:10px;
  
`;

export const CircleButton = styled(TouchableOpacity)`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #73224B;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  margin-bottom:20px;
  elevation: 5;
`;


//Profile 
export const ProfileContainer = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #edc4d9
  ;
  width:100%;
`;

export const ProfileImage = styled.Image`
  width: 170px;
  height: 170px;
  border-radius: 80px;
  margin-top:120px;
`;

export const ProfileName = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const ProfileInfo = styled.Text`
  font-size: 18px;
  color: gray;
`;

export const ProfileButton = styled.TouchableOpacity`
  background-color: #73224B;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top:160px;
  `;

export const ProfileButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;


export const TextLabel=styled.Text`
font-size: 20px;
margin-top:100px;
font-weight: bold;



`