let conversation = [];

export const getConversation = () => conversation;

// 대화 내용을 초기화하는 함수
export const initConversation = (personality, mood, responseSize) => {
  let messageString = `You are a virtual assistant named Kitae.`;
  
  // 대화의 성격을 설정하는 부분
  if(personality !== 'normal'){
    messageString += `respond as if your are a ${personality}.`;
  }

  // 대화의 분위기를 설정하는 부분
  if(mood !== 'normal'){
    messageString += `Your mode is : ${mood}.`;
  }

  // 대화의 길이를 설정하는 부분
  if(responseSize !== 'medium'){
    messageString += `Your response size is : ${responseSize}.`;
  }

  addSystemMessage(messageString);
}

export const addUserMessage = (messageText) => {
  conversation.push({
    role: 'user',
    content: messageText
  })
}

// 어시스트가 입력한 메시지를 대화 내용에 추가하는 함수
export const addAssistantMessage = (messageText) => {
  conversation.push({
    role: 'assistant',
    content: messageText
  })
}

// 시스템 메시지를 추가하는 함수
export const addSystemMessage = (messageText) => {
  conversation.push({
    role: 'system',
    content: messageText
  })
}

export const resetConversation = (personality, mood, responseSize) => {
  conversation = [];
  initConversation(personality, mood, responseSize); // 대화 내용 초기화
}