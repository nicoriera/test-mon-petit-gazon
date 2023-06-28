import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ListClubComponent from "./components/ListClubComponent";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Mon petit Gazon</Text>
      <StatusBar style="auto" />
      <ListClubComponent />
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
