// styleClientPage.js
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Video } from 'expo-av'; // Import the Video component
import * as Font from 'expo-font';
import { TouchableOpacity } from 'react-native';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export const StyledVideo2 = styled(Video)`
  width: 80%;
  height: 500px;
  background-color: black; 
  align-self:center;
`;




export const ScrollCon = styled.ScrollView`
  flex-direction: row;
  height: 300px; 
  
`;




export const Mario = styled(ImageBackground)`
  width: 100%;
  height: 200px; 
  justify-content: center;
  align-items: center;
`;


export const PageContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;




export const CategoryText = styled.Text`
  font-size: 16px;
  color: #73224B;
`;

export const Card = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 2;
 
  align-self:center;


`;

export const BlurredBackground = styled.ImageBackground`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: blur(10px); /* Adjust the blur level */
`;


export const CardImage = styled.Image`
  resize-mode: contain;
  height: 500px;
  width: 300px;
  border-radius: 15px;
  z-index: 2;

`;

export const Smallcontainer=styled.View`
  display:flex;
  flex-direction: row;
  margin-top:15px;
  align-items: center;
  height:50px;
  align-content: center;

`


export const TitleForPage=styled.Text`
  font: 24px Arial;
  color:#73224B;
  font-weight: bold;
  margin-left: 20px;
  fontFamily: 'CustomFontName4'


  
`

export const ScrollContainer =styled.ScrollView`
background-color: #cccccc;

`



export const StyledFlatList = styled.FlatList`
  padding-horizontal: 10px;
  padding-top: 20px;
  resize-mode: contain;



`;

//Details Screen
export const PageContainer2 = styled.View`
    background-color: #cccccc;
    flex-direction: column;
    width: 100%;


`;

export const ImageCarousel = styled.FlatList`
  height: 500px;
`;

export const ImageItem = styled.Image`
    width: 100%;
    height: 700px;
    z-index: 3;
    resize-mode:contain;
`;

export const TheImages=styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;


`

export const ViewSection=styled.View`
    flex-direction: column;
    justify-content: flex-start;

 `

export const Details=styled.View`
  background-color: #cccccc;
  opacity: 0.7;
  padding: 20px;
  align-items: center;
  width: 100%;
  ${Platform.OS === 'web' && 'opacity: 1;'};
  ${Platform.OS === 'web' && 'margin-top: -10px;'};

`


export const EditableInput = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  text-align: center;
  padding: 6px;
`;

export const miniView = styled.View`
flex-direction:row;
${Platform.OS === 'web' && 'gap: 10px;'};
${Platform.OS === 'web' && 'margin-top: 10px;'};



`

export const ArrowButton=styled.TouchableOpacity`
  align-self:center;
   border-radius: 5px;
   width:40px;
   height: 30px;
   align-items: center;
   justify-content: center;
   background-color:  #b3b3b3;
   margin-bottom:10px;
   margin-top: ${({ activeTab }) => (activeTab&&Platform.OS ==='web'? "-250px" : "-70px")};




`

export const DetailText = styled.Text`
    font-size: 24px;
    color: #73224B;
    fontFamily: 'CustomFontName4';
    text-align: center;
    margin-bottom:5px;


`;

export const DetailTextDiscrebtion = styled(DetailText)`
    width: 400px;
    margin-top:20px;
`;

export const PriceText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #73224B;
  
`;

export const SizeOptions = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #73224B;
`;

export const SizeOption = styled.TouchableOpacity`
  background-color: ${({ selected }) => (selected ? '#fff' : '#e6e6e6')};
  padding: 10px;
  border-radius: 5px;
`;

export const SizeText = styled.Text`
  font-size: 24px;

  color: ${({ selected }) => (selected ? '#e60073' : '#000')};
`;

export const ImageContainer = styled.View`
  background-color: #cccccc;
  height: 700px;
  justify-content: center;
  align-items: center;
  width: 430px;
`;

export const BlurredBackground3 =styled.ImageBackground`
    width: 100%;
    height: 700px;
    z-index: 1;
    position: absolute;
    filter: blur(10px); 


