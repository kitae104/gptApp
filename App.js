import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import MainNavigator from './components/MainNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
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
