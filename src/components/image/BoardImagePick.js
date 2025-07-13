import { Pressable, View, Image, StyleSheet } from "react-native";

import * as ImagePicker from "expo-image-picker";

import { MaterialIcons } from "@expo/vector-icons";
import BaseText from "../common/BaseText";
import { wp } from "../../constants/responsive";
import { useTheme } from "../../context/ThemeContext";

export default function BoardImagePick({ image, setImage }) {
  const theme = useTheme();

  const pickImg = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <BaseText>이미지 첨부</BaseText>
      <Pressable onPress={pickImg} style={styles.addBtn}>
        <MaterialIcons
          name="add-photo-alternate"
          size={50}
          color={theme.text}
        />
      </Pressable>

      {image ? (
        <View style={styles.previewImage}>
          <Image
            source={{ uri: image }}
            style={[styles.image, { borderColor: theme.text }]}
          />
          <Pressable
            onPress={removeImage}
            style={[styles.removeBtn, { backgroundColor: theme.background }]}
          >
            <BaseText>X</BaseText>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  addBtn: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    width: wp("90%"),
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
  },
  removeBtn: {
    position: "absolute",
    top: 2,
    right: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
});
