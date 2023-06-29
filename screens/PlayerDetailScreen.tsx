import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailPlayerComponent from "../components/DetailPlayerComponent";

interface PlayerDetail {
  id: string;
  name: string;
  stats: any; // Replace "any" with the appropriate data structure for player statistics
}

interface PlayerDetailScreenProps {
  route: any; // Remplacez "any" par le type approprié pour le paramètre de navigation
}

const PlayerDetailScreen: React.FC<PlayerDetailScreenProps> = ({ route }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(
    null
  );

  useEffect(() => {
    const playerId = route.params?.playerId;
    fetchPlayerDetail(playerId);
  }, []);

  const fetchPlayerDetail = async (playerId: string) => {
    try {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2022`
      );
      const data = await response.json();
      setSelectedPlayer(data);
    } catch (error) {
      console.error("Failed to fetch player detail:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Detail</Text>
      {selectedPlayer && <DetailPlayerComponent player={selectedPlayer} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default PlayerDetailScreen;
