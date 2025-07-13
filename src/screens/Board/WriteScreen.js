import { Alert, ScrollView, StyleSheet, View } from "react-native";

import useUserStore from "../../store/useUserStore";

import BaseView from "../../components/common/BaseView";
import HeaderText from "../../components/ui/HeaderText";
import CustomBtn from "../../components/ui/CustomBtn";
import { wp } from "../../constants/responsive";
import InputLabel from "../../components/ui/InputLabel";
import BaseInput from "../../components/common/BaseInput";
import { useState } from "react";
import CategorySelect from "../../components/ui/CategorySelect";
import BoardImagePick from "../../components/image/BoardImagePick";
import Loading from "../../components/ui/Loading";
import { uploadImg } from "../../utils/uploadImg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigation } from "@react-navigation/native";

export default function WriteScreen() {
  

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState();

  const user = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();



  const postSubmitHandler = async () => {

    if(!category) {
        Alert.alert("알림","카테고리를 선택해주세요!");
        return ;
    }
    if(!title) {
        Alert.alert("알림","제목을 입력해주세요!");
        return ;
    }
    if(!content) {
        Alert.alert("알림","내용을 입력해주세요!");
        return ;
    }

    setIsLoading(true);
    
    try {
        let imageUrl = "";
        if (image) {
          imageUrl = await uploadImg(image, `postImage/${Date.now()}.jpg`)
        } else {
          imageUrl = null;
        }

        const postData = { title, content, category, imageUrl, uid: user.uid, username: user.username, createdAt: serverTimestamp()};

        await  addDoc(collection(db, "posts"), postData);

        Alert.alert("알림","글 등록이 완료 되었습니다.");
        navigation.replace("Board");
    } catch (err) {
      Alert.alert("글 등록 오류", "게시글 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.log("글 작성 중 오류 : " ,err);
    } finally {
      setIsLoading(false);
    }

  }


  if (isLoading) return <Loading />

  return (
    <BaseView style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <HeaderText style={styles.title}>게시글 작성</HeaderText>
        </View>

        <View style={styles.main}>
          <CategorySelect value={category} setValue={setCategory} />
          <View style={styles.inputGroup}>
            <InputLabel>제목</InputLabel>
            <BaseInput value={title} onChangeText={setTitle}/>
          </View>
          <View style={styles.inputGroup}>
            <InputLabel>내용</InputLabel>
            <BaseInput
              multiline={true}
              numberOfLines={6}
              style={styles.inputContent}
              value={content}
              onChangeText={setContent}
            />
          </View>
          <View>
            <BoardImagePick image={image} setImage={setImage} />
          </View>

          <View>
            <CustomBtn style={styles.btn} onPress={postSubmitHandler}>작성하기</CustomBtn>
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: wp("100%"),
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    marginVertical: 30,
    width: wp("100%"),
  },
  main: {
    gap: 30,
    alignItems: "center",
  },
  scrollView: {
    width: wp("100%"),
  },
  inputGroup: {
    width: wp("80%"),
    gap: 5,
  },
  inputContent: {
    height: 150,
    textAlignVertical: "top",
  },
  dropDown: {
    width: wp("50%"),
  },
  btn: {
    marginVertical: 30,
    width: wp("50%")
  }
});
