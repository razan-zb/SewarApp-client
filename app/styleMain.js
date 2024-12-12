import styled from 'styled-components/native';
import back from '../assets/images/NewBack.png';
import back2 from '../assets/images/Frame1.png'

import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const SafeAreaViewS = styled.SafeAreaView`
  flex: 1;
  
`;


// Define a styled View component
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-items: center;

  
`;

export const WelcomeBackground = styled.ImageBackground.attrs(() => ({
  source: width > 600 ? back2 : back, // Conditionally set image based on screen width
}))`
  flex: 1;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-items: center;
`;

export const ImageOnBox = styled.Image`
  width: 240px;
  height: 300px;
`;



export const swiperDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'gray',
  marginHorizontal: 5,
 };


 export const swiperActiveDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: 'black',
  marginHorizontal: 5,
};



export const Slide = styled.View`
  justify-content: center;
  align-items: center;

`;
export const Box = styled.View`
  background-color: pink;
  width: 300px;
  height: 250px;
  margin-top:20px;


`

//Define the Buttons

export const ButtonContainer = styled.TouchableOpacity`
  border-radius: 20px;
  border:#ff3399;
  width:120px;
  height: 50px;
  justify-content: center;

`;

export const ButtonContainer2 = styled.TouchableOpacity`
  border-radius: 20px;
  width:130px;
  height: 50px;
  background-color: #73224B; 
  justify-content: center;
  margin-top:20px;

`;


export const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
  textAlign:center;

`;

export const LogInButtonText = styled.Text`
  color: #73224B; 
  font-size: 17px;
  
`;


export const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2px; 
  border-bottom-color: #fff; 
`;

export const Input1 = styled.TextInput`
  flex: 1;
  padding: 12px;
  font-size: 16px;


`;

export const CircleLeft = styled.View`
    top: 0;
    left: 0;
    width: 200px; 
    height: 100px; 
    background-color: #c86098;
    border-bottom-left-radius: 100px; 
    transform: scaleX(2); 
    z-index: -1;
`;

export const CircleRight = styled.View`
    top: 0;
    right: 0;
    width: 50px; 
    height: 50px; 
    background-color: #eb94c3;
    border-bottom-right-radius: 100px; 
    transform: scaleX(2); 
    z-index: -1;
`;

export const WelcomeContent =styled.View`

  
`;


export const Container2 = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  padding-horizontal: 16px;
  background-color:   #cccccc ;
  padding-left: 20px;
  padding-right: 20px;
`;


export const Container3 = styled.View`
    justify-content: center;
    padding-horizontal: 16px;
    background-color:  #cccccc    ;
    padding-left: 20px;
    padding-right: 20px;
`;


export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const Label1 = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color:#73224B;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #73224B;
  padding: 12px;
  align-items: center;
  border-radius: 4px;
  margin-top: 16px;

`;

export const ButtonText2 = styled.Text`
  color: white;
  font-size: 17px;
  text-align: center;
  
`;

export const WelcomeText = styled.Text`
  font-size: 17px;
  text-align: center;
  
`;



export const LogInTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 40px;
  color:#73224B;
`;



