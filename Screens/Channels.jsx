import { useState, useEffect } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import ChannelCard from "../Components/ChannelCard";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
} from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-8966222560404211/6597510317"
);

export default Channels = ({ navigation, route }) => {
  const [streams, setStreams] = useState([]);
  const { channels, headers } = route.params;
  const { bannerAd, channelScreenAd } = route.params;

  useEffect(() => {
    interstitial.load();
    const fakeStreams = [];
    for (let i = 0; i < channels.length; i++) {
      const fakeStream = {};
      fakeStream.channel = channels[i];
      try {
        fakeStream.headers = JSON.parse(headers[i]);
      } catch (error) {}

      fakeStreams.push(fakeStream);
    }
    setStreams(fakeStreams);

    return () => interstitial.removeAllListeners();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#28282B",
        }}
      >
        <FlatList
          data={streams}
          style={{ height: "10%" }}
          renderItem={({ item, index }) => {
            return (
              <>
                <Pressable
                  onPress={() => {
                    if (channelScreenAd && interstitial.loaded) {
                      interstitial.show();
                    }
                    navigation.navigate("VideoPlayer", {
                      channel: item.channel,
                      headers: item.headers,
                    });
                  }}
                >
                  <ChannelCard channel={`MLB Channel ${index + 1}`} />
                </Pressable>
              </>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10%",
          }}
        >
          {bannerAd && (
            <BannerAd
              unitId={"ca-app-pub-8966222560404211/3197768463"}
              size={BannerAdSize.BANNER}
            />
          )}
        </View>
      </View>
    </>
  );
};
