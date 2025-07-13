import { StyleSheet } from "react-native";


import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";


export default function BaseView({children,style}) {

    const theme = useTheme();

    return (
        <SafeAreaView style={[styles.baseView, {backgroundColor: theme.background}, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    baseView: {
        flex:1,
        paddingHorizontal: 12
    }
    
})