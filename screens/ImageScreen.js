import Feather from '@expo/vector-icons/Feather';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Bubble from '../components/Bubble';
import CustomHeaderButton from '../components/CustomHeaderButton';
import KeyboardAvoidingViewContainer from '../components/KeyboardAvoidingViewContainer';
import colors from '../constants/colors';
import { addUserMessage, getConversation, resetConversation } from '../utils/conversationHistoryUtil';
import { makeChatRequest, makeImageRequest } from '../utils/gptUtils';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text } from 'react-native';
import InputContainer from '../components/InputContainer';

export default function ImageScreen(props) {

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
              setConversation([]);  // 대화 내용 초기화
              resetConversation();  // 대화 내용 설정(빈 배열)  
            }}
          />
        </HeaderButtons>      
    });
    
  }, []); 

  useEffect(() => {
    resetConversation();  // 대화 내용 초기화
    setConversation([]);  // 대화 내용 설정(빈 배열)  
  }, []);

  //=================================================================
  // 메시지 전송하기 
  //=================================================================
  const sendMessage = useCallback(async () => {
    if(messageText === '') return;

    const text = messageText;
    const tempConversation = [...conversation, text]; // 대화 내용에 사용자가 입력한 메시지 추가
    
    try{
      setLoading(true);
      setMessageText(""); // 메시지 전송 후 텍스트박스 초기화
      setConversation(tempConversation);  

      const responseData = await makeImageRequest(text);  // GPT-3 API를 호출하여 응답을 받아 대화 내용에 추가
      //console.log(responseData); // 응답 데이터 확인  
      
      const urls = responseData.map(i => i.url); // 이미지 URL만 추출
      tempConversation.push(...urls); // 이미지 URL을 대화 내용에 추가
      setConversation(tempConversation);  // 대화 내용 설정

    } catch (error) {
      console.log(error); // 에러 메시지 출력
      setMessageText(text); // 메시지 전송 실패 시 텍스트박스에 다시 입력한 메시지 표시
    } finally {
      setLoading(false);  // 로딩 상태 해제
    }
  }, [messageText]);
  //console.log(conversation);  // 대화 내용 확인

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
                
                // 이미지 출력 처리 
                if(convoItem.startsWith("http://") || convoItem.startsWith("https://")){
                  return <Image 
                    style={{ marginBottom: 10 }}
                    height={256}
                    width={256}
                    source={{uri: convoItem}}
                  />
                }

                return <Bubble 
                    text={convoItem}
                    type={"user"}
                  />;
              }}
            />
          }
          {
            loading &&
            <View style={styles.loadingContainer}>
              <Bubble
                type='loading'
              />
            </View>
          }
        </View>
        
        <InputContainer 
          onChangeText={(text) => setMessageText(text)}
          value={messageText}
          onPress={sendMessage}
          placeholder='생성할 이미지에 대해 설명하세요...'
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
  sendButton: {
    backgroundColor: colors.primary,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,    
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
