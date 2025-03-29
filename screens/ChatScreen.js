import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import Bubble from '../components/Bubble';
import CustomHeaderButton from '../components/CustomHeaderButton';
import InputContainer from '../components/InputContainer';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';
import { addUserMessage, getConversation, resetConversation } from '../utils/conversationHistoryUtil';
import { makeChatRequest } from '../utils/gptUtils';
import { advancedSettings } from '../constants/settings';

export default function ChatScreen(props) {

  const flatlist = useRef(); // 대화 내용을 표시하는 FlatList 컴포넌트의 ref

  // Redux store에서 personality 상태 가져오기
  const personality = useSelector(state => state.settings.personality); 
  const mood = useSelector(state => state.settings.mood); 
  const responseSize = useSelector(state => state.settings.responseSize); 
  const settings = useSelector(state => state.settings.advanced); // 고급 설정 상태 가져오기

  const [messageText, setMessageText] = useState(""); // 사용자가 입력한 메시지를 저장할 상태
  const [conversation, setConversation] = useState([]); // 대화 내용을 저장할 상태
  const [loading, setLoading] = useState(false); 

  const chatOptions = useMemo(() => {
    const options = {};

    for (let i = 0; i < advancedSettings.length; i++) {
      const settingsData = advancedSettings[i]; // advancedSettings에서 항목 데이터 가져오기
      const id = settingsData.id; // 항목 ID
      let value = settings[id]; // Redux store에서 해당 ID의 값 가져오기
      if(!value) {
        continue; // 값이 없으면 다음 항목으로 넘어감
      }
      // 항목 타입에 따라 숫자 형으로 변환
      if(settingsData.type === 'number'){
        value = parseFloat(value); // 숫자형으로 변환
      } else if(settingsData.type === 'integer'){
        value = parseInt(value); // 정수형으로 변환
      }
      options[id] = value; // options 객체에 추가      
    }
    return options; // 최종적으로 설정된 options 객체 반환
  }, [advancedSettings, settings]); // 대화 옵션을 메모이제이션하여 성능 최적화

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => 
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item 
            title='Clear'
            iconName='trash-o'
            onPress={() => {
              setConversation([]);  // 대화 내용을 초기화
              resetConversation(personality, mood, responseSize); // 대화 내용을 초기화
            }}
          />
        </HeaderButtons>      
    });
    
  }, [personality, mood, responseSize]); // personality 또는 mood가 변경될 때마다 헤더 버튼 업데이트

  useEffect(() => {
    resetConversation(personality, mood, responseSize); // 대화 내용을 초기화
    setConversation([]);
  }, [personality, mood, responseSize]); // personality, mode 또는 responseSize가 변경될 때마다 대화 내용 초기화

  const sendMessage = useCallback(async () => {
    if(messageText === '') return;

    try{
      setLoading(true);
      addUserMessage(messageText);  // 사용자가 입력한 메시지를 대화 내용에 추가
      setMessageText(""); // 메시지 전송 후 텍스트박스 초기화
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시

      await makeChatRequest(chatOptions);  // GPT-3 API를 호출하여 응답을 받아 대화 내용에 추가
    } catch (error) {
      console.log(error);
    } finally {
      setConversation([...getConversation()]); // 대화 내용을 화면에 표시
      setLoading(false);
    }
  }, [messageText, chatOptions]); // messageText 또는 chatOptions가 변경될 때마다 sendMessage 함수 업데이트

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
