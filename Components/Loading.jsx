import { View, Text, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const Base = () => {
  const ballRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateBall = Animated.loop(
      Animated.timing(ballRotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    rotateBall.start();
  }, []);

  const ballStyle = {
    transform: [
      {
        rotate: ballRotation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <Animated.Image
      source={require("../assets/baseball.png")}
      style={[{ width: 50, height: 50 }, ballStyle]}
    />
  );
};

const Loading = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.text}>Loading</Text>
        <Base />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#333333",
    padding: 20,
    paddingTop: 10,
    width: 120,

    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#EF5350",
    marginTop: 10,
    paddingBottom: 5,
  },
});

export default Loading;
