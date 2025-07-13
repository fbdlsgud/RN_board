import { StyleSheet, TextInput } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function BaseInput({ style, ...props }) {
  const theme = useTheme();

  return (
    <TextInput
      style={[
        styles.input,
        style,
        { borderColor: theme.text, color: theme.text},
      ]}
      placeholderTextColor={theme.placeholderColor}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
});
