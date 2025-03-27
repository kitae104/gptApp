import { Feather } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native"
import colors from "../constants/colors"

export default InputContainer = (props) => {

  const { onChangeText, value, onPress, placeholder } = props;

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.textbox}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={onPress}
      >
        <Feather name="send" size={18} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 10
  },
  textbox: {
      flex: 1,
      fontFamily: 'regular'
  },
  sendButton: {
      backgroundColor: colors.primary,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
  },
})