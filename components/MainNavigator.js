import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from '../screens/ChatScreen';
import ImageScreen from '../screens/ImageScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={ChatScreen} options={
        {
          tabBarIcon: ({ color, size }) => {            
            return <Entypo name="chat" size={size} color={color} />
          }
        }
      }/>
      <Tab.Screen name="Image" component={ImageScreen} options={
        {
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="image" size={size} color={color} />
          }
        }
      }/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={
        {
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings-outline" size={size} color={color} />
          }
        }
      }/>
    </Tab.Navigator>
  );
}