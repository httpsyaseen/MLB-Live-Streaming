import { View, Image, ActivityIndicator } from "react-native";

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
      }}
    >
      <Image
        source={require("../assets/base4.png")}
        style={{ height: 130, width: 180 }}
      />
      <ActivityIndicator size={"large"} color={"red"} />
    </View>
  );
}
