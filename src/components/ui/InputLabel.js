import { StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";


export default function InputLabel({children,style}) {

    const theme = useTheme();


    return (
        <Text style={[styles.label,style, {color:theme.text}]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,        
    }
})