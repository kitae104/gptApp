import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import colors from "../constants/colors";
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

export default DataItem = (props) => {

  const { title, subTitle, type, onPress, isChecked } = props;

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
        {
          type === "checkbox" && 
          <View style={{ ...styles.iconContainer, ...(isChecked && styles.checkedStyles)}}>
            <Ionicons name="checkmark" size={20} color="white" />
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
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.lightGrey,
    backgroundColor: 'white'
  },
  checkedStyles: {
    backgroundColor: colors.primary,
    borderColor: 'transparent'
  }
})