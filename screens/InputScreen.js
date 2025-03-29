import { StyleSheet, Text, TextInput, View } from "react-native"
import colors from "../constants/colors";
import { useCallback, useEffect, useState } from "react";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export default InputScreen = (props) => {  
  const params = props.route.params; // route.params에서 params 추출
  const {title, description, type, min, max, initialValue, updateValue} = params; // params에서 description 추출

  const [value, setValue] = useState(`${initialValue}`); // 상태 관리
  const [errorText, setErrorText] = useState(""); // 에러 상태 관리
  const [saveDisabled, setSaveDisabled] = useState(false); // Save 버튼 비활성화 상태 관리

  useEffect(() => {
      props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
        headerTitle: title,       // 화면 상단에 표시될 제목  
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
              title='Save'
              iconName='save' // Save 버튼 아이콘
              disabled={saveDisabled} // Save 버튼 비활성화 상태에 따라 disabled 속성 설정
              onPress={() => updateValue(value)} // Save 버튼 클릭 시 updateValue 함수 호출
            />
          </HeaderButtons>      
      });
  }, [title, saveDisabled, value, updateValue]);                           // 컴포넌트가 처음 렌더링될 때만 실행
  
  const onTextChanged = useCallback((text) => {
    setValue(text); // 상태 업데이트

    let error; // 에러 메시지
    let disabled = false; // Save 버튼 비활성화 상태

    if(text === '') { // 텍스트가 비어있을 경우
      // error = "값을 입력해야 합니다.";
      disabled = true; // 에러 발생 시 Save 버튼 비활성화
    }

    if(type === 'number' || type === 'integer') {      
      if (isNaN(text)) { // 숫자일 경우
        error = "숫자를 입력해야 합니다.";
        disabled = true; // 에러 발생 시 Save 버튼 비활성화
      }

      if(min !== undefined && text < min) { // 최소값 체크
        error = `최소값은 ${min}입니다.`;
        disabled = true; // 에러 발생 시 Save 버튼 비활성화
      }

      if(max !== undefined && text > max) { // 최대값 체크
        error = `최대값은 ${max}입니다.`;
        disabled = true; // 에러 발생 시 Save 버튼 비활성화
      }

      if(type == 'integer' && !Number.isInteger(parseFloat(text))) { // 정수 체크
        error = "입력에는 소수 자릿수가 포함될 수 없습니다.";
        disabled = true; // 에러 발생 시 Save 버튼 비활성화
      }
    }
    setErrorText(error); // 에러 메시지 설정
    setSaveDisabled(disabled); // Save 버튼 비활성화 상태 설정
  }, [type, min, max]); // setValue가 변경될 때만 실행

  return (
    <View>
      <Text style={styles.description}>{description}</Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Enter a value"
        onChangeText={onTextChanged} // 텍스트 변경 시 호출되는 함수
        value={value !== "undefined" ? value : ''} // 상태 관리
      />
      {
        errorText &&
        <Text style={styles.error}>{errorText}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
  }, 
  textInput: {
    fontFamily: 'regular',
    borderWidth: 1,
    borderRadius: 3,
    borderColor: colors.lightGrey,
    padding: 10,
    margin: 10,
  },
  description: {
    fontFamily: 'regular',
    paddingVertical: 10,
    padding: 10,
  }, 
  error: {
    fontFamily: 'regular',
    color: 'red',
    padding: 10,    
  }
})