import { useEffect, useState } from "react";
import GameCard from "../Components/GameCard";
import { FlatList, View } from "react-native";
import axios from "axios";
import Loading from "../Components/Loading";

const GameScreen = () => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSchedule() {
      try {
        const { data } = await axios.get(
          "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1"
        );
        setSchedule(data.dates[0].games);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getSchedule();
  }, []);

  return (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      {loading && <Loading />}
      <FlatList
        data={schedule}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <GameCard
                gameDate={item?.gameDate}
                homeTeam={item?.teams?.home?.team}
                awayTeam={item?.teams?.away?.team}
                venue={item?.venue?.name}
                status={item?.status?.abstractGameState}
                homeTeamScore={String(item?.teams?.home?.score)}
                awayTeamScore={String(item?.teams?.away?.score)}
                awayTeamIsWinner={item?.teams?.away?.isWinner}
                homeTeamIsWinner={item?.teams?.away?.isWinner}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default GameScreen;
