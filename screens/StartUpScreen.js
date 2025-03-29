import { ActivityIndicator } from "react-native";
import MainNavigator from "../components/MainNavigator";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default StartUpScreen = () => {

  const dispatch = useDispatch(); // Redux store에 접근하기 위한 dispatch 함수

  const [initialised, setInitialised] = useState(false);  // 초기화 상태를 저장할 상태

  useEffect(() => {

    // 설정 함수 - 비동기 처리
    const getSettings = async () => {
        try{
          // const keys = ["personality", "mood", "responseSize"]; // 가져올 AsyncStorage의 키 목록

          // for( let i =0; i < keys.length; i++){
          //   const key = keys[i]; // 현재 키
          //   const value = await AsyncStorage.getItem(key); // AsyncStorage에서 해당 키의 값 가져오기
          //   value && dispatch(setItem({ key, value })); // Redux store에 상태 업데이트
          // }

          const personality = await AsyncStorage.getItem("personality"); // AsyncStorage에서 personality 상태 가져오기
          personality && dispatch(setItem({ key: "personality", value: personality })); // Redux store에 personality 상태 업데이트
          
          const mood = await AsyncStorage.getItem("mood"); // AsyncStorage에서 mood 상태 가져오기
          mood && dispatch(setItem({ key: "mood", value: mood })); // Redux store에 mood 상태 업데이트

          const responseSize = await AsyncStorage.getItem("responseSize"); // AsyncStorage에서 responseSize 상태 가져오기
          responseSize && dispatch(setItem({ key: "responseSize", value: responseSize })); // Redux store에 responseSize 상태 업데이트          
        } catch (error) {
          console.log(error); // 에러 발생 시 콘솔에 출력
        } finally {
          setInitialised(true); // 초기화 완료
        }
    }
    getSettings(); // getSettings 함수 호출하여 AsyncStorage에서 personality 상태 가져오기      
  })

  if(!initialised) {  // 초기화가 완료되지 않았을 때
    return (
      <View style={styles.center}>
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    )
  }

  return <MainNavigator />;
}

const styles = StyleSheet.create({
  center: {
      flex: 1,  
      alignItems: 'center',
      justifyContent: 'center'
  }
})