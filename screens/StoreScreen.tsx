import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

type Store = {
  id: number;
  name: string;
  image: string;
};

const stores: Store[] = [
  { id: 1, name: "GreenMart", image: "https://via.placeholder.com/80" },
  { id: 2, name: "HerbalBazaar", image: "https://via.placeholder.com/80" },
  { id: 3, name: "CraftHub", image: "https://via.placeholder.com/80" },
];

export default function StoresScreen() {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState("");

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.storeList}>
        {filteredStores.map((store) => (
          <TouchableOpacity
            key={store.id}
            style={styles.storeItem}
            onPress={() =>
              navigation.navigate("StoreProducts", { storeId: store.id })
            }
          >
            <Image source={{ uri: store.image }} style={styles.storeImage} />
            <Text style={styles.storeName}>{store.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  searchContainer: { margin: 10 },
  searchInput: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
  },
  storeList: { paddingHorizontal: 10, marginTop: 10 },
  storeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  storeImage: { width: 80, height: 80, borderRadius: 8 },
  storeName: { fontSize: 16, marginLeft: 15, fontWeight: "600" },
});
