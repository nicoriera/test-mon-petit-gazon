import React from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar"; // Importer depuis expo-status-bar
import HomeScreen from "./screens/HomeScreen";
import PlayerDetailScreen from "./screens/PlayerDetailScreen";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View
        style={{
          height: Platform.OS === "ios" ? 60 : 0,
          backgroundColor: "#45C945",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <StatusBar style="light" />
      </View>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
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
  },
});

export default App;
