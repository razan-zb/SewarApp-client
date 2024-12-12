import styled from 'styled-components/native';
import DropDownPicker from 'react-native-dropdown-picker';

export const SearchContainer = styled.View`

  height: 65px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 25px;
  padding: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  width:350px;
  margin-top:10px;


`;

export const SearchInput = styled.TextInput`
  font-size: 20px;
  color: #b30059;
`;

export const SearchButton = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  gap:10px;

`;

export const ContainerOneM=styled.View`

display:flex;
flex: 1;

flex-direction: column;
background-color: #cccccc;
padding-horizontal: 16px;
padding-top: 40px;
justify-content: center;
heigth:100%;



`


export const Title = styled.Text`
  font-size: 18px;
`;


export const PhoneInput = styled.TextInput`
  font-size: 18px;
`;

//Date Picker
export const InputsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-start;

`;

export const DateLabel = styled.Text`
  font-size: 18px;
  color: #73224B;
  margin-right: 10px;
  margin-left: 10px;
  font-weight: bold;


`;

export const Date = styled.Text`
  font-size: 18px;
  color: #000;
`;

export const ScrollContainer = styled.ScrollView`
  margin-top:20px;

  border-top-width: 2px; /* This adds the underline */
  border-top-color: #73224B; /* You can change the color as needed */
  padding:10px;
`;

export const Card = styled.View`
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    align-items: center;
    shadow-color: #000;
    shadow-opacity: 0.4;
    shadow-radius: 3px;


`;

export const Label = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;

  color: #73224B;
  margin-right: 10px;
  margin-left: 10px;
  
`;


export const DetailsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  width: 300px;
  align-self: flex-start;


`;


export const Value = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;

`;

export const PickerContainer = styled.View`
  width: 100%;
  height: 150px;
  overflow: hidden; 
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-radius: 4px;
  
  
`;


//Save Button
export const SaveButton = styled.TouchableOpacity`
  background-color: #73224B;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width:100px;
  height: 40px;
  align-self:center;
  shadow-color: #000;
  shadow-opacity: 0.4;
  shadow-radius: 4px;

`;

export const SaveButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;


export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;


export const NoteButton = styled.TouchableOpacity`
background-color: #73224B;
padding: 10px;
border-radius: 5px;
align-items: center;
margin-top: 20px;
margin-bottom: 20px;
width:100px;
height: 40px;
align-self:center;
shadow-color: #000;
shadow-opacity: 0.4;
shadow-radius: 4px;
margin-left:5px;
`;

export const NoteButtonText = styled.Text`
color: #fff;
font-size: 16px;
font-weight: bold;
`;



export const ModalContainer = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    border: 3px solid #73224B;
    width:80%;  
    align-self:center;
    justify-self: center;
    margin-top:250px;
    padding:10px;


`;

export const ModalContainer2 = styled.View`
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    border: 3px solid #73224B;
    width:90%;  
    align-self:center;
    padding:10px;
    height: 80%;
    margin:100px;




`;





export const ModalContent = styled.View`
  width: 90%;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const ModalTitle2 = styled(ModalTitle)`
  margin-top: 30px;
  margin-bottom: 50px;

`;

export const ModalInput = styled.TextInput`
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  height:100px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
`;

export const ButtonAddingType = styled.Button`
  width: 90%;
  font-size: 16px;

`;

export const ModalInput2 = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  height:50px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  text-align: left;
  width: 250px;

`;

export const DropDownPicker1=styled(DropDownPicker)`
  background-color: #73224b;
  width: 50px;

`

export const ModalInput3 = styled(ModalInput2)`
    height:110px;
`;

export const Text2 = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  color: #73224B;
  font-weight: bold;
  text-align: center;
`;


export const ModalSaveButton = styled.TouchableOpacity`
  background-color: #73224b;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top:5px;
`;

export const ModalSaveButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;




export const StyledDropDownPicker = styled(DropDownPicker)`
  height: 50px;
  background-color: #fff; 
  border-color: #73224B; 
  border-radius: 8px; 
  margin-bottom: 10px; 
  width: 250px;
  align-self:center;

`;


export const DropDownContainer = styled.View`
  border-color: #73224B;
  background-color: #f9f9f9;
  border-width: 1px;
  border-radius: 8px;
  padding: 10px; 
  margin-bottom: 10px; 
  width: 250px;

`;

export const StyledDropDownPickerLabel = styled.Text`
  color: #73224B; 
  font-size: 16px; 
`;