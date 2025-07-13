import { Alert, Image, StyleSheet, View } from "react-native";

import useUserStore from "../../store/useUserStore";

import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { hp, wp } from "../../constants/responsive";

import { MaterialIcons } from '@expo/vector-icons';
import BaseView from "../../components/common/BaseView";
import BaseText from "../../components/common/BaseText";


export default function BoardScreen() {

    const theme = useTheme();
    
    const navigation = useNavigation();

    const user = useUserStore(state => state.user);
    const userLogout = useUserStore(state => state.userLogout);

    const [boardLists, setBoardLists] = useState([]);

   

    // const renderItem = ({item}) => {
    //     return (
    //         <View>
    //             <Text style={{color:"white"}}>{item.id}</Text>
    //             <Text style={{color:"white"}}>{item.title}</Text>
    //             <Text style={{color:"white"}}>{item.content}</Text>
    //         </View>
    //     )
    // }

    useEffect(()=>{
        if(!user) {
            navigation.replace("Login");
        }
    },[user])

    

    const logoutHandler = () => {
        Alert.alert("알림","로그아웃 하시겠습니까?" ,[
            {text: "취소", onPress: () => {}, style: "cancel"},
            {text: "확인", onPress: async () => { await userLogout(); navigation.replace("Login");}}
        ])
    }

    const goWrite = () => {
        navigation.navigate("Write");
    }

    const goMyPage = () => {
        navigation.navigate("MyPage");
    }



    return (
        <BaseView>
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Image style={styles.profileImage} source={{uri:user?.profileImage}}/>
                    <View>
                        <BaseText style={styles.greeting}>환영합니다 👋</BaseText>
                        <BaseText style={[styles.name, {color: theme.text}]}>{user?.username} 님</BaseText>
                    </View>
                </View>
                <View style={styles.menu}>
                    <MaterialIcons name="edit" size={30} color={theme.text} onPress={goWrite}/>
                    <MaterialIcons name="person" size={30} color={theme.text} onPress={goMyPage}/>
                    <MaterialIcons name="logout" size={30} color={theme.text} onPress={logoutHandler}/>
                </View>
            </View>

            <View>
 
            </View>
            
        </BaseView>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection:"row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#444"
    },

    userInfo: {
        flexDirection:"row",
        gap: 20,
        alignItems: "center"
    },
    profileImage: {
        width: wp("16%"), 
        height: hp('7%'), 
        borderRadius: 50
    },
    greeting: {
        color: "#666"
    },
    name: {
        fontWeight: "bold"
    },

    menu: {
        flexDirection:"row",
        gap: 16,
        alignItems: "center"
    },

})