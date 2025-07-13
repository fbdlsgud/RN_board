import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function CheckBox({ onPress, children, isChecked }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.pressable}>
        <MaterialIcons
          name={isChecked ? "check-box" : "check-box-outline-blank"}
          color={theme.text}
          size={24}
        />
      </Pressable>
      <Text style={{ color: theme.text, fontSize: 16 }}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    gap: 10
  },
});
