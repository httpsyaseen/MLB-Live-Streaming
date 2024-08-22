import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Video } from "expo-av";
import Loading from "../Components/Loading";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-8966222560404211/6597510317"
);

const FullScreenLandscapeVideoPlayer = ({ route, navigation }) => {
  const { channel, headers } = route.params;
  const { videoScreenAd, videoAdTime } = route.params;

  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    videoRef.current.presentFullscreenPlayer();
    const loadAd = async () => {
      try {
        interstitial.load();
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show();
          videoRef.current.presentFullscreenPlayer();
        });
        interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          videoRef.current.presentFullscreenPlayer();
        });
      } catch (error) {}
    };

    const interval = setInterval(() => {
      if (videoScreenAd) {
        loadAd();
      }
    }, 1000 * 60 * videoAdTime);

    return () => {
      clearInterval(interval);
      interstitial.removeAllListeners();
    };
  }, []);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
        }}
        source={{
          // uri: channel,
          uri: "sdsd",
          headers: headers,
        }}
        onLoadStart={() => <Loading />}
        resizeMode="cover"
        useNativeControls={true}
        shouldPlay={true}
        onError={(err) => {
          console.log(err);
          navigation.goBack();
        }}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      {isLoading && <Loading />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FullScreenLandscapeVideoPlayer;
