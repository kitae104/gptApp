import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import DataItem from '../components/DataItem';
import { advancedSettings } from '../constants/settings';

export default function AdvancedSettingsScreen(props) {

  const dispatch = useDispatch(); // Redux store에 접근하기 위한 dispatch 함수

  // Redux store에서 설정된 상태 가져오기 
  const advanced = useSelector(state => state.settings.advanced); 
    
  useEffect(() => {
    props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
      headerTitle: 'Advanced Settings'       // 화면 상단에 표시될 제목  
    });
  }, []);                           // 컴포넌트가 처음 렌더링될 때만 실행

  return (    
    <View style={styles.container}>
      <FlatList 
        data={advancedSettings}
        renderItem={( itemData ) => {
          const optionData = itemData.item; // itemData에서 item 추출
          const val = advanced[optionData.id]; // advanced에서 해당 id의 값 추출
          console.log(optionData); // itemData 콘솔에 출력
          return (
            <DataItem 
              title = {optionData.title} // 항목 제목
              subTitle={val || optionData.default} // 항목 부제목
              type = "link" // 항목 타입
              onPress={() => {
                props.navigation.navigate("InputScreen", {  // InputScreen으로 이동
                    description: optionData.description // 항목 설명
              })
            }}
            />
          );
        }} // 각 항목을 렌더링하는 함수
      /> // FlatList 컴포넌트 사용
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
