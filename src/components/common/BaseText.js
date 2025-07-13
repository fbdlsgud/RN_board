import { Text } from "react-native";
import { useTheme } from "../../context/ThemeContext"


export default function BaseText({children, style}) {

    const theme = useTheme();

    return (
        <Text style={[{color:theme.text}, style]}>{children}</Text>
    )
}