import { Pressable, StyleSheet, Text } from "react-native";
import { hp, wp } from "../../constants/responsive";
import { useTheme } from "../../context/ThemeContext";

export default function CustomBtn({ children, onPress, style, backgroundColor, disabled=false }) {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.primary

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        style,
        { backgroundColor: bgColor },
        pressed && { opacity: 0.75, },
      ]}
    >
      <Text style={[styles.text, { color: "#fff" }]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    width: wp("20%"),
    height: hp("5%"),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 17,
    fontWeight: "500"
  },
});
