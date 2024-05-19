import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text } from "react-native";
import Matches from "./Screens/Matches";
import Channels from "./Screens/Channels";
import VideoPlayer from "./Screens/VideoPlayer";
import { View, StatusBar } from "react-native";
import NewApp from "./Components/NewApp";
import {
  AdEventType,
  AppOpenAd,
  TestIds,
} from "react-native-google-mobile-ads";
import Splash from "./Components/Splash";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { useState } from "react";
import axios from "axios";

const Stack = createNativeStackNavigator();

const showRateAlert = (link) => {
  Alert.alert(
    "Rate Us 🌟",
    "We are working very hard to provide you HD live streams. Kindly rate us so we can provide more sports in future😉",
    [
      {
        text: "Later",
        style: "cancel",
      },
      {
        text: "Rate Now",
        onPress: () => {
          if (link) Linking.openURL(link);
        },
      },
    ],
    { cancelable: false }
  );
};

function CustomHeader({ ratingUrl }) {
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
          if (ratingUrl)
            Linking.openURL(ratingUrl).catch((err) => console.log(err));
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
  const [options, setOptions] = useState({});

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { data } = await axios.get(
          "https://mlb-server-beta.vercel.app/api/options"
        );
        setOptions(data);
        setLoading(false);
        if (true) {
          showRateAlert(options.ratingUrl);
        }
        if (data.adsOn) {
          loadAd();
        }
      } catch (err) {
        console.error("Error fetching options:", err);
        setLoading(false);
      }
    };

    const loadAd = () => {
      const appOpenAd = AppOpenAd.createForAdRequest(
        "ca-app-pub-7792480241298867/9034556683"
      );
      appOpenAd.load();
      appOpenAd.addAdEventListener("loaded", () => {
        setLoading(false);
        appOpenAd.show();
      });
      appOpenAd.addAdEventListener(AdEventType.ERROR, () => {
        setLoading(false);
      });
    };

    fetchOptions();
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
      <NewApp link={options.redirectLink} visible={options.redirect} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => <CustomHeader ratingUrl={options.ratingUrl} />,
          }}
        >
          <Stack.Screen
            name="Matches"
            component={Matches}
            initialParams={{ adsOn: options.adsOn }}
          />

          <Stack.Screen
            name="Channels"
            component={Channels}
            initialParams={{ adsOn: options.adsOn }}
          />
          <Stack.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={{ headerShown: false, orientation: "landscape" }}
            initialParams={{ adsOn: options.adsOn }}
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
