import { Image, StyleSheet, Text, View } from "react-native";
import colors from "../constants/colors";
import loadingGif from "../assets/loading.gif";

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
      {
        text &&
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
        </View>
      }
      {
        type === "loading" &&
        <Image 
          source={loadingGif} 
          style={styles.loadingGif}
        />
      }
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
  loadingGif: {    
    height: 100,
  },
});
