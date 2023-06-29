import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import PlayerDetailScreen from "./screens/PlayerDetailScreen";

type RootStackParamList = {
  [key: string]: undefined; // Index signature for type 'string'
  Home: undefined;
  PlayerDetail: undefined;
};

const App: React.FC = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PlayerDetail" component={PlayerDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    marginHorizontal: 10,
  },
  statusBar: {
    backgroundColor: "transparent",
  },
});

export default App;
