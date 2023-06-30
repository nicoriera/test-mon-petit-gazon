import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Club } from "../types";
import { Player } from "../types";
import { PlayerCardProps } from "../types";

//////////////////////////////////////////

const Card = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");

  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("PlayerDetail" as never);
  };

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

  const filterPlayers = () => {
    let filteredPlayers = players;

    if (searchName.trim() !== "") {
      filteredPlayers = filteredPlayers.filter((player) => {
        const firstName = player.firstName
          ? player.firstName.toLowerCase()
          : "";
        const lastName = player.lastName ? player.lastName.toLowerCase() : "";

        return (
          firstName.includes(searchName.toLowerCase()) ||
          lastName.includes(searchName.toLowerCase())
        );
      });
    }

    if (searchPosition.trim() !== "") {
      filteredPlayers = filteredPlayers.filter((player) =>
        getPlayerPosition(player.ultraPosition)
          .toLowerCase()
          .includes(searchPosition.toLowerCase())
      );
    }

    return filteredPlayers;
  };

  const getPlayerPosition = (ultraPosition: number) => {
    switch (ultraPosition) {
      case 10:
        return "Gardien - G";
      case 20:
        return "Défenseur - D";
      case 21:
        return "Latéral - L";
      case 30:
        return "Milieu défensif - MD";
      case 31:
        return "Milieu offensif - MO";
      case 40:
        return "Attaquant - A";
      default:
        return "";
    }
  };

  const renderPlayerCard = (player: Player) => (
    <View>
      <TouchableOpacity onPress={handleCardPress}>
        <View style={styles.card}>
          <Text>
            {player.firstName} {player.lastName}
          </Text>
          <Text>
            Position: {String(getPlayerPosition(player.ultraPosition))}
          </Text>

          <Text>Quotation: {player.quotation}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Rechercher par nom" />

        <TextInput style={styles.input} placeholder="Rechercher par position" />
      </View>

      <FlatList
        data={filterPlayers()}
        renderItem={({ item }) => renderPlayerCard(item)}
      />
    </View>
  );
};

export default Card;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  containerInput: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#71D671",
    boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  },
  cardText: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "50%",
    borderRadius: 10,
  },
  cardContainer: {},
  scroll: {
    width: "100%",
  },
};
