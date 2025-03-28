import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import DataItem from "../components/DataItem";


export default DataListScreen = (props) => {

  const { data, title, onPress, selectedValue } = props.route.params; // DataListScreen으로 전달된 데이터 가져오기

  useEffect(() => {
    props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
      headerTitle: title       // 화면 상단에 표시될 제목  
    });
  }, [title]);                           // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem={(itemData) => {
          const item = itemData.item; // 데이터를 가져옵니다.
          return (
            <DataItem 
              title={item}
              onPress={() => onPress(item) } // 업데이트 함수 호출      
              type="checkbox" // 체크박스 타입으로 설정
              isChecked = {item == selectedValue}
            />         
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10
  }
})