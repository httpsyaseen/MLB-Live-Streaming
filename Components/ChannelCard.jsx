import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ChannelCard = ({ channel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.channelName}>{channel}</Text>
      <Image source={require("../assets/tv.png")} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E4E2",
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 14,
    borderRadius: 16,
    elevation: 10,
    gap: 10,
    marginHorizontal: "9%",
    width: "83%",
  },
  channelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  channelName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  liveIndicator: {
    color: "white",
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ChannelCard;
