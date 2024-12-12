// styleClientPage.js
import styled from 'styled-components/native';
import { ImageBackground } from 'react-native';
import { Video } from 'expo-av'; // Import the Video component
import * as Font from 'expo-font';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Platform } from 'react-native';

export const StyledVideo = styled(Video)`
  width: 80%;
  height: 200px;
  background-color: black; 
  align-self:center;
`;


export const ViewForVideo =styled.View`

`


export const ViewForVideo2 =styled.View`
    flex-direction:row;
    justify-content: center;
    align-items: center;
    gap:50px;
    
`

export const ViewForVideo3 =styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap:20px
    
`
export const StyledVideo3 = styled(Video)`
  
    width: 100%; 
    height: 400px; 
    max-width: 300px; 
    border-radius: 10px; 
    margin-bottom: 20px;
    object-fit: contain;

`;

export const StyledVideo2 = styled(Video)`
  
  background-color: #cccccc; 
  align-self:center;
  margin-top:10px;
  shadow-color: #73224B;
  shadow-opacity: 0.5;
  shadow-radius: 10px;

  ${width > 600 ? `
  width: 300px;
  height: 500px;
  object-fit: cover;
  object-fit: fill;

  ` : `
  width:80%;
  height: 500px;
  `}
  
`;




export const ScrollCon = styled.ScrollView`
  flex-direction: row;
  height: 300px; 
  ${Platform.OS === 'web' && 'margin-top: -5px;'};
  ${width > 600 ? `
  height: 400px;
  object-fit: cover;
  object-fit: fill;

  ` : `
  
  `}
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

export const TextMario=styled.Text`

font: italic bold 40px monospace;
color:#fff;

`
export const Bar =styled.View`
  height: 70px;

`
export const CategoryBar = styled.ScrollView`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-horizontal: 10px;
  height: 30px;


`;

export const CategoryButton = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 20px;
  background-color: #fff;
  margin-horizontal: 5px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 2;
  
`;

export const CategoryText = styled.Text`
  font-size: 16px;
  color: #73224B;
`;

export const Card = styled.TouchableOpacity`
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
  shadow-color: #73224B;
  shadow-opacity: 0.5;

  

`;

export const BlurredBackground2 = styled.ImageBackground`
  width: 100%;
  z-index: 1;
  filter: blur(0px); 
`;


export const BlurredBackground = styled.ImageBackground`
  position: absolute;
  width: 100%;
  z-index: 1;
  filter: blur(10px); 
  height:230px;


`;

export const MaroiImage = styled.Image`
    ${width > 600 ? `
      width: ${width}px;
      height: 550px;
      object-fit: fill;
      ` : `
      width:${width}px;
      height: 230px;
    `}

`;

export const CardImage = styled.Image`
  resize-mode: contain;
  height: 300px;
  width: 200px;
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

export const firstView=styled.View`
    ${width > 600 ? `
      width: ${width}px;
      height: 600px;

    ` : `
      width:${width}px;
      height: 230px;
    `}


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

export const ImageContainer = styled.View`
    background-color: #cccccc;
    height: 700px;
    justify-content: center;
    align-items: center;
    width: 430px;



`;


export const ImageItem = styled.Image`
    width: 100%;
    height: 700px;
    z-index: 3;
    resize-mode:contain;

  
`;
export const BlurredBackground3 = styled(BlurredBackground2)`
    width: 100%;
    height: 700px;
    z-index: 1;
    position: absolute;

`;

export const ViewSection=styled.View`
    flex-direction: column;
 
`
export const ScrollViewContainer = styled.ScrollView`
  flex-direction: row;
  padding: 10px;
  background-color: #f5f5f5;
`;


export const Details=styled.View`
  background-color: #cccccc;
  opacity: 0.7;
  align-items: center;
  width: 100%;
  height: 250px;
  margin-top:30px;
  ${Platform.OS === 'web' && 'margin-top: -10px;'};
  ${Platform.OS === 'web' && 'opacity: 1;'};

  



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
   z-index:2000;
   margin-top: ${({ activeTab }) => (activeTab&&Platform.OS ==='web'? "-200px" : "0px")};
   


`

export const DetailText = styled.Text`
    font-size: 24px;
    color: #73224B;
    fontFamily: 'CustomFontName4';
    text-align: center;
    margin-bottom:5px;
    ${Platform.OS === 'web' && 'margin-top: 10px;'};

`;

export const DetailTextDiscrebtion = styled(DetailText)`
    width: 400px;
    margin-top:20px;
`;

export const PriceText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #73224B;
  margin-bottom:10px;

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
  background-color: ${props => (props.active ? '#000' : 'white')};
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
  background-color: #fff; 
 

`;

export const Logo = styled.Image`
  width: 100px;
  height: 50px; 
`;

export const MenuContainer = styled.View`
  display: flex;
  background-color: #fff;
  z-index: 2000; 
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  height: 800px; 
  ${width > 600 ? `
      width: ${width}px;
      height: 600px;

    ` : `
   
    `}



`;


const fetchFonts = () => {
  return Font.loadAsync({
    'CustomFontName1': require('../../assets/fonts/Peristiwa.otf'),
    'CustomFontName2': require('../../assets/fonts/Thelorin.otf'),
    'CustomFontName3': require('../../assets/fonts/RoadStoneFreePersonalUse.otf'),
    'CustomFontName4': require('../../assets/fonts/Crisa.otf'),
    'CustomFontName5': require('../../assets/fonts/FHGettoFunky.otf'),
    'CustomFontName6': require('../../assets/fonts/TheAmsterdam.otf'),
    'CustomFontName7': require('../../assets/fonts/Reinkies.otf'),

  });
};

fetchFonts();

export const MenuText = styled.Text`
  font-size: 30px;
  padding-vertical: 10px;
  font-weight: bold;
  color:#73224B;
  fontFamily: 'CustomFontName6';
  margin-top : 20px;



`;

export const MenuItemContainer = styled.View`
  align-items: center;
 
  `;

export const ArrowIcon = styled.View`
  margin-left: 10px;
`;