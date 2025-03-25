import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";

export default Bubble = (props) => {
  const { text, type } = props;

  const bubbleStyle = { ...styles.container };
  const wrapperStyle = { ...styles.wrapperStyle };
  const textStyle = { ...styles.textStyle };

  if (type === "assistant") {
    bubbleStyle.backgroundColor = colors.secondary;
    wrapperStyle.justifyContent = "flex-start";
    textStyle.color = colors.textColor;
  }

  return (
    <View style={wrapperStyle}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    maxWidth: "90%",
  },
  wrapperStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textStyle: {
    color: "white",
    fontFamily: "boldItalic",
  },
});
