import { Pressable, View, Text, Image } from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function ImagePick({ image, setImage }) {
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

  return (
    <Pressable
      onPress={pickImg}
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{ width: 70, height: 70, borderRadius: 50 }}
        />
      ) : (
        <Image
          source={require("../../../assets/profileMint.jpg")}
          style={{
            width: 70,
            height: 70,
            borderRadius: 50,
            backgroundColor: "#ccc",
          }}
        />
      )}
    </Pressable>
  );
}
