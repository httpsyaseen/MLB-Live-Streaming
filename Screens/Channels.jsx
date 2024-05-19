import { useState, useEffect } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import ChannelCard from "../Components/ChannelCard";

export default Channels = ({ navigation, route }) => {
  const [streams, setStreams] = useState([]);
  const { channels, headers } = route.params;

  useEffect(() => {
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
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "#28282B" }}>
        <FlatList
          data={streams}
          renderItem={({ item, index }) => {
            return (
              <>
                <Pressable
                  onPress={() =>
                    navigation.navigate("VideoPlayer", {
                      channel: item.channel,
                      headers: item.headers,
                    })
                  }
                >
                  <ChannelCard channel={`MLB Channel ${index + 1}`} />
                </Pressable>
              </>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
};
