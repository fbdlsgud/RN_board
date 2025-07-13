import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { hp, wp } from "../../constants/responsive";
import CustomBtn from "../../components/ui/CustomBtn";
import HeaderText from "../../components/ui/HeaderText";
import InputLabel from "../../components/ui/InputLabel";
import SubLabel from "../../components/ui/SubLabel";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Loading from "../../components/ui/Loading";
import ImagePick from "../../components/image/ImagePick";
import { uploadImg } from "../../utils/uploadImg";
import AuthTextInput from "./components/AuthTextInput";
import BaseView from "../../components/common/BaseView";


export default function SignUpScreen () { 


    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    const [profileImg, setProfileImg] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordChk, setPasswordChk] = useState("");

    const [errMsg, setErrMsg] = useState({emailErr: "", usernameErr: "", passwordErr: "", passwordChkErr: ""});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;


    const signUpHandler = async () => {
        const newErr = {emailErr: "", usernameErr: "", passwordErr: "", passwordChkErr: ""};

        
        if(!emailRegex.test(email)) newErr.emailErr = "(올바른 이메일 형식을 입력해주세요)";
        if(username.length < 2 || username.length > 8) newErr.usernameErr = "(2자 이상 8자 이하로 입력해주세요)";
        if(!passwordRegex.test(password)) newErr.passwordErr = "(특/영문 포함 8자이상 입력해주세요)";
        if(!passwordChk) newErr.passwordChkErr = "(비밀번호 확인을 입력해주세요)";
        if(password !== passwordChk) newErr.passwordChkErr = "(비밀번호가 일치하지 않습니다)";

        

        setErrMsg(newErr);

        const hasErr = Object.values(newErr).some(errMsg => errMsg !== "");
        if(hasErr) return ;

        if(!profileImg) {Alert.alert("알림","프로필 이미지를 선택해주세요"); return ;}


        setIsLoading(true);

        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const user = res.user;

            const saveProfileImg = await uploadImg(profileImg, `profileImage/${Date.now()}.jpg`);

            await updateProfile(user, {
                displayName: username
            });

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                username: username,
                createdAt: serverTimestamp(),
                profileImage: saveProfileImg
            });


            Alert.alert("회원가입 성공",`${username}님 환영합니다!`, [
                {text: "확인", onPress: () => { setIsLoading(false); navigation.replace("Login");}}
            ]);
            
        } catch (err) {
            console.log(err.code);

            switch (err.code) {
                case "auth/email-already-in-use":
                    Alert.alert("알림", "이미 사용중인 이메일입니다.");
                    break;
                case "auth/invalid-email":
                    Alert.alert("알림", "잘못된 이메일 형식입니다.");
                    break;
                case "auth/invalid-credential":
                    Alert.alert("알림", "이메일과 비밀번호를 다시 확인해주세요");
                    break;
                default:
                    Alert.alert("회원가입 실패", "다시 시도해 주세요.");                
            }

            if(auth.currentUser) {
                await auth.currentUser.delete();
            }

            setIsLoading(false);
        }

    }



    if(isLoading) return <Loading />

    return (
        <BaseView style={styles.container}>

            <View style={styles.header}>
                <HeaderText>회원가입</HeaderText>
            </View>

            <View>
                <ImagePick image={profileImg} setImage={setProfileImg}/>
            </View>

            <View style={styles.inputTextContainer}>
                <View style={styles.inputGroup}>

                    <View style={styles.labelGroup}>
                        <InputLabel>이메일</InputLabel>
                        <SubLabel isError={!!errMsg.emailErr}>{errMsg.emailErr || ""}</SubLabel>
                    </View>
                    <AuthTextInput value={email} placeholder="이메일을 입력해주세요." onChangeText={setEmail}/>  
                </View>   
                <View style={styles.inputGroup}>
                    <View style={styles.labelGroup}>     
                        <InputLabel>닉네임</InputLabel>
                        <SubLabel isError={!!errMsg.usernameErr}>{errMsg.usernameErr || ""}</SubLabel>
                    </View>    
                    <AuthTextInput value={username} placeholder="2자 이상 8자 이하로 입력해주세요." onChangeText={setUsername}/>    
                    </View>       
                <View style={styles.inputGroup}>     
                    <View style={styles.labelGroup}>
                        <InputLabel>비밀번호</InputLabel>
                        <SubLabel isError={!!errMsg.passwordErr}>{errMsg.passwordErr || ""}</SubLabel>
                    </View>
                    <AuthTextInput value={password} placeholder="특/영문 숫자 포함 8자 이상" onChangeText={setPassword} secureTextEntry={true}/>  
                    </View>          
                <View style={styles.inputGroup}>    
                    <View style={styles.labelGroup}>
                        <InputLabel>비밀번호 확인</InputLabel>
                        <SubLabel isError={!!errMsg.passwordChkErr}>{errMsg.passwordChkErr || ""}</SubLabel>
                    </View>
                    <AuthTextInput value={passwordChk} placeholder="비밀번호를 다시 입력해주세요." onChangeText={setPasswordChk} secureTextEntry={true}/>  
                </View>          
            </View>
            <View style={styles.btn}>
                <CustomBtn onPress={signUpHandler} disabled={isLoading}>회원가입</CustomBtn>
            </View>
        </BaseView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        justifyContent:"center"
    },
    header: {
        marginBottom: hp("3%")
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    inputTextContainer: {
        gap:hp("2%")
    },
    btn: {
        marginTop: hp("10%")
    },
    inputGroup: {
        width: "100%",
        alignItems: "flex-start",
        },
})