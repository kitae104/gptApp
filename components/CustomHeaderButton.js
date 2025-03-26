import { HeaderButton } from "react-navigation-header-buttons";
import colors from "../constants/colors";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default CustomHeaderButton = (props) => {
  return (
    <HeaderButton 
      {...props} 
      IconComponent={FontAwesome} 
      iconSize={23} 
      color={props.color ?? colors.primary} />
  );
}