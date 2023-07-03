import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Player, Club } from "../types";
import { getPlayerPosition } from "../utils";

type PlayerCardProps = {
  player: Player;
  clubs: Club[];
  onPress: () => void;
};

const PlayerCard: React.FC<PlayerCardProps> = ({ player, clubs, onPress }) => {
  const club: Club | undefined = clubs.find(
    (club) => club.id === player.clubId
  );

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardPlayerInfo}>
          <Text>
            {player.firstName} {player.lastName}
          </Text>
          <Text>
            Position: {String(getPlayerPosition(player.ultraPosition))}
          </Text>
        </View>
        <View style={styles.cardClubInfo}>
          {club ? (
            <>
              <Text>Club: {club.name["fr-FR"]}</Text>
              <Image
                source={{ uri: club.defaultJerseyUrl }}
                style={styles.jerseyImage}
              />
            </>
          ) : (
            <Text>Club: N/A</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#45C945",
    borderWidth: 1,
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  jerseyImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardPlayerInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cardClubInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default PlayerCard;
