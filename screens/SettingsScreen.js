import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DataItem from '../components/DataItem';
import { moods, personalities, responseSizes } from '../constants/settings';
import { setItem } from '../store/settingsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen(props) {

  const dispatch = useDispatch(); // Redux store에 접근하기 위한 dispatch 함수

  // Redux store에서 설정된 상태 가져오기 --> 설정 후 StartUpScreen에서 해당 부분 수정
  const personality = useSelector(state => state.settings.personality); 
  const mood = useSelector(state => state.settings.mood); 
  const responseSize = useSelector(state => state.settings.responseSize); 
  
  useEffect(() => {
    props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
      headerTitle: 'Settings'       // 화면 상단에 표시될 제목  
    });
  }, []);                           // 컴포넌트가 처음 렌더링될 때만 실행

  // 상태 업데이트 함수 - 비동기 처리 
  const updateValue = useCallback(async (key, value) => { 
    try {      
      await AsyncStorage.setItem(key, value); // AsyncStorage에 상태 저장 ex> (key: 'personality', value: 'baby')
      dispatch(setItem({ key, value })); // Redux store에 상태 업데이트
      props.navigation.goBack(); // 이전 화면으로 돌아가기
    } catch (error) {
      console.log(error); // 에러 발생 시 콘솔에 출력
    }
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (    
    <View style={styles.container}>
      <DataItem 
        title="Personality"
        subTitle={personality} // 현재 선택된 personality 상태 표시
        type="link"
        onPress={() => {
          props.navigation.navigate("DataListScreen", {
            data: personalities,  // DataListScreen으로 전달할 데이터
            title: "Personality", // DataListScreen에서 사용할 제목
            onPress: (value) => updateValue("personality", value), // 업데이트 함수
            selectedValue: personality // 현재 선택된 값
          }); // DataListScreen으로 이동
        }}
      />
      <DataItem
          title="Mood"
          subTitle={mood} // 현재 선택된 mood 상태 표시
          type="link"
          onPress={() => {
            props.navigation.navigate("DataListScreen", {
              data: moods,  // DataListScreen으로 전달할 데이터
              title: "Moods", // DataListScreen에서 사용할 제목
              onPress: (value) => updateValue("mood", value), // 업데이트 함수
              selectedValue: mood // 현재 선택된 값
            });
          }}
        />

        <DataItem
          title="Response size"
          subTitle={responseSize}
          type="link"
          onPress={() => {
            props.navigation.navigate("DataListScreen", {
              data: responseSizes,  // DataListScreen으로 전달할 데이터
              title: "Response size", // DataListScreen에서 사용할 제목
              onPress: (value) => updateValue("responseSize", value), // 업데이트 함수
              selectedValue: responseSize // 현재 선택된 값
            });
          }}
        />

        <DataItem
          title="Advanced settings"
          subTitle="Additional model settings"
          type="link"
          onPress={() => {
            props.navigation.navigate("AdvancedSettingsScreen"); // AdvancedSettingsScreen으로 이동
          }}
        />
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
