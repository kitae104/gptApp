import { Text } from "react-native";

export default Bubble = (props) => {
    const { text } = props;

    return (
        <View>
            <Text>{text}</Text>
        </View>
    )
}