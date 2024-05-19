import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Alert, Pressable, Text } from "react-native";
import { Video } from "expo-av";
import Loading from "../Components/Loading";
// import {
//   InterstitialAd,
//   AdEventType,
//   TestIds,
// } from "react-native-google-mobile-ads";

const FullScreenLandscapeVideoPlayer = ({ route }) => {
  const { channel, headers } = route.params;

  // const interstitial = InterstitialAd.createForAdRequest(
  //   // "ca-app-pub-7792480241298867/9260711990",
  //   TestIds.INTERSTITIAL,
  //   {
  //     keywords: ["fashion", "clothing"],
  //   }
  // );

  // useEffect(() => {
  //   const unsubscribe = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       console.log("Video ad");
  //       interstitial.show();
  //     }
  //   );

  //   interstitial.load();

  //   return unsubscribe;
  // }, []);

  const videoRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable></Pressable>
      <Video
        ref={videoRef}
        style={{
          width: "50%",
          height: "99%",
          flex: 1,
        }}
        source={{
          uri: channel,
          headers: headers,
        }}
        onLoadStart={() => <Loading />}
        resizeMode="cover"
        useNativeControls={true}
        onError={(err) =>
          Alert.alert(
            "Error Occured",
            "Channel is currently not working try any other channel 😅"
          )
        }
        isLooping
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
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    position: "absolute",
    bottom: 32,
  },
  controlButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FullScreenLandscapeVideoPlayer;
