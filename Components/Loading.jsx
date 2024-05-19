import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="red" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    // backgroundColor: "transparent", // Semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#333333",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    marginTop: 10,
  },
});

export default Loading;
