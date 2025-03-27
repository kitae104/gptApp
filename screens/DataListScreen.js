import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default DataListScreen = (props) => {

  const { data, title } = props.route.params; // DataListScreen으로 전달된 데이터 가져오기

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