import { createStackNavigator } from "@react-navigation/stack"
import SettingsScreen from "../screens/SettingsScreen";
import colors from "../constants/colors";
import DataListScreen from "../screens/DataListScreen";

const options = {
  headerTitleStyle: {
    fontFamily: 'regular',
    color: colors.textColor
  }
}

const Stack = createStackNavigator();

export default SettingsNavigator = () => {
  return <Stack.Navigator>
    <Stack.Screen 
      name="SettingsScreen"
      component={SettingsScreen}
      options={options}
    />
    <Stack.Screen 
      name="DataListScreen"
      component={DataListScreen}
      options={options}
    />
  </Stack.Navigator>
}