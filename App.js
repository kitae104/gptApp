import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainNavigator from './components/MainNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    "black": require("./assets/fonts/Poppins-Black.ttf"),
    "blackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "boldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "extraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "extraBoldItalic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "light": require("./assets/fonts/Poppins-Light.ttf"),
    "extraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "mediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "semiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "semiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "thinItalic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return null;
  }

  return (
    <View sstyle={{ flex: 1}} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
