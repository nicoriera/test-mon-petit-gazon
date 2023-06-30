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
    <>
      <View>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={styles.goback}>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Player Detail</Text>

        <Text>Hola Test</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  goback: {
    fontSize: 12,
    color: "#7F7F7F",
    fontWeight: "bold",
    margin: 10,
  },
});

export default PlayerDetailScreen;
