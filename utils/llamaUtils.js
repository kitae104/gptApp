import { addAssistantMessage, getConversation } from "./conversationHistoryUtil";

export const makeChatRequest = async () => {
  const messages = getConversation(); // 기존 대화 내용

  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-ko", // 모델 이름
      messages: messages, // OpenAI 스타일의 메시지 포맷 사용 가능
      stream: false // true면 스트리밍, false면 전체 응답 반환
    })
  });

  const data = await response.json();
  console.log(data);

  if (data && data.message && data.message.content) {
    let responseText = data.message.content.replace(/(\r\n|\n|\r)/gm, "");
    addAssistantMessage(responseText);
    console.log(getConversation());
    return;
  }

  throw new Error("응답이 지원되지 않는 형식입니다.");
};