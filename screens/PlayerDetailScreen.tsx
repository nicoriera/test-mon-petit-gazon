import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DetailPlayerComponent from "../components/DetailPlayerComponent";

import { PlayerDetail } from "../types";
import { PlayerDetailScreenProps } from "../types";

const PlayerDetailScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGoBack}>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.goback}>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Détails du joueur</Text>
        <Text>Hola Test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTitle: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerGoBack: {
    backgroundColor: "lightgray",
    padding: 10,
  },
  goback: {
    fontSize: 12,
    color: "#3B3B3B",
    fontWeight: "bold",
  },
});

export default PlayerDetailScreen;
