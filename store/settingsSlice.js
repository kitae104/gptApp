import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',         // slice의 이름
  initialState: {           // slice의 초기 상태
    personality: 'normal',  // 기본 personality 설정   
    mood: 'normal',         // 기본 mood 설정
    responseSize: 'medium',  // 기본 responseSize 설정
    advanced: { }
  },
  reducers: {               // slice의 상태를 변경하는 reducer 함수들    
    setItem: (state, action) => { // 상태를 변경하는 reducer 함수
      const { key, value } = action.payload;    // action.payload에서 key와 value를 추출
      state[key] = value; // 상태를 변경
    },
    setAdvancedItem: (state, action) => { // 상태를 변경하는 reducer 함수
      const { key, value } = action.payload;    // action.payload에서 key와 value를 추출
      state.advanced[key] = value; // 상태를 변경
    }
  },
  // dispatch(setItem({ key: 'personality', value: 'friendly' })) → { personality: 'friendly' }
})

export const { setItem, setAdvancedItem } = settingsSlice.actions; // 액션 생성자 내보내기
export default settingsSlice.reducer; // slice의 reducer 내보내기