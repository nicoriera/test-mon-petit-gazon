import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Club {
  id: string;
  name: { [key: string]: string };
}

const ListClubComponent: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClubValue, setSelectedClubValue] = useState<string | null>(
    null
  );
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [open, setOpen] = useState(false);

  const getClubs = async () => {
    try {
      const response = await axios.get<{
        championshipClubs: Record<string, Club>;
      }>("https://api.mpg.football/api/data/championship-clubs");
      const clubsData = Object.values(response.data.championshipClubs);
      setClubs(clubsData);
    } catch (error) {
      console.error(error);

      // Gérez les erreurs ici
    }
  };

  useEffect(() => {
    getClubs();
  }, []);

  useEffect(() => {
    if (selectedClubValue) {
      const selectedClub = clubs.find((club) => club.id === selectedClubValue);
      setSelectedClub(selectedClub ?? null);
    }
  }, [selectedClubValue]);

  return (
    <View>
      <Text>Sélectionnez un club :</Text>
      <DropDownPicker
        open={open}
        value={selectedClubValue}
        items={clubs.map((club) => ({
          label: club.name["fr-FR"],
          value: club.id,
        }))}
        setOpen={setOpen}
        setValue={setSelectedClubValue}
        setItems={setClubs}
        placeholder="-- Sélectionner --"
        searchable={true}
        searchPlaceholder="Rechercher un club"
      />
      {selectedClub && (
        <Text>Club sélectionné : {selectedClub.name["fr-FR"]}</Text>
      )}
    </View>
  );
};

export default ListClubComponent;