`;

export const DotContainer = styled.View`
    flex-direction: row;
    bottom: 10px;
    align-self: center;
    color:white;
    margin-top:15px;
`;

export const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => (props.active ? '#000' : '#ccc')};
  margin: 0 4px;
`;


export const HeaderWrapper = styled.View`
  z-index: 1000;

`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #fff; /* Adjust as needed */
`;

export const Logo = styled.Image`
  width: 100px;
  height: 50px; /* Adjust the size of the logo */
`;

export const MenuContainer = styled.View`
display: flex;
background-color: #fff;
z-index: 2000; 
height: 700px; 

align-items: center;
flex-direction: column;
justify-content: space-around;
${width > 600 ? `
  width: ${width}px;
  height: 600px;

` : `

`}



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

export const MenuText = styled.Text`
  font-size: 30px;
  padding-vertical: 10px;
  font-weight: bold;
  color:#73224B;
  fontFamily: 'CustomFontName6'


`;

export const MenuItemContainer = styled.View`
  align-items: center;
 
  `;

export const ArrowIcon = styled.View`
  margin-left: 10px;
`;


export const AboutUsContainer = styled.ScrollView`
  flex: 1;
  background-color: #f4f4f4;
  padding:20px;
`;

export const ContentContainer = styled.View`
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
`;

export const TextSection = styled.View`
  width: 100%;
  padding: 0 10px;
`;

export const SectionTitle = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #73224B;
  margin-bottom: 10px;
  fontFamily: 'CustomFontName6';
  text-align: left;


`;

export const DescriptionText = styled.Text`
  font-size: 16px;
  color: #333;
  line-height: 24px;
  margin-bottom: 15px;
  text-align: left;

`;


export const Header = styled.View`
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: #73224B; 
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white; 

`;

export const FormContainer = styled.View`
  background-color: #fff; 
  border-radius: 8px;
  padding: 20px;
  elevation: 2; 
  shadow-color: #000; 
  shadow-opacity: 0.1;
  shadow-radius: 4px;

`;

export const Input1 = styled.TextInput`
  height: 40px;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
  margin-bottom: 15px;
  padding-horizontal: 10px;
  background-color: #fff; /* White background for inputs */
`;

export const Button = styled.TouchableOpacity`
  background-color: #73224B; 
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

export const Button33 = styled(Button)`

margin-bottom:25px;

`;

export const Button44 = styled(Button)`
  margin-top:10px;
  background-color: #66004d; 
  width:100px;
  align-self: center;
  flex-direction: row;
  justify-content: space-around;


`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ContactDetails = styled.View`
  padding:10px;

`;

export const ContactText = styled.Text`
  font-size: 16px;
  color: #73224B; /* Dark grey text color for contact details */
  margin-bottom: 10px;
`;

export const ContactContainer = styled.View`
  background-color: #f3d8e6; 
  height: 95%;
  background-color: #cccccc; 
  height: 95%;
  justify-content: center;

  


`;



export const EmptyView = styled.View`

`

export const StyledFlatList1 = styled.FlatList`
  padding-horizontal: 10px;
  padding-top: 20px;
  resize-mode: contain;

`;

export const Card1 = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 10px;
  background-color: #fff;
  shadow-color: #73224B;
  shadow-opacity: 0.5;
  shadow-radius: 10px;
  elevation: 2;
  align-self:center;

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
  elevation: 5;
  align-self: flex-end;
  margin-right:20px;

`;



export const CardName=styled.Text`
  font: 18px Arial;
  color:#999999;
  font-weight: bold;
  font-family: Cursive;

`



export const TitleForPage5=styled.Text`
  font: 28px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  fontFamily: 'CustomFontName5'

`
export const TitleForPage6=styled.Text`
  font: 30px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName6'

`
export const TitleForPage7=styled.Text`
  font: 26px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName7'

`


export const TitleForPage1=styled.Text`
  font: 26px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName2'

`
export const TitleForPage2=styled.Text`
  font: 26px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName3'

`

export const TitleForPage3=styled.Text`
  font: 26px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName4'

`

