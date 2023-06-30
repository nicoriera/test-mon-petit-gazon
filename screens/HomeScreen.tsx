import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("PlayerDetail" as never);
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View style={styles.card}>
        <Text style={styles.cardText}>Cliquez ici</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = {
  card: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 5,
  },
  cardText: {
    fontSize: 18,
  },
};
