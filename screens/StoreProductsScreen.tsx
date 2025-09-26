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
import { useRoute } from "@react-navigation/native";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  storeId: number;
};

// Sample products mapped to storeId
const products: Product[] = [
  { id: 1, name: "Soap", price: 25, image: "https://via.placeholder.com/80", storeId: 1 },
  { id: 2, name: "Organic Honey", price: 350, image: "https://via.placeholder.com/80", storeId: 1 },
  { id: 3, name: "Saree", price: 1200, image: "https://via.placeholder.com/80", storeId: 2 },
  { id: 4, name: "Jute Bag", price: 400, image: "https://via.placeholder.com/80", storeId: 2 },
  { id: 5, name: "Wooden Toy", price: 250, image: "https://via.placeholder.com/80", storeId: 3 },
  { id: 6, name: "Plant Pot", price: 150, image: "https://via.placeholder.com/80", storeId: 3 },
];

export default function StoreProductsScreen() {
  const route = useRoute<any>();
  const { storeId } = route.params;
  const [searchText, setSearchText] = useState("");
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const storeProducts = products.filter(
    (p) =>
      p.storeId === storeId &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = (productId: number) => setCart({ ...cart, [productId]: 1 });
  const increaseQuantity = (productId: number) =>
    setCart({ ...cart, [productId]: cart[productId] + 1 });
  const decreaseQuantity = (productId: number) => {
    const qty = cart[productId] - 1;
    if (qty <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      setCart(newCart);
    } else {
      setCart({ ...cart, [productId]: qty });
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <ScrollView style={styles.productList}>
        {storeProducts.map((prod) => (
          <View style={styles.product} key={prod.id}>
            <Image source={{ uri: prod.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{prod.name}</Text>
              <Text style={styles.productPrice}>₹{prod.price}</Text>
            </View>

            {cart[prod.id] ? (
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(prod.id)}>
                  <Text style={styles.qtyButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{cart[prod.id]}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(prod.id)}>
                  <Text style={styles.qtyButton}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(prod.id)}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  searchContainer: { margin: 10 },
  searchInput: { backgroundColor: "#eee", padding: 8, borderRadius: 8 },
  productList: { paddingHorizontal: 10, marginTop: 10 },
  product: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { flex: 1, marginLeft: 10 },
  productName: { fontSize: 16, fontWeight: "600" },
  productPrice: { fontSize: 14, color: "gray", marginTop: 5 },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: { color: "#fff", fontWeight: "600" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  qtyButton: { fontSize: 18, width: 24, textAlign: "center", color: "#4CAF50" },
  qtyText: { fontSize: 16, marginHorizontal: 5 },
});
