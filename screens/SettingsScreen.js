import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DataItem from '../components/DataItem';
import { personalities } from '../constants/settings';
import { setItem } from '../store/settingsSlice';

export default function SettingsScreen(props) {

  const dispatch = useDispatch(); // Redux store에 접근하기 위한 dispatch 함수

  // Redux store에서 personality 상태 가져오기
  const personality = useSelector(state => state.settings.personality); 
  // console.log(personality); // 콘솔에 personality 상태 출력
  
  useEffect(() => {
    props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
      headerTitle: 'Settings'       // 화면 상단에 표시될 제목  
    });
  }, []);                           // 컴포넌트가 처음 렌더링될 때만 실행

  // 상태 업데이트 함수
  const updateValue = useCallback((key, value) => { 
    try {      
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
          subTitle="Change the mood of the model"
          type="link"
          onPress={() => {
            console.log("Mood Pressed")
          }}
        />

        <DataItem
          title="Model"
          subTitle="Change the GPT model"
          type="link"
          onPress={() => {
            console.log("Model Pressed")
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
