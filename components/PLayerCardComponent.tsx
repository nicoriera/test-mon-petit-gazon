import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Player, Club } from "../types";
import { getPlayerPosition } from "../utils";

type PlayerCardProps = {
  player: Player;
  clubs: Club[];
  onPress: () => void;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player, clubs, onPress }) => {
  const club: Club | undefined = clubs.find((c) => c.id === player.clubId);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text>
          {player.firstName} {player.lastName}
        </Text>
        <Text>Position: {String(getPlayerPosition(player.ultraPosition))}</Text>
        {club && <Text>Club: {club.name["fr-FR"]}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#71D671",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default PlayerCard;
