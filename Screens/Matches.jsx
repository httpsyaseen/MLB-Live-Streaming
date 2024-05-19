import { View, FlatList, Pressable, Text, Alert } from "react-native";
import { useEffect, useState } from "react";
import MatchCard from "../Components/MatchCard";
import axios from "axios";
import Loading from "../Components/Loading";
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
} from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-7792480241298867/2064402770"
  // {
  //   keywords: ["fashion", "clothing"],
  // }
);

function BannerAdComponent() {
  return (
    <BannerAd
      unitId={"ca-app-pub-7792480241298867/4787834692"}
      size={BannerAdSize.BANNER}
    />
  );
}

function NoGame() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text style={{ fontSize: 30, color: "white" }}>No Games Today 😞</Text>
    </View>
  );
}
export default Matches = ({ navigation }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       console.log("Interstitial Add Loaded");
  //       interstitial.show();
  //     }
  //   );

  //   interstitial.load();

  //   return unsubscribe;
  // }, []);

  const renderAd = (index) => {
    if ((index + 1) % 2 === 0) {
      return (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <BannerAdComponent />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    async function fetchSchedule() {
      const gameInfo = [];
      try {
        const { data } = await axios.get(
          "https://freemlb.securepayments.live/public/api/games"
        );
        setLoading(false);

        for (let i = 0; i < data.response.length; i++) {
          const homeTeam = data.response[i].team_one.name;
          const awayTeam = data.response[i].team_two.name;
          const time = data.response[i].time
            ? `${data.response[i].date} ${data.response[i].time}`
            : data.response[i].date;
          const channels = data.response[i].additional_links.split(";");
          const is_live = data.response[i].is_live;
          const str = data.response[i].other_headers.replace(/;/g, "");
          const jsonStrings = str.split("}{").map((s, index, array) => {
            if (index === 0) {
              return s + "}";
            } else if (index === array.length - 1) {
              return "{" + s;
            } else {
              return "{" + s + "}";
            }
          });
          const headers = jsonStrings;

          const gameObject = {
            homeTeam,
            awayTeam,
            time,
            channels,
            headers,
            is_live,
          };
          gameInfo.push(gameObject);
        }
        setSchedule(gameInfo);
      } catch (err) {
        setLoading(false);
      }
    }

    fetchSchedule();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#28282B" }}>
        {schedule.length < 1 && <NoGame />}
        <FlatList
          data={schedule}
          renderItem={({ item, index }) => {
            return (
              <>
                <Pressable
                  onPress={() => {
                    if (!item.is_live) {
                      Alert.alert("Starting soon", "Match will start Soon😉");
                    } else {
                      navigation.navigate("Channels", {
                        channels: item.channels,
                        headers: item.headers,
                      });
                    }
                  }}
                >
                  <MatchCard item={item} />
                </Pressable>
                {renderAd(index)}
              </>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};
