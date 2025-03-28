import OpenAI from "openai";
import { OPENAI_API_KEY } from '@env';
import { addAssistantMessage, getConversation } from "./conversationHistoryUtil";

// console.log('OPENAI_API_KEY : ', OPENAI_API_KEY); // 값이 정상 출력되는지 확인

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export const makeImageRequest = async (prompt) => {
  const response = await openai.images.generate ({
    model: "dall-e-2",
    prompt,
    n: 3,
    size: "256x256",
  })

  if(response.data) {
    return response.data;
  }

  throw new Error("응답이 지원되지 않는 형식입니다.");
}

export const makeChatRequest = async () => {
  // console.log(getConversation());
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: getConversation(),  // 대화 내용을 가져옴
    response_format: {
      "type": "text"
    },
    temperature: 1,
    max_completion_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    store: false
  });

  // printUsage(response.usage)
  if(response.choices){
    let responseText = response.choices[0].message.content;
    // 모든 줄바꿈 문자(개행 문자)를 찾아서 빈 문자열("")로 바꾸는 작업
    responseText = responseText.replace(/(\r\n|\n|\r)/gm, ""); 
    addAssistantMessage(responseText);
    console.log(getConversation());
    return;    
  }
  throw new Error("응답이 지원되지 않는 형식입니다.");
}

/** Prints estimated token costs in USD and KRW */
const printUsage = (usageData) => {
  const promptTokens = usageData.prompt_tokens;
  const completionTokens = usageData.completion_tokens;
  const totalTokens = usageData.total_tokens;

  // 1,000 tokens = $0.0015 - 비용 확인 후 수정 
  const dollarsPerThousandTokens = 0.0015;
  const dollarsPerToken = dollarsPerThousandTokens / 1000;

  const promptDollars = promptTokens * dollarsPerToken;
  const completionDollars = completionTokens * dollarsPerToken;
  const totalDollars = totalTokens * dollarsPerToken;

  const usdToKrwRate = 1450;  // 환율 확인 후 수정

  const promptWon = promptDollars * usdToKrwRate;
  const completionWon = completionDollars * usdToKrwRate;
  const totalWon = totalDollars * usdToKrwRate;

  console.log(`
  💰 예상 토큰 사용 비용:
  📝 프롬프트 (입력): ${promptTokens} tokens
      - $${promptDollars.toFixed(6)} / ₩${promptWon.toFixed(2)}
  🧠 응답 (출력): ${completionTokens} tokens
      - $${completionDollars.toFixed(6)} / ₩${completionWon.toFixed(2)}
  📊 총합: ${totalTokens} tokens
      - $${totalDollars.toFixed(6)} / ₩${totalWon.toFixed(2)}
  `);
}
