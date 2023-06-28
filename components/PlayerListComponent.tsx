import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";

interface Player {
  id: string;
  name: string;
  position: string;
  // Autres propriétés des statistiques du joueur
}

interface PlayerListComponentProps {
  clubId: string;
}

const PlayerListComponent: React.FC<PlayerListComponentProps> = ({
  clubId,
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const [filterPosition, setFilterPosition] = useState<string>("");

  const getPlayers = async () => {
    try {
      const response = await axios.get<{ players: Player[] }>(
        `https://api.mpg.football/api/data/championship-players-pool/${clubId}`
      );
      const playersData = response.data.players;
      setPlayers(playersData);
      setFilteredPlayers(playersData);
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici
    }
  };

  useEffect(() => {
    getPlayers();
  }, [clubId]);

  const handleNameFilterChange = (value: string) => {
    setFilterName(value);
  };

  const handlePositionFilterChange = (value: string) => {
    setFilterPosition(value);
  };

  useEffect(() => {
    // Filtrer les joueurs en fonction du nom et de la position
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(filterName.toLowerCase()) &&
        (filterPosition === "" || player.position === filterPosition)
    );
    setFilteredPlayers(filtered);
  }, [filterName, filterPosition, players]);

  return (
    <View>
      <View>
        <Text>Nom du joueur :</Text>
        <TextInput
          value={filterName}
          onChangeText={handleNameFilterChange}
          placeholder="Filtrer par nom"
        />
      </View>
      <View>
        <Text>Position du joueur :</Text>
        <TextInput
          value={filterPosition}
          onChangeText={handlePositionFilterChange}
          placeholder="Filtrer par position"
        />
      </View>
      <FlatList
        data={filteredPlayers}
        keyExtractor={(player) => player.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.position}</Text>
            {/* Afficher les autres statistiques du joueur ici */}
          </View>
        )}
      />
    </View>
  );
};

export default PlayerListComponent;
