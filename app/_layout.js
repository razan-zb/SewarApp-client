import { Stack } from 'expo-router'
import React from 'react';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="LogIn" options={{ headerShown: false }} />
            <Stack.Screen name="mainForAdmin/cards/card2" options={{ title: 'Card 2' }} />
            <Stack.Screen name="mainForAdmin/mainAdminPage" options={{ title: ''}} />
            <Stack.Screen name="mainForAdmin/cards/card1" options={{ title: '' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "#fff"}}  />
            <Stack.Screen name="mainForAdmin/cards/card3" options={{ title: 'Notes',headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white" }} />
            <Stack.Screen name="mainForAdmin/cards/card4" options={{ title: 'Go Back' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white"}} />
            <Stack.Screen name="mainForAdmin/cards/sections/measuresForOne" options={{ title: '' ,headerTintColor: "#73224B"}} />
            <Stack.Screen name="client/mainForClient" options={{ title: '' ,headerShown: false, headerStyle: { backgroundColor: "#ff99cc" },headerTintColor: "#b30059"}} />
            <Stack.Screen name="client/detailsScreen" options={{ title: '' ,backgroundColor: "#b3b3b3",headerShown: true, headerStyle: { backgroundColor: "#73224B" },headerTintColor: "#cccccc"}}/>
            {/* Add other screens here as needed */}
            <Stack.Screen name="client/headerSections/aboutUs" options={{ title: '' ,headerShown: false, headerStyle: { backgroundColor: "#ff99cc" },headerTintColor: "#b30059"}} />
            <Stack.Screen name="client/headerSections/contactUs" options={{ title: '' ,headerShown: false, headerStyle: { backgroundColor: "#ff99cc" },headerTintColor: "#b30059"}} />
            <Stack.Screen name="client/headerSections/listOfItems" options={{ title: '' ,headerShown: false, headerStyle: { backgroundColor: "#ff99cc" },headerTintColor: "#b30059"}} />
            <Stack.Screen name="mainForAdmin/cards/card4Sections/contactUsEdit" options={{ title: 'Go Back' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white"}} />
            <Stack.Screen name="mainForAdmin/cards/card4Sections/aboutUsEdit" options={{ title: 'Go Back' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white"}} />
            <Stack.Screen name="mainForAdmin/cards/card4Sections/listOfItesEdit" options={{ title: 'Go Back' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white"}}/>
            <Stack.Screen name="mainForAdmin/cards/card4Sections/detailsScreenEdit"options={{ title: 'Go Back' ,headerStyle: { backgroundColor: "#73224B" },headerTintColor: "white"}}/>

         </Stack>
      );
}

export default Layout;