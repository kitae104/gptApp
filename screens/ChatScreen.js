import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';

export default function ChatScreen() {
  return (    
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messageContainer}>

        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.textbox}
            placeholder='메시지를 입력하세요...'
          />
          <TouchableOpacity style={styles.sendButton}>
            <Feather name="send" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>    
    </KeyboardAvoidingViewContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayBg,   
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,    
  },
  textbox: {
    flex: 1
  },
  messageContainer: {
    flex: 1,
  }
});
