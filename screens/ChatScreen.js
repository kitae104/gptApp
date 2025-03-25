import Feather from '@expo/vector-icons/Feather';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Bubble from '../components/Bubble';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';
import { addUserMessage, getConversation, initConversation } from '../utils/conversationHistoryUtil';
import { makeChatRequest } from '../utils/gptUtils';
// import { makeChatRequest } from '../utils/llamaUtils';


export default function ChatScreen() {

  const [messageText, setMessageText] = useState(""); // 사용자가 입력한 메시지를 저장할 상태
  const [conversation, setConversation] = useState([]); // 대화 내용을 저장할 상태

  useEffect(() => {
    initConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if(messageText === '') return;

    try{
      addUserMessage(messageText);  // 사용자가 입력한 메시지를 대화 내용에 추가
      setMessageText(""); // 메시지 전송 후 텍스트박스 초기화
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시

      await makeChatRequest();  // GPT-3 API를 호출하여 응답을 받아 대화 내용에 추가
    } catch (error) {
      console.log(error);
    } finally {
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시
    }
  }, [messageText]);

  return (    
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <FlatList 
            style={styles.flatList}
            data={conversation}
            renderItem={(itemData) => {
              const convoItem = itemData.item;
              const { role, content } = convoItem;

              if(role === 'system') return null;
              
              return <Bubble 
                  text={content}
                  type={role}
                />;
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.textbox}
            placeholder='메시지를 입력하세요...'
            onChangeText={(text) => setMessageText(text)}
            value={messageText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
    flex: 1,
    fontFamily: 'regular',    
  },
  messageContainer: {
    flex: 1,
  },
  flatList: {
    marginHorizontal: 15,
  }
});
