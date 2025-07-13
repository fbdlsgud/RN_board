import { StyleSheet, Text } from "react-native";


export default function SubLabel({children,style, isError=false}) {


    return (
        <Text style={[styles.label,style, isError && styles.errLabel]}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 6,
        fontSize: 14,
        color: "#666"        
    },
    errLabel: {
        color: "red"
    }
})