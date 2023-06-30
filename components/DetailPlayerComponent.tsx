import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { DetailPlayerComponentProps, PlayerDetail } from "../types";

import { getPlayerPosition } from "../utils";

const DetailPlayerComponent: React.FC<DetailPlayerComponentProps> = ({
  player,
}) => {
  // Utilisez la propriété 'player' pour afficher les détails du joueur
  return (
    <View>
      <Text>Prénom : {player.firstName}</Text>
      <Text>Nom : {player.lastName}</Text>
      <Text>Position: {String(getPlayerPosition(player.ultraPosition))}</Text>
      {/* Affichez les autres détails du joueur ici */}
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

export default DetailPlayerComponent;
