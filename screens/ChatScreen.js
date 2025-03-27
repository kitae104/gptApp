import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import Bubble from '../components/Bubble';
import colors from '../constants/colors';
import { addUserMessage, getConversation, resetConversation } from '../utils/conversationHistoryUtil';
import { makeChatRequest } from '../utils/gptUtils';
import { Text } from 'react-native';
import InputContainer from '../components/InputContainer';

export default function ChatScreen(props) {

  const flatlist = useRef(); // 대화 내용을 표시하는 FlatList 컴포넌트의 ref

  const [messageText, setMessageText] = useState(""); // 사용자가 입력한 메시지를 저장할 상태
  const [conversation, setConversation] = useState([]); // 대화 내용을 저장할 상태
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            title='Clear'
            iconName='trash-o'
            onPress={() => {
              setConversation([]);
              resetConversation();
            }}
          />
        </HeaderButtons>      
    });
    
  }, []); 

  useEffect(() => {
    resetConversation();
    setConversation([]);
  }, []);

  const sendMessage = useCallback(async () => {
    if(messageText === '') return;

    try{
      setLoading(true);
      addUserMessage(messageText);  // 사용자가 입력한 메시지를 대화 내용에 추가
      setMessageText(""); // 메시지 전송 후 텍스트박스 초기화
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시

      await makeChatRequest();  // GPT-3 API를 호출하여 응답을 받아 대화 내용에 추가
    } catch (error) {
      console.log(error);
    } finally {
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시
      setLoading(false);
    }
  }, [messageText]);

  return (    
    <KeyboardAvoidingViewContainer>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          {
            !loading && conversation.length === 0 &&
            <View style={styles.emptyContainer}>
              <FontAwesome5 name='lightbulb' size={48} color={colors.textColor} />
              <Text style={styles.emptyContainerText}>시작하려면 우선 메시지를 입력하세요.</Text>
            </View>
          }
          {
            conversation.length !== 0 &&
            <FlatList 
              ref={(ref) => flatlist.current = ref}
              onLayout={() => flatlist.current.scrollToEnd()}
              onContentSizeChange={() => flatlist.current.scrollToEnd()}
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
          }
        </View>
        {
          loading &&
          <View style={styles.loadingContainer}>
            <Bubble
              type='loading'
            />
          </View>
        }
        <InputContainer 
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
          onPress={sendMessage}
          placeholder='메시지를 입력하세요...'
        />
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
    paddingVertical: 10,
  }, 
  loadingContainer: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontFamily: 'regular',
    fontSize: 18,
    color: colors.lightGray,
    marginTop: 10,
  },
});
