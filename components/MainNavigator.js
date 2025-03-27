import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';
import ChatScreen from '../screens/ChatScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsNavigator from './SettingsNavigator';

const options = {
  headerTitleStyle: {
    fontFamily: 'regular',
    color: colors.textColor,
  }, 
  tabBarLabelStyle: {
    fontFamily: 'regular',
    color: colors.textColor,    
  },
  tabBarShowLabel: false,
}

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} options={
        {
          ...options,
          tabBarIcon: ({ color, size }) => {            
            return <Entypo name="chat" size={size} color={color} />
          }
        }
      }/>
      <Tab.Screen name="Image" component={ImageScreen} options={
        {
          ...options,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="image" size={size} color={color} />
          }
        }
      }/>
      <Tab.Screen name="Settings" component={SettingsNavigator} options={
        {
          ...options,
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings-outline" size={size} color={color} />
          }
        }
      }/>
    </Tab.Navigator>
  );
}