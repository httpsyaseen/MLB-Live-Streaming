import { View, Text, Image, StyleSheet } from "react-native";

const teams = [
  {
    name: "Chicago White Sox",
    image: require("../assets/chicago-white-sox-live-stream.png.webp"),
  },
  {
    name: "Cleveland Guardians",
    image: require("../assets/cleveland-guardians-live-stream.png.webp"),
  },
  {
    name: "Detroit Tigers",
    image: require("../assets/detroit-tigers-live-stream.png.webp"),
  },
  {
    name: "Kansas City Royals",
    image: require("../assets/kansas-city-royals.png.webp"),
  },
  {
    name: "Minnesota Twins",
    image: require("../assets/minnesota-twins-live-stream.png.webp"),
  },
  {
    name: "Baltimore Orioles",
    image: require("../assets/baltimore-orioles-live-stream.png.webp"),
  },
  {
    name: "Boston Red Sox",
    image: require("../assets/boston-red-sox-live-stream.png.webp"),
  },
  {
    name: "New York Yankees",
    image: require("../assets/new-york-yankees-live-stream.png.webp"),
  },
  {
    name: "Tampa Bay Rays",
    image: require("../assets/tampa-bay-rays-live-stream.png.webp"),
  },
  {
    name: "Toronto Blue Jays",
    image: require("../assets/toronto-blue-jays-live-stream.png.webp"),
  },
  {
    name: "Houston Astros",
    image: require("../assets/houston-astros-live-stream.png.webp"),
  },
  {
    name: "Los Angeles Angels",
    image: require("../assets/los-angeles-angels-live-stream.png.webp"),
  },
  {
    name: "Oakland Athletics",
    image: require("../assets/oakland-athletics-live-stream.png.webp"),
  },
  {
    name: "Seattle Mariners",
    image: require("../assets/seattle-mariners-live-stream.png.webp"),
  },
  {
    name: "Texas Rangers",
    image: require("../assets/texas-rangers-live-stream.png.webp"),
  },
  {
    name: "Chicago Cubs",
    image: require("../assets/chicago-cubs-live-stream.png.webp"),
  },
  {
    name: "Cincinnati Reds",
    image: require("../assets/cincinnati-reds-live-stream.png.webp"),
  },
  {
    name: "Milwaukee Brewers",
    image: require("../assets/milwaukee-brewers-live-stream.png.webp"),
  },
  {
    name: "Pittsburgh Pirates",
    image: require("../assets/pittsburgh-pirates-live-stream.png.webp"),
  },
  {
    name: "St. Louis Cardinals",
    image: require("../assets/st.-louis-cardinals-live-stream.png.webp"),
  },
  {
    name: "Atlanta Braves",
    image: require("../assets/atlanta-braves-live-stream.png.webp"),
  },
  {
    name: "Miami Marlins",
    image: require("../assets/miami-marlins-live-stream.png.webp"),
  },
  {
    name: "New York Mets",
    image: require("../assets/new-york-mets-live-stream.png.webp"),
  },
  {
    name: "Philadelphia Phillies",
    image: require("../assets/philadelphia-phillies-live-stream.png.webp"),
  },
  {
    name: "Washington Nationals",
    image: require("../assets/washington-nationals-live-stream.png.webp"),
  },
  {
    name: "Arizona Diamondbacks",
    image: require("../assets/arizona-diamondbacks-live-stream.png.webp"),
  },
  {
    name: "Colorado Rockies",
    image: require("../assets/colorado-rockies-live-stream.png.webp"),
  },
  {
    name: "Los Angeles Dodgers",
    image: require("../assets/los-angeles-dodgers-live-stream.png.webp"),
  },
  {
    name: "San Diego Padres",
    image: require("../assets/san-diego-padres-live-stream.png.webp"),
  },
  {
    name: "San Francisco Giants",
    image: require("../assets/san-francisco-giants-live-stream.png.webp"),
  },
];

export default function MatchCard({ item }) {
  const { awayTeam: team1, homeTeam: team2, time } = item;

  const isLive = item.is_live;

  const homeTeam = teams.find((p) => p.name === team1);
  const awayTeam = teams.find((p) => p.name === team2);

  return (
    <View style={styles.container}>
      <View style={styles.teamContainer}>
        <Image source={homeTeam.image} style={styles.logo} />
        <Text style={styles.teamName}>{team1}</Text>
      </View>
      <View style={styles.vsContainer}>
        <Image source={require("../assets/vs.png")} style={styles.logo1} />
        <Text style={styles.gameTime}>{time}</Text>
        <Text style={[isLive ? styles.liveIndicator : styles.paused]}>
          <Text>{"\u2B24"}</Text>
          {isLive ? " LIVE" : " To be Started"}
        </Text>
      </View>
      <View style={styles.teamContainer}>
        <Image source={awayTeam.image} style={styles.logo} />
        <Text style={styles.teamName}>{team2}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E4E2",
    padding: 10,
    paddingBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 14,
    borderRadius: 16,
    elevation: 10,
  },
  teamContainer: {
    alignItems: "center",
    width: 80,
  },
  logo: {
    width: 50,
    height: 50,
  },
  teamName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
  },
  vsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  vs: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
  },
  gameTime: {
    fontSize: 14,
    color: "black",
  },

  logo1: {
    width: 50,
    height: 50,
  },
  liveIndicator: {
    color: "white",
    backgroundColor: "red",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
  },
  paused: {
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
  },
});
