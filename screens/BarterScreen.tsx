import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type BarterItem = {
  id: string;
  myItem: string;
  lookingFor: string;
};

const BarterScreen: React.FC = () => {
  const [myItem, setMyItem] = useState("");
  const [lookingFor, setLookingFor] = useState("");
  const [listings, setListings] = useState<BarterItem[]>([]);

  const addListing = () => {
    if (!myItem || !lookingFor) {
      Alert.alert("Error", "Please enter both fields.");
      return;
    }

    const newItem: BarterItem = {
      id: Date.now().toString(),
      myItem,
      lookingFor,
    };

    setListings([newItem, ...listings]);
    setMyItem("");
    setLookingFor("");
  };

  const renderListing = ({ item }: { item: BarterItem }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>
        <Icon name="swap-horizontal" size={18} color="#4CAF50" />{" "}
        <Text style={{ fontWeight: "bold" }}>Offers:</Text> {item.myItem}
      </Text>
      <Text style={styles.cardText}>
        <Icon name="search" size={18} color="#007bff" />{" "}
        <Text style={{ fontWeight: "bold" }}>Looking For:</Text> {item.lookingFor}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌾 Digital Barter & Swap</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What do you want to offer? (e.g. 20kg Rice)"
          value={myItem}
          onChangeText={setMyItem}
        />
        <TextInput
          style={styles.input}
          placeholder="What are you looking for? (e.g. Handmade Saree)"
          value={lookingFor}
          onChangeText={setLookingFor}
        />
        <TouchableOpacity style={styles.addButton} onPress={addListing}>
          <Icon name="add-circle" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Listing</Text>
        </TouchableOpacity>
      </View>

      {/* Barter Listings */}
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={renderListing}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No listings yet. Add one above!</Text>
        }
      />
    </SafeAreaView>
  );
};

export default BarterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f3f7", padding: 16 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  inputContainer: { marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: { color: "#fff", marginLeft: 8, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardText: { fontSize: 16, marginBottom: 4, color: "#333" },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
    fontStyle: "italic",
  },
});
