import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  text: { margin: 20, fontSize: 18 },
});
