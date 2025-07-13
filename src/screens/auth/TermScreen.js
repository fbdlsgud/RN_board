import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

import HeaderText from "../../components/ui/HeaderText";
import { hp, wp } from "../../constants/responsive";
import { TERMS_TEXT } from "../../constants/terms";
import CustomBtn from "../../components/ui/CustomBtn";
import CheckBox from "../../components/ui/CheckBox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import BaseView from "../../components/common/BaseView";


export default function TermScreen() {


    const navigation = useNavigation();

    const [isChecked, setIsChecked] = useState(false);

    const goSignUp = () => {

        if(isChecked) {
        navigation.replace("SignUp");
        } else {
            Alert.alert("알림","회원가입 약관 동의가 필요합니다.")
        }
    }


    return (
        <BaseView style={styles.container}>
            <View style={styles.header}>
                <HeaderText>회원가입 약관</HeaderText>
            </View>
            <View  style={styles.termContainer}>
                <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
                        <Text style={styles.text}>
                            {TERMS_TEXT}
                        </Text>
                </ScrollView>
            </View>
            <View>
                <CheckBox onPress={()=>setIsChecked(prev => !prev)} isChecked={isChecked}>위 약관에 동의합니다.</CheckBox>
            </View>
            <View style={styles.btnContainer}>
                <CustomBtn backgroundColor="#e92015" onPress={()=>navigation.goBack()}>뒤로가기</CustomBtn>
                <CustomBtn backgroundColor="#2684f7" onPress={goSignUp}>다음</CustomBtn>
            </View>
        </BaseView>
    )
}


const styles = StyleSheet.create({
    container:{ 
        alignItems:"center",
        gap: hp("5%")
    },
    header: {
        marginTop: hp("8%")
    },
    termContainer: {
        height: hp("50%"),
        width: wp("70%"),
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 10,
        backgroundColor: "#fff"
    },
    text: {
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 14
    },
    btnContainer: {
        flexDirection: "row",
        gap: 40
    }

})