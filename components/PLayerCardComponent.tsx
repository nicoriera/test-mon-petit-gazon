import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Club } from "../types";
import { Player } from "../types";
import { PlayerCardProps } from "../types";

const PlayerCardComponent: React.FC<PlayerCardProps> = ({ player }) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetchClubs();
    fetchPlayers();
  }, []);

  const fetchClubs = async () => {
    try {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-clubs"
      );
      const data = await response.json();

      setClubs(data);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  };

  const fetchPlayers = async () => {
    try {
      const response = await fetch(
        "https://api.mpg.football/api/data/championship-players-pool/1"
      );
      const data = await response.json();

      if (Array.isArray(data.poolPlayers)) {
        setPlayers(data.poolPlayers);
      } else {
        console.error("Invalid players data:", data);
      }
    } catch (error) {
      console.error("Failed to fetch players:", error);
    }
  };

  const getPlayerPosition = (ultraPosition: number) => {
    switch (ultraPosition) {
      case 10:
        return "Gardien";
      case 20:
        return "Défenseur";
      case 21:
        return "Latéral";
      case 30:
        return "Milieu défensif";
      case 31:
        return "Milieu offensif";
      case 40:
        return "Attaquant";
      default:
        return "";
    }
  };

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <Text>
          {player.firstName} {player.lastName}
        </Text>
        <Text>Position: {String(getPlayerPosition(player.ultraPosition))}</Text>

        <Text>Quotation: {player.quotation}</Text>
        {/* <Text>
          Club:{" "}
          {String(clubs.find((club) => club.id === player.clubId)?.name) ||
            "Nom du club non trouvé"}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#85f790",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    minWidth: 20,
  },
});

export default PlayerCardComponent;
