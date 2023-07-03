import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
  ViewStyle,
  ImageStyle,
} from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";

import { Club } from "../types";
import { Player } from "../types";
import { RootStackParamList } from "../types";

import { getPlayerPosition } from "../utils";

import PlayerCard from "../components/PLayerCardComponent";
import PlayerFilter from "../components/PlayerFilterComponent";

//////////////////////////////////////////
type PlayerDetailScreenProps = {
  route: RouteProp<RootStackParamList, "PlayerDetail">;
};

const Card: React.FC<PlayerDetailScreenProps> = ({ route }) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchName, setSearchName] = useState("");

  const [loading, setLoading] = useState(true); // Mettre le loader par défaut à true au démarrage

  const navigation = useNavigation();

  const handleCardPress = (playerId: string) => {
    navigation.navigate("PlayerDetail", { playerId });
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
      setClubs(Object.values(data.championshipClubs));
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
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Mettre le loader à false une fois les joueurs récupérés
    }
  };

  const filterPlayers = () => {
    return players.filter((player) => {
      const firstName = player.firstName ? player.firstName.toLowerCase() : "";
      const lastName = player.lastName ? player.lastName.toLowerCase() : "";
      const position = getPlayerPosition(player.ultraPosition)
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return (
        firstName.includes(searchName.toLowerCase()) ||
        lastName.includes(searchName.toLowerCase()) ||
        position
      );
    });
  };

  const renderPlayerCard = ({ item }: { item: Player }) => (
    <PlayerCard
      player={item}
      onPress={() => handleCardPress(item.id)}
      clubs={clubs}
      players={players}
    />
  );

  if (loading) {
    // Afficher le loader tant que les joueurs sont en train d'être chargés
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#45C945" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/logoMpg-GHHGJFQB.png")}
          style={styles.imageLogo}
        />
      </View>
      <PlayerFilter searchName={searchName} onNameChange={setSearchName} />

      <FlatList data={filterPlayers()} renderItem={renderPlayerCard} />
    </View>
  );
};

export default Card;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  } as ViewStyle,
  card: {
    backgroundColor: "#71D671",
    elevation: 10,
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  } as ViewStyle,
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  logo: {
    width: 80,
    height: 100,
    alignSelf: "center",
  } as ViewStyle,
  imageLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    backgroundColor: "#fff",
  } as ImageStyle,
};
