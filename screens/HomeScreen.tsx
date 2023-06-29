import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import PlayerCardComponent from "../components/PlayerCardComponent";

import { Club } from "../types";
import { Player } from "../types";

// Déclarez le type pour la navigation
type PlayerDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PlayerDetail"
>;

// Déclarez les props pour PlayerDetailScreen
type PlayerDetailScreenProps = {
  navigation: PlayerDetailScreenNavigationProp;
  route: { params: { playerId: string } };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");

  const numColumns = 1;

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

  const renderPlayerCard = ({ item }: { item: Player }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Navigating to PlayerDetail with ID:", item.id);
        navigation.navigate("PlayerDetail", { playerId: item.id });
      }}
    >
      <PlayerCardComponent player={item} clubs={clubs} players={players} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par nom"
        value={searchName}
        onChangeText={(text) => setSearchName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Rechercher par position"
        value={searchPosition}
        onChangeText={(text) => setSearchPosition(text)}
      />

      <ScrollView style={styles.scroll}>
        <FlatList
          data={filterPlayers()}
          renderItem={renderPlayerCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 1,
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
});

export default HomeScreen;
