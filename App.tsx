import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";

interface Club {
  id: string;
  name: string;
}

interface Player {
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
}

interface PlayerDetail {
  id: string;
  name: string;
  stats: any; // Replace "any" with the appropriate data structure for player statistics
}

export default function App() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetail | null>(
    null
  );
  const [searchName, setSearchName] = useState("");
  const [searchPosition, setSearchPosition] = useState("");

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

  const fetchPlayerDetail = async (playerId: string) => {
    try {
      const response = await fetch(
        `https://api.mpg.football/api/data/championship-player-stats/${playerId}/2022`
      );
      const data = await response.json();
      setSelectedPlayer(data);
    } catch (error) {
      console.error("Failed to fetch player detail:", error);
    }
  };

  const filterPlayers = () => {
    let filteredPlayers = players;

    // Filtrer par nom
    if (searchName.trim() !== "") {
      filteredPlayers = filteredPlayers.filter(
        (player) =>
          player.firstName.toLowerCase().includes(searchName.toLowerCase()) ||
          player.lastName.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // Filtrer par position
    if (searchPosition.trim() !== "") {
      filteredPlayers = filteredPlayers.filter((player) =>
        getPlayerPosition(player.ultraPosition)
          .toLowerCase()
          .includes(searchPosition.toLowerCase())
      );
    }

    return filteredPlayers;
  };

  const renderItem = ({ item }: { item: Player }) => (
    <PlayerCard player={item} />
  );

  const renderPlayerDetail = () => {
    if (selectedPlayer) {
      return (
        <View>
          <Text>{selectedPlayer.name}</Text>
          {/* Display player statistics here */}
        </View>
      );
    }
    return null;
  };

  const PlayerCard = ({ player }: { player: Player }) => (
    <TouchableOpacity onPress={() => fetchPlayerDetail(player.id)}>
      <View style={styles.card}>
        <Text>
          {player.firstName} {player.lastName}
        </Text>
        <Text>Position: {getPlayerPosition(player.ultraPosition)}</Text>
        <Text>Quotation: {player.quotation}</Text>
      </View>
    </TouchableOpacity>
  );

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
    <View style={styles.container}>
      <TextInput
        placeholder="Rechercher par nom"
        value={searchName}
        onChangeText={(text) => setSearchName(text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Rechercher par position"
        value={searchPosition}
        onChangeText={(text) => setSearchPosition(text)}
        style={styles.input}
      />

      <View style={styles.playerGrid}>
        {filterPlayers().map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </View>

      {renderPlayerDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "80%",
  },
  playerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    margin: 10,
  },
});
