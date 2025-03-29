// 대화의 성격을 설정하는 부분
export const personalities = [
  "normal",
  "pirate",
  "robot",
  "baby",
  "old man",
  "alien",
  "caveman"
]

// 대화의 분위기를 설정하는 부분
export const moods = [  
  "normal",
  "excited",
  "happy",
  "funny",
  "sad",
  "angry"
]

// 대화의 길이를 설정하는 부분
export const responseSizes = [
  "short",
  "medium",
  "long"
]

export const advancedSettings = [
  {
    id: "temperature",
    title: "Temperature",
    description: "0~2 사이의 샘플링 온도를 사용합니다. 0.8과 같은 높은 값은 출력을 더 무작위로 만들고, 0.2와 같은 낮은 값은 출력을 더 집중적이고 결정적으로 만듭니다.\n\n 일반적으로 이 값이나 top_p를 변경하는 것이 좋지만, 둘 다 변경하는 것은 좋지 않습니다.",
    default: 1, 
    min: 0, 
    max: 2, 
    type: "number",
  },
  {
      id: "top_p",
      title: "Top P",
      description: "온도 샘플링의 대안으로, 핵 샘플링이라고 하며, 이 모델은 top_p 확률 질량을 가진 토큰의 결과를 고려합니다. 따라서 0.1은 상위 10% 확률 질량을 구성하는 토큰만 고려한다는 것을 의미합니다.\n\n일반적으로 이 값이나 온도를 변경하는 것을 권장하지만 둘 다 변경하는 것은 권장하지 않습니다.",
      default: 1,
      min: 0,
      max: 1,
      type: "number"
  },
  {
      id: "max_tokens",
      title: "Max Tokens",
      description: "채팅 완료에서 생성할 토큰의 최대 개수입니다.\n\n입력 토큰과 생성된 토큰의 총 길이는 모델의 컨텍스트 길이에 따라 제한됩니다. 예> 토큰을 계산하기 위한 Python 코드 예",
      min: 10,
      max: 1000,
      type: "integer"
  },
  {
      id: "presence_penalty",
      title: "Presence Penalty",
      description: "-2.0과 2.0 사이의 숫자입니다. 양수 값은 지금까지 텍스트에 나타났는지 여부에 따라 새 토큰에 페널티를 부여하여 모델이 새 주제에 대해 이야기할 가능성을 높입니다.",
      default: 0,
      min: -2,
      max: 2,
      type: "number"
  },
  {
      id: "frequency_penalty",
      title: "Frequency Penalty",
      description: "-2.0과 2.0 사이의 숫자입니다. 양수 값은 지금까지 텍스트에서 기존 빈도에 따라 새 토큰에 페널티를 부여하여 모델이 같은 줄을 그대로 반복할 가능성을 줄입니다.",
      default: 0,
      min: -2,
      max: 2,
      type: "number"
  },
]