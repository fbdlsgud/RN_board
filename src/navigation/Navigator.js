import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/start/StartScreen";



import MyPageScreen from "../screens/user/MyPageScreen";


import SignUpScreen from "../screens/auth/SignUpScreen";
import TermScreen from "../screens/auth/TermScreen";


import BoardScreen from "../screens/Board/BoardScreen";
import WriteScreen from "../screens/Board/WriteScreen";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

export default function Navigator() {

    
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Start">
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Board" component={BoardScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="Term" component={TermScreen} />
                <Stack.Screen name="MyPage" component={MyPageScreen} />
                <Stack.Screen name="Write" component={WriteScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}