let conversation = [];

export const getConversation = () => conversation;

export const initConversation = () => {
  addSystemMessage("You are a virtual assistant named Kitae");
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

export const resetConversation = () => {
  conversation = [];
  initConversation();
}