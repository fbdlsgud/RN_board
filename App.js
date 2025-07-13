
import { useEffect, useState } from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
import Navigator from './src/navigation/Navigator';
import useUserStore from './src/store/useUserStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import Loading from './src/components/ui/Loading';
import * as Font from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';


export default function App() {

  const setUser = useUserStore(state => state.setUser);

  // 벡터이미지 로딩
  const [isFontLoading, setIsFontLoading] = useState(true);

  // 유저정보 로딩
  const [isLoading, setIsLoading] = useState(true);


  // 앱 시작 후 이미지 세팅
  useEffect(()=>{
    const fontSetting = async () => {
      try {
        await Font.loadAsync({
          ...MaterialIcons.font,
        });
        setIsFontLoading(false);
      } catch (err) {
        console.log("font 로딩 실패 :" , err);
        Alert.alert("오류","알 수 없는 오류로 인해 앱을 재시작해주세요");        
      }
    }

    fontSetting();
  },[])



  // 앱 시작 후 firebase유저 정보 조회 후, zustand에 유저정보를 전역적으로 사용
  useEffect(()=>{
    const loginStorage = onAuthStateChanged(auth, async (user) => {
      if(user) {

        try {

        const userInfo = await getDoc(doc(db, "users", user.uid));

        if(!userInfo.exists()) {
          setIsLoading(false);
          return ;
        }

        setUser({
          uid: user.uid,
          email: user.email,
          username: userInfo.data().username,
          profileImage: userInfo.data().profileImage,
        });
        } catch (err) {
          console.log("로그인 정보 불러오기 오류",err);
          Alert.alert("오류","알 수 없는 오류로 인해 앱을 재시작해주세요");
        }
      }
      setIsLoading(false);
    });

    return loginStorage;
  },[])

  if(isLoading || isFontLoading) return <Loading />;


  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}


