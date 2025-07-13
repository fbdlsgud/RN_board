import { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { wp } from "../../constants/responsive";
import { useTheme } from "../../context/ThemeContext";



export default function CategorySelect({value, setValue}) {

    const theme = useTheme();

    const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    { label: "자유게시판", value: "free" },
    { label: "질문게시판", value: "qna" },
    { label: "꿀팁공유", value: "tips" },
  ]);


  return (
    <View style={styles.wrapper}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="카테고리를 선택해주세요"
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
        style={[styles.dropDown, {backgroundColor: theme.background, borderColor: theme.text}]}
        textStyle={{color: theme.text}}
        dropDownContainerStyle={[styles.dropDownContainer, {backgroundColor: theme.background, borderColor: theme.text}]}
        arrowIconStyle={{tintColor: theme.text}}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    zIndex: 1000,
  },
  dropDown: {
    width: wp("60%"),
    borderWidth: 2,
  },
  dropDownContainer: {
    width: wp("60%"),
    borderWidth: 1,
  },
});