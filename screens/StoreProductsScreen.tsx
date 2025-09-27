import React, { useContext, useState, useEffect } from "react";
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
import Header from "../components/Header";
import { CartContext } from "../context/CartContext";
import { useRoute } from "@react-navigation/native";

// Product type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

// Store type
type Store = {
  id: number;
  name: string;
  productIds: number[]; // Product IDs belonging to this store
};

// Sample stores
const stores: Store[] = [
  { id: 1, name: "Handloom Emporium", productIds: [3, 5, 6] },
  { id: 2, name: "Organic Mart", productIds: [1, 2, 7] },
  { id: 3, name: "Eco Store", productIds: [4, 8, 9] },
];

export default function StoreProductsScreen() {
  const route = useRoute<any>();
  const { storeId } = route.params;
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const store = stores.find((s) => s.id === storeId);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!store) return;

      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await res.json();

        // Filter products for this store based on store.productIds
        const storeProducts = data.filter((p) => store.productIds.includes(p.id));
        setProducts(storeProducts);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [store]);

  if (!store) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Store not found</Text>
      </View>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
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

      <ScrollView style={{ padding: 10 }}>
        <Text style={styles.storeTitle}>{store.name}</Text>

        {filteredProducts.length === 0 ? (
          <Text style={styles.notFound}>No products found</Text>
        ) : (
          filteredProducts.map((product) => {
            const qty = cartItems[product.id]?.quantity || 0;

            return (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text style={styles.productName}>{product.title}</Text>
                  <Text style={styles.productPrice}>₹{product.price}</Text>

                  {qty > 0 ? (
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity onPress={() => removeFromCart(product.id)}>
                        <Text style={styles.qtyButton}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{qty}</Text>
                      <TouchableOpacity onPress={() => addToCart(product)}>
                        <Text style={styles.qtyButton}>+</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => addToCart(product)}
                    >
                      <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  storeTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: "600" },
  productPrice: { fontSize: 14, color: "green", marginVertical: 4 },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  qtyContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  qtyButton: { fontSize: 20, width: 32, textAlign: "center", color: "#4CAF50" },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  notFound: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
});
