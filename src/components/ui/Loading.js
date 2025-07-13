import { View } from "react-native";
import { PacmanIndicator } from "react-native-indicators";


export default function Loading () {


    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center" ,backgroundColor: "#444"}}>
            <PacmanIndicator color="#36d7b7" size={50} />
        </View>
    )
}