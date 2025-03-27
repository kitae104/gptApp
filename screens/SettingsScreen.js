import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DataItem from '../components/DataItem';
import { personalities } from '../constants/settings';

export default function SettingsScreen(props) {

  useEffect(() => {
    props.navigation.setOptions({   // 화면 상단에 표시될 제목 설정
      headerTitle: 'Settings'       // 화면 상단에 표시될 제목  
    });
  }, []);                           // 컴포넌트가 처음 렌더링될 때만 실행

  return (    
    <View style={styles.container}>
      <DataItem 
        title="Personality"
        subTitle="Change the personality of the model"
        type="link"
        onPress={() => {
          props.navigation.navigate("DataListScreen", {
            data: personalities, // DataListScreen으로 전달할 데이터
            title: "Personality" // DataListScreen에서 사용할 제목
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
