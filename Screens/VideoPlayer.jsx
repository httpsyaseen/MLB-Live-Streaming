import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert, ActivityIndicator } from "react-native";
import { Video } from "expo-av";
import Loading from "../Components/Loading";
import { InterstitialAd, AdEventType } from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(
  "ca-app-pub-7792480241298867/2064402770"
);

const FullScreenLandscapeVideoPlayer = ({ route }) => {
  const { channel, headers } = route.params;
  const { videoScreenAd, videoAdTime } = route.params;
  console.log(videoAdTime);

  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(true);

  useEffect(() => {
    const loadAd = async () => {
      try {
        interstitial.load();
        interstitial.addAdEventListener(AdEventType.LOADED, () => {
          interstitial.show();
        });
        interstitial.addAdEventListener(AdEventType.CLOSED, () => {
          setIsFullScreen(true);
        });
      } catch (error) {}
    };

    const interval = setInterval(() => {
      console.log("VideoAd");
      if (videoScreenAd) {
        loadAd();
      }
    }, 1000 * 60 * videoAdTime);

    return () => {
      clearInterval(interval);
      interstitial.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (isFullScreen && videoRef.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  }, [isFullScreen]);

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
          uri: channel,
          headers: headers,
        }}
        onLoadStart={() => <Loading />}
        resizeMode="cover"
        useNativeControls={true}
        onError={(err) => {
          console.log(err);
          Alert.alert(
            "Error Occured",
            "Channel is currently not working, try another channel "
          );
        }}
        isLooping={true}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        onFullscreenUpdate={(event) => {
          if (
            event.fullscreenUpdate ===
            Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT
          ) {
            setIsFullScreen(true);
          } else if (
            event.fullscreenUpdate ===
            Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS
          ) {
            setIsFullScreen(false);
          }
        }}
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
