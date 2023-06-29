import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import PlayerCardComponent from "../components/PLayerCardComponent";
import { useNavigation } from "@react-navigation/native";

type Club = {
  id: string;
  name: string;
};

type Player = {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
};

const HomeScreen = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const numColumns = 4;
  const cardsPerPage = 20;

  const navigation = useNavigation();

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

  // Fonction pour filtrer les joueurs en fonction du nom et de la position
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

  // Fonction pour afficher chaque carte de joueur
  const renderPlayerCard = ({ item }: { item: Player }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PlayerDetail", {
          player: item,
          clubs: clubs,
          players: players,
        } as { player: Player; clubs: Club[]; players: Player[] })
      }
    >
      <PlayerCardComponent player={item} clubs={clubs} players={players} />
    </TouchableOpacity>
  );

  // Fonction pour gérer le changement de page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fonction pour obtenir les données paginées
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return filterPlayers().slice(startIndex, endIndex);
  };

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

      <FlatList
        data={getPaginatedData()}
        renderItem={renderPlayerCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.cardContainer}
      />

      <View style={styles.pagination}>
        {Array.from(
          { length: Math.ceil(filterPlayers().length / cardsPerPage) },
          (_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.pageButton,
                currentPage === index + 1 && styles.activePageButton,
              ]}
              onPress={() => handlePageChange(index + 1)}
            >
              <Text style={styles.pageButtonText}>{index + 1}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "50%",
    borderRadius: 10,
  },
  cardContainer: {
    justifyContent: "space-between",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  pageButton: {
    backgroundColor: "#ccc",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  activePageButton: {
    backgroundColor: "#45C945",
  },
  pageButtonText: {
    color: "#fff",
  },
});

export default HomeScreen;
