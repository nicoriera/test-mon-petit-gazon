import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ListClubComponent from "./components/ListClubComponent";
import PlayerListComponent from "./components/PlayerListComponent";

export default function App() {
  const clubId = "mpg_championship_club_2128";
  return (
    <View style={styles.container}>
      <Text>Mon petit Gazon</Text>
      <StatusBar style="auto" />
      <ListClubComponent />
      <PlayerListComponent clubId={clubId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
