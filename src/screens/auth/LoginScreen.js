import { Alert, StyleSheet, Text, View } from "react-native";

import CustomBtn from "../../components/ui/CustomBtn";
import { useEffect, useState } from "react";
import { hp } from "../../constants/responsive";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { useNavigation } from "@react-navigation/native";
import useUserStore from "../../store/useUserStore";
import HeaderText from "../../components/ui/HeaderText";
import { doc, getDoc } from "firebase/firestore";
import AuthTextInput from "./components/AuthTextInput";
import BaseView from "../../components/common/BaseView";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const setUser = useUserStore(state => state.setUser);
  const user = useUserStore(state => state.user);

  useEffect(()=>{
    if(user) {
      navigation.replace("Board");
    }
  },[user])



  const goSignUp = () => {
    navigation.navigate("Term");
  }
  

  const loginHandler = async () => {
    if (!email || !password) {
      Alert.alert("알림", "아이디 또는 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const userInfo = await getDoc(doc(db, "users", res.user.uid))

      setUser({uid: res.user.uid, email: res.user.email, username: userInfo.data().username, profileImage: userInfo.data().profileImage});

      navigation.reset({
        index: 0,
        routes: [{name: "Board"}]
      });
    } catch (err) {
      console.log(err.code);

      switch (err.code) {
        case "auth/invalid-email":
          Alert.alert("알림", "잘못된 이메일 형식입니다.");
          break;
        case "auth/invalid-credential":
          Alert.alert("알림", "이메일과 비밀번호를 다시 확인해주세요");
          break;
        default:
          Alert.alert("로그인 실패", "다시 시도해 주세요.");
          console.log(err);
      }
    }
  };

  return (
    <BaseView style={styles.container}>
      <View style={styles.header}>
        <HeaderText>로그인</HeaderText>
      </View>
      <View style={styles.inputContainer}>
        <AuthTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력해주세요."
        />
        <AuthTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry={true}
        />
      </View>
      <View style={styles.btnContainer}>
        <CustomBtn onPress={loginHandler}>로그인</CustomBtn>
        <CustomBtn onPress={goSignUp}>회원가입</CustomBtn>
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  inputContainer: {
    gap: 20,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 20,
  },
  header: {
    marginBottom: hp("7%"),
  },
});
