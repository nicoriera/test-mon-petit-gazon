import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import DetailPlayerComponent from "../components/DetailPlayerComponent";

import { PlayerDetail, PlayerDetailScreenProps } from "../types";

//////////////////////////////////////////////////////

const PlayerDetailScreen = ({ route }: PlayerDetailScreenProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  // Navigation
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  //  Fetch player detail

  useEffect(() => {
    const playerId = route.params?.playerId;
    if (playerId) {
      fetchPlayerDetail(playerId);
    }
  }, [route.params]);

  const fetchPlayerDetail = async (playerId: string) => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2022`
      );
      const data = await response.json();

      setSelectedPlayer(data);

      setLoading(false); // Set loading to false after receiving the data
    } catch (error) {
      console.error("Failed to fetch player detail:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGoBack}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.goback}>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Détails du joueur</Text>

        {loading ? (
          <Text>Loading...</Text>
        ) : selectedPlayer ? (
          <DetailPlayerComponent player={selectedPlayer} />
        ) : (
          <Text>No player selected</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTitle: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerGoBack: {
    backgroundColor: "lightgray",
    padding: 10,
  },
  goback: {
    fontSize: 12,
    color: "#3B3B3B",
    fontWeight: "bold",
  },
});

export default PlayerDetailScreen;
