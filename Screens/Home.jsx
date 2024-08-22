import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Card = ({ title, subtitle, backgroundImage, onPress }) => (
  <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const BeautifulCards = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card
        title="MLB Schedules and Scores"
        subtitle="Stay updated with the latest baseball action and Daily Schedules"
        backgroundImage={require("../assets/player.jpeg")}
        onPress={() => {
          navigation.navigate("Schedule");
        }}
      />
      <Card
        title="Live Streams"
        subtitle="Enjoy real-time access to your favorite events and shows in HD"
        backgroundImage={require("../assets/livestream.jpg")}
        onPress={() => {
          navigation.navigate("Matches");
        }}
      />
      <Card
        title="Subscriptions"
        subtitle="Subscribe to our packages and enjoy free HD streams 24/7 with No Ads"
        backgroundImage={require("../assets/subscription.jpg")}
        onPress={() => {
          navigation.navigate("Schedule");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#28282b",
    // backgroundColor: "#000",
  },
  cardContainer: {
    width: "100%",
    height: "26%",
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the last value (0.5) to control dimness
    justifyContent: "flex-start",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default BeautifulCards;
