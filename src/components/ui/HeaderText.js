import { StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";


export default function HeaderText({children,style}) {

    const theme = useTheme();

    return (
        <Text style={[styles.text, {color: theme.text}, style]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "bold",

    }
})