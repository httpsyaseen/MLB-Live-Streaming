import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";

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

const GameCard = ({
  gameDate,
  homeTeam,
  awayTeam,
  venue,
  status,
  homeTeamScore,
  awayTeamScore,
  homeTeamIsWinner,
  awayTeamIsWinner,
}) => {
  const homeTeamImage = teams.find((p) => p.name === homeTeam.name);
  const awayTeamImage = teams.find((p) => p.name === awayTeam.name);

  const date = new Date(gameDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
  return (
    <View style={styles.cardContainer}>
      {/* <ImageBackground source={require("../assets/player.jpeg")}> */}
      <View style={styles.headerContainer}>
        <View style={styles.teamContainer}>
          <Image source={homeTeamImage.image} style={styles.teamLogo} />
          <Text style={styles.teamName}>{homeTeam.name}</Text>
        </View>

        <Image
          source={require("../assets/vs.png")}
          style={{ width: 50, height: 50 }}
        />
        <View style={styles.teamContainer}>
          <Image source={awayTeamImage.image} style={styles.teamLogo} />
          <Text style={styles.teamName}>{awayTeam.name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Date:</Text>
          <Text style={styles.infoText}>{formattedDate}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Venue:</Text>
          <Text style={styles.infoText}>{venue}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Status:</Text>
          <Text style={styles.infoText}>
            {status === "Final"
              ? "Match Ended"
              : status === "Live"
              ? "Live"
              : "Match not Started Yet"}
          </Text>
        </View>
        {homeTeamScore !== "undefined" && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Scores</Text>
            <Text style={styles.infoText}>
              {`${homeTeamScore || 0}:${awayTeamScore || 0}`}
            </Text>
          </View>
        )}
        {(awayTeamIsWinner || homeTeamIsWinner) && (
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Winner</Text>
            <Text style={styles.infoText}>
              {awayTeamIsWinner ? `${awayTeam.name}` : `${homeTeam.name}`}
            </Text>
          </View>
        )}
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // backgroundColor: "#242145",
    backgroundColor: "#E5E4E2",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  teamContainer: {
    alignItems: "center",
    width: "30%",
  },
  teamLogo: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  teamName: {
    fontSize: 16,
    // color: "#e7005e",
    fontWeight: "bold",
    marginTop: 8,
  },
  scoreContainer: {
    flexDirection: "row",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  infoContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default GameCard;
