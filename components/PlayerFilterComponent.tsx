import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type PlayerFilterProps = {
  searchName: string;
  onNameChange: (name: string) => void;
};

const PlayerFilter: React.FC<PlayerFilterProps> = ({
  searchName,

  onNameChange,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par nom ou par position"
        value={searchName}
        onChangeText={onNameChange}
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
    width: "100%",
    borderRadius: 10,
  },
});

export default PlayerFilter;
