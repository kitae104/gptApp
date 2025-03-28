import 'react-native-gesture-handler';
import "react-native-url-polyfill/auto";
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";
import { LogBox, StyleSheet, View } from 'react-native';
import MainNavigator from './components/MainNavigator';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons/HeaderButtonsProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './store/store';

// 로그 박스에서 특정 경고 메시지를 무시합니다.
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

SplashScreen.preventAutoHideAsync();  // 스플래시 화면을 자동으로 숨기지 않도록 설정

export default function App() {

  const [fontsLoaded] = useFonts({
    "black": require("./assets/fonts//Poppins-Black.ttf"),
    "blackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "boldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "extraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "extraBoldItalic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "light": require("./assets/fonts/Poppins-Light.ttf"),
    "lightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    "extraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "extraLightItalic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "mediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "thinItalic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
    "semiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "semiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={ { flex: 1 } } onLayout={ onLayoutRootView }>
        <NavigationContainer>
          <SafeAreaProvider>
            <HeaderButtonsProvider stackType="js">
              <MainNavigator />
            </HeaderButtonsProvider>
          </SafeAreaProvider>
        </NavigationContainer>
      </View>
    </Provider>
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
