import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../constants/colors";
import Entypo from '@expo/vector-icons/Entypo';

export default DataItem = (props) => {

  const { title, subTitle, type, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={1} style={styles.subTitle}>{subTitle}</Text>
        </View>
        {
          type === "link" && 
          <View>
            <Entypo name="chevron-thin-right" size={20} color={colors.gray} />
          </View>
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGrey,
  }, 
  title: {
    fontFamily: 'medium',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: 'regular',
    letterSpacing: 0.3,
    color: colors.gray,
  },
  textContainer: {
    flex: 1
  },
})