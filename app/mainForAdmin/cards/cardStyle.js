import styled from 'styled-components/native';
import * as Font from 'expo-font';
import { Platform } from 'react-native';



export const Container = styled.View`
  flex: 1;
  background-color: #cccccc;
  justify-content: center; 
  width:100%;


`
export const Container4 = styled.View`
  background-color: #cccccc;
  flex-direction:row;
  gap:20px;
  margin-left:5px;
  ${Platform.OS === 'web' && 'margin-top: -80px;'};



`

export const ContainerScrollView = styled.ScrollView`
  flex: 1;
  background-color: #cccccc;
  padding: 20px; 
  width:100%;
  

`

export const CardRow = styled.View`
  flex-direction: row; 
  justify-content: space-between; 
  gap:10px;
  flex-wrap: wrap; 
`;


export const PageName = styled.Text`
  font-size:18px;
  color:#73224B;
  fontFamily: 'CustomFontName4';

`;



export const MiniCard = styled.TouchableOpacity.attrs(() => ({
  shadowRadius: 4, // Set as a number here
}))`
  background-color: #f0f0f0; 
  width: 100px; 
  height: 100px; 
  justify-content: center;
  align-items: center;
  border-radius: 10px; 
  elevation: 2;
  shadow-color: #000; 
  shadow-opacity: 0.2;
  border-width: 2px; 
  border-color: #73224B; 
`;
export const DeleteButton = styled.TouchableOpacity`
  background-color: red;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;

export const DeleteText = styled.Text`
  color: white;
  font-size: 12px;
`;

export const Container2 = styled.View`
  flex: 1;
  background-color: #fff;

`;



export const CloseButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #0073e6;
  border-radius: 5px;
  width: 80px;

`;

export const CloseButtonText = styled.Text`
  color: white;
  font-weight: bold;
  align-self: center;


  
`;

export const NamingModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const NamingModalContent = styled.View`
  width: 300px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const TextInputs = styled.TextInput`
  width: 100%;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  margin-bottom: 20px;
`;

export const SaveButton = styled.TouchableOpacity`
  background-color: #3498db;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

export const SaveButtonText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const CancelButton = styled.TouchableOpacity`
  background-color: gray;
  padding: 10px;
  border-radius: 5px;
`;

export const CancelButtonText = styled.Text`
  color: white;
`;

export const TaskContainer = styled.View`
  flex: 1;
  padding: 20px;

`;


const fetchFonts = () => {
  return Font.loadAsync({
    'CustomFontName1': require('../../../assets/fonts/Peristiwa.otf'),
    'CustomFontName2': require('../../../assets/fonts/Thelorin.otf'),
    'CustomFontName3': require('../../../assets/fonts/RoadStoneFreePersonalUse.otf'),
    'CustomFontName4': require('../../../assets/fonts/Crisa.otf'),
    'CustomFontName5': require('../../../assets/fonts/FHGettoFunky.otf'),
    'CustomFontName6': require('../../../assets/fonts/TheAmsterdam.otf'),
    'CustomFontName7': require('../../../assets/fonts/Reinkies.otf'),

  });
};

fetchFonts();



export const TaskTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #73224B;
  fontFamily: 'CustomFontName6';
  text-align: left;



`;

export const TaskItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;


  
`;

export const TaskText = styled.Text`
  font-size: 16px;
  margin-left:20px;


`;

export const HourText = styled.Text`
  font-size: 16px;
  color: #999;
  
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  flex: 1;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
`;
export const AddButton2 = styled.TouchableOpacity`
  background-color: #73224B ;
  border-radius: 5px;
  width: 200px;
  height: 50px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 5;
  align-self:center;
  margin-top:20px;



`;


export const AddButton = styled.TouchableOpacity`
  background-color: #73224B;
  padding: 10px;
  border-radius: 5px;
  width: 50px;
    height: 50px;
    border-radius: 30px;
    background-color: #73224B;
    justify-content: center;
    align-items: center;
    shadow-color: #000;
    shadow-opacity: 0.2;
    shadow-radius: 5px;
    elevation: 5;
    align-self: flex-end;
    display:flex;
  
  
`;

export const AddButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.View`
  width: 80%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

export const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self:center;


`;

export const ModalInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  align-self:left;
  width:100%;
  text-align: left;


`;

export const ModalButton = styled.TouchableOpacity`
  background-color:#73224B;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top:5px;
`;

export const ModalButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;



export const CardStyle = styled.View`
  background-color: #ffffff;
  border-radius: 10px;
  elevation: 5; 
  shadow-color: #000; 
  shadow-opacity: 0.1;
  shadow-radius: 10px;

`;

export const CardTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const CalendarStyle = styled.View`
`;

export const CalendarContainer=styled.View`
  width:100%;
  border-radius: 10px;
  border: 3px solid #73224B;

`
export const DrawablePageContainer = styled.View`
  width: 100%;
  height: 750px;
  ${Platform.OS === 'web' && 'height: 700px;'};
  background-color: white;
  ${Platform.OS === 'web' && 'margin-top: -0px;'};

  position: relative; 

`;

export const ButtonsInDraw = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-self: center;
  width: 100%;
  margin-top:5px;
  ${Platform.OS === 'web' && 'margin-bottom: -70px;'};




`;

export const TextInputInDraw = styled.TextInput`
  margin-left:30px;
  font-size:18px;

`;

export const TextInDraw = styled.Text`
  font-size:18px;

`;

export const ColorsContainer= styled.View`
    flex-direction: column;
    position:absolute;
    margin-left: 370px;
    margin-top: -150px;
    ${Platform.OS === 'web' && ' margin-left: 350px'};
    ${Platform.OS === 'web' && '  margin-top: -175px'};




`
export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background-color: #f1f1f1;
`;