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

  const guardianPosition = player.ultraPosition !== 10;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardPlayerInfo}>
          <Text style={styles.cardNameInfo}>
            {player.firstName} {player.lastName}
          </Text>
          <Text>{String(getPlayerPosition(player.ultraPosition))}</Text>
          <View style={styles.cardMoreInfo}>
            <Text style={styles.text}>Note: {player.quotation}</Text>
            {guardianPosition ? (
              <Text style={styles.text}>But(s): {player.stats.totalGoals}</Text>
            ) : null}
            <Text style={styles.text}>
              Match joué(s): {player.stats.totalPlayedMatches}
            </Text>
          </View>
        </View>
        <View style={styles.cardClubInfo}>
          {club ? (
            <>
              <Text style={styles.cardNameClubInfo}>{club.name["fr-FR"]}</Text>
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
    justifyContent: "space-between",
    backgroundColor: "#F3CA40",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: "#393D3F",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 10,
  },
  jerseyImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  cardPlayerInfo: {
    flexDirection: "column",
    padding: 10,
  },
  cardClubInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  cardNameInfo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardNameClubInfo: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardMoreInfo: {
    marginTop: 10,
  },
  text: {
    fontSize: 13,
    color: "#393D3F",
  },
});

export default PlayerCard;
