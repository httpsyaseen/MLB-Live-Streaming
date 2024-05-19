import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Linking, Pressable, StyleSheet, Text } from "react-native";
import Matches from "./Screens/Matches";
import Channels from "./Screens/Channels";
import VideoPlayer from "./Screens/VideoPlayer";
import { View, StatusBar } from "react-native";
import { AppOpenAd, TestIds } from "react-native-google-mobile-ads";
import Splash from "./Components/Splash";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { useState } from "react";

const Stack = createNativeStackNavigator();

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerText}>Premium </Text>
        <Text style={{ fontSize: 17, color: "white", fontWeight: "bold" }}>
          Ad Free 👑
        </Text>
      </View>
      <Pressable
        onPress={() => {
          Linking.openURL(
            "https://docs.expo.dev/versions/latest/sdk/video/"
          ).catch((err) => console.log(err));
        }}
      >
        <Text style={styles.ratenow}>Rate us 🌟</Text>
      </Pressable>
    </View>
  );
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const appOpenAd = AppOpenAd.createForAdRequest(
      "ca-app-pub-7792480241298867/9034556683"
    );
    appOpenAd.load();

    appOpenAd.addAdEventListener("loaded", () => {
      setLoading(false);
      appOpenAd.show();
    });
  }, []);

  useEffect(() => {
    const initializeMessaging = async () => {
      await messaging().requestPermission();

      messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

      unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${remoteMessage.notification.title}`,
            body: `${remoteMessage.notification.body}`,
          },
          trigger: null,
        });
      });
    };

    initializeMessaging();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <>
      <StatusBar backgroundColor={"#28282B"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => <CustomHeader />,
          }}
        >
          <Stack.Screen name="Matches" component={Matches} />
          <Stack.Screen name="Channels" component={Channels} />
          <Stack.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={{ headerShown: false, orientation: "landscape" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 55,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#28282B",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  ratenow: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },
});
