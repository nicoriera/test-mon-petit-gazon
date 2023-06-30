import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type PlayerFilterProps = {
  searchName: string;
  searchPosition: string;
  onNameChange: (name: string) => void;
  onPositionChange: (position: string) => void;
};

const PlayerFilter: React.FC<PlayerFilterProps> = ({
  searchName,
  searchPosition,
  onNameChange,
  onPositionChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par nom"
        value={searchName}
        onChangeText={onNameChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Rechercher par position"
        value={searchPosition}
        onChangeText={onPositionChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: "50%",
    borderRadius: 10,
  },
});

export default PlayerFilter;
