import { StyleSheet } from "react-native";

import BaseInput from "../../../components/common/BaseInput";
import { hp, wp } from "../../../constants/responsive";




export default function AuthTextInput({
  style,
  value,
  placeholder,
  onChangeText,
  autoCapitalize = "none",
  secureTextEntry = false,
}) {


  return (
    <BaseInput
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      style={[styles.textInput, style]}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: wp("60%"),
    height: hp("6%"),
    textAlign: "center",
  },
});
