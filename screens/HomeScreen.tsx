import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = () => {
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate("PlayerDetail" as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput style={styles.input} placeholder="Rechercher par nom" />

        <TextInput style={styles.input} placeholder="Rechercher par position" />
      </View>
      <View>
        <TouchableOpacity onPress={handleCardPress}>
          <View style={styles.card}>
            <Text style={styles.cardText}>Zinedine Zidane</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    backgroundColor: "lightgray",
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
