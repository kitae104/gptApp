let conversation = [];

export const getConversation = () => conversation;

export const initConversation = (personality) => {
  let messageString = `You are a virtual assistant named Kitae.`;
  if(personality !== 'normal'){
    messageString += `respond as if your are a ${personality}.`;
  }
  addSystemMessage(messageString);
}

export const addUserMessage = (messageText) => {
  conversation.push({
    role: 'user',
    content: messageText
  })
}

export const addAssistantMessage = (messageText) => {
  conversation.push({
    role: 'assistant',
    content: messageText
  })
}

export const addSystemMessage = (messageText) => {
  conversation.push({
    role: 'system',
    content: messageText
  })
}

export const resetConversation = (personality) => {
  conversation = [];
  initConversation(personality);
}