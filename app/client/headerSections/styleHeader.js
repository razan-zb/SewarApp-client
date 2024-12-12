// styleClientPage.js
import styled from 'styled-components/native';
import * as Font from 'expo-font';

export const PageContainer = styled.SafeAreaView`
  flex: 1;
  background-color: white;


  

  
`;
export const AboutUsContainer = styled.ScrollView`
  flex: 1;
  background-color: #f4f4f4;
  padding:20px;
`;


export const BlurredBackground = styled.ImageBackground`
  position: absolute;
  height: 500px;
  width: 300px;
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
  text-align: left;
  fontFamily: 'CustomFontName6';


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
  margin-top:150px;

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
  background-color: #cccccc; 
  height: 95%;



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



export const CardName=styled.Text`
  font: 18px Arial;
  color:#999999;
  font-weight: bold;
  font-family: Cursive;

`


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
  font: 26px Arial;
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

export const TitleForPage=styled.Text`
  font: 26px Arial;
  color:#73224B;
  padding:4px;
  font-style:italic;
  align-self:center;
  margin-top:10px;
  font-weight: bold;
  fontFamily: 'CustomFontName1'

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
