import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <Text style={styles.location}>📍 Current Location</Text>
      <View style={styles.icons}>
        {/* Cart Button */}
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.icon}>🛒</Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
  },
  location: { fontSize: 16, fontWeight: "600" },
  icons: { flexDirection: "row" },
  icon: { fontSize: 24, marginLeft: 15 },
});
