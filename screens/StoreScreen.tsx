import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

type Store = {
  id: number;
  name: string;
  image: string;
};

export default function StoreScreen() {
  const navigation = useNavigation<any>();
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Fake store data with unique names
        const fakeStores: Store[] = [
          { id: 1, name: "Handloom Emporium", image: "https://picsum.photos/seed/store1/100/100" },
          { id: 2, name: "Organic Mart", image: "https://picsum.photos/seed/store2/100/100" },
          { id: 3, name: "Eco Store", image: "https://picsum.photos/seed/store3/100/100" },
          { id: 4, name: "Local Crafts", image: "https://picsum.photos/seed/store4/100/100" },
          { id: 5, name: "Daily Needs Shop", image: "https://picsum.photos/seed/store5/100/100" },
          { id: 6, name: "Green Grocers", image: "https://picsum.photos/seed/store6/100/100" },
          { id: 7, name: "Artisan Hub", image: "https://picsum.photos/seed/store7/100/100" },
          { id: 8, name: "Fresh Farm", image: "https://picsum.photos/seed/store8/100/100" },
        ];
        setStores(fakeStores);
        setFilteredStores(fakeStores);
      } catch (error) {
        console.log("Error fetching stores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = stores.filter((store) =>
      store.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredStores(filtered);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Stores" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search stores..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        {filteredStores.length === 0 ? (
          <Text style={styles.notFound}>No stores found</Text>
        ) : (
          filteredStores.map((store) => (
            <TouchableOpacity
              key={store.id}
              style={styles.storeCard}
              onPress={() =>
                navigation.navigate("StoreProducts", { storeId: store.id })
              }
            >
              <Image source={{ uri: store.image }} style={styles.storeImage} />
              <Text style={styles.storeName}>{store.name}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchContainer: { padding: 10 },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  storeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  storeImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  storeName: { fontSize: 16, fontWeight: "600" },
  notFound: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
});
