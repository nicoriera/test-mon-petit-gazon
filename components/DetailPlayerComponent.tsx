import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PlayerDetail {
  id: string;
  name: string;
  stats: any; // Replace "any" with the appropriate data structure for player statistics
}
interface DetailPlayerComponentProps {
  player: PlayerDetail;
}

const DetailPlayerComponent: React.FC<DetailPlayerComponentProps> = ({
  player,
}) => {
  // Utilisez la propriété 'player' pour afficher les détails du joueur
  return (
    <View>
      <Text>{player.name}</Text>
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
