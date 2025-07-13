import { Animated, StyleSheet } from "react-native";

import CustomBtn from "../../components/ui/CustomBtn";
import { hp, wp } from "../../constants/responsive";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import BaseView from "../../components/common/BaseView";

export default function StartScreen() {

  const theme = useTheme();

  const navigation = useNavigation();

  const goLogin = () => {
    navigation.replace("Login");
  }

  const animationOpacity = useRef(new Animated.Value(0)).current;
  const animationPosition = useRef(new Animated.Value(-400)).current;
  const animationScale = useRef(new Animated.Value(0.75)).current;

  useEffect(() => {
    Animated.timing(animationOpacity, {
      toValue: 1,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(animationPosition, {
      toValue: 0,
      duration: 2000,
      bounciness: 22,
      speed: 4,
      useNativeDriver: true,
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animationScale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animationScale, {
          toValue: 0.75,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => {
        loop.stop();
    }

  }, []);

  return (
    <BaseView style={styles.baseView}>
      <Animated.Text
        style={[
          styles.text,
          {
            color: theme.primary,
            transform: [{ translateY: animationPosition }],
          },
        ]}
      >
        KLP community
      </Animated.Text>
      <Animated.Image
        source={require("../../../assets/catchu.png")}
        style={[styles.img, { transform: [{ scale: animationScale }] }]}
        resizeMode="cover"
      />
      <Animated.View style={{ opacity: animationOpacity }}>
        <CustomBtn onPress={goLogin}>시작하기</CustomBtn>
      </Animated.View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  baseView: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp("15%"),
    backgroundColor: "#000"
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  img: {
    width: wp("90%"),
    height: hp("40%"),
    borderRadius: 200,
  },
});
