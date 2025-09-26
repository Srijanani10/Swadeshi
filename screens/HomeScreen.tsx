import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import HomeHeader from "../components/Header";
import { CartContext, ProductType } from "../context/CartContext";

const categories = [
  { id: "1", name: "All", emoji: "🛒" },
  { id: "2", name: "Handlooms", emoji: "🧵" },
  { id: "3", name: "Fashion", emoji: "👗" },
  { id: "4", name: "Stationary", emoji: "✏️" },
  { id: "5", name: "Kids & Toys", emoji: "🧸" },
  { id: "6", name: "Garden", emoji: "🌱" },
  { id: "7", name: "Medicines", emoji: "💊" },
];

const nearbyStores = [
  { id: "1", name: "Eco Shop", image: "https://via.placeholder.com/100" },
  { id: "2", name: "Village Mart", image: "https://via.placeholder.com/100" },
  { id: "3", name: "Organic World", image: "https://via.placeholder.com/100" },
];

const productsData: ProductType[] = [
  { id: "1", name: "Organic Soap", price: "50", image: "https://via.placeholder.com/120" },
  { id: "2", name: "Handmade Saree", price: "1200", image: "https://via.placeholder.com/120" },
  { id: "3", name: "Wooden Toy", price: "300", image: "https://via.placeholder.com/120" },
];

export default function HomeScreen() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <HomeHeader />

      <ScrollView style={{ flex: 1 }}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search products..." />
          <Text style={styles.searchEmoji}>📷</Text>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map(item => (
            <View key={item.id} style={styles.categoryItem}>
              <Text style={styles.categoryEmoji}>{item.emoji}</Text>
              <Text style={styles.categoryText}>{item.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Nearby Stores */}
        <Text style={styles.sectionTitle}>Nearby Stores</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {nearbyStores.map(store => (
            <View key={store.id} style={styles.storeCard}>
              <Image source={{ uri: store.image }} style={styles.storeImage} />
              <Text style={styles.storeName}>{store.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Lowest Price */}
        <Text style={styles.sectionTitle}>Lowest Price</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productsData.map(product => {
            const qty = cartItems[product.id]?.quantity || 0;
            return (
              <View key={product.id} style={styles.productCard}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text>{product.name}</Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>

                {qty > 0 ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => removeFromCart(product.id)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{qty}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => addToCart(product)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => addToCart(product)}
                  >
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Category-wise Products */}
        <Text style={styles.sectionTitle}>Popular Products</Text>
        {categories.slice(1).map(cat => (
          <View key={cat.id}>
            <Text style={styles.categoryHeader}>{cat.emoji} {cat.name}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
              {productsData.map(product => {
                const key = `${cat.id}-${product.id}`;
                const qty = cartItems[key]?.quantity || 0;
                return (
                  <View key={key} style={styles.productCard}>
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <Text>{product.name}</Text>
                    <Text style={styles.productPrice}>₹{product.price}</Text>

                    {qty > 0 ? (
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => removeFromCart(key)}
                        >
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{qty}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => addToCart(product)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart(product)}
                      >
                        <Text style={styles.addButtonText}>Add</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
  },
  searchInput: { flex: 1, height: 40 },
  searchEmoji: { fontSize: 22, marginLeft: 8 },
  categories: { marginVertical: 10, paddingHorizontal: 10 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryEmoji: { fontSize: 28 },
  categoryText: { fontSize: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, paddingHorizontal: 10 },
  storeCard: { alignItems: "center", marginRight: 15 },
  storeImage: { width: 80, height: 80, borderRadius: 10 },
  storeName: { marginTop: 5 },
  productCard: {
    width: 120,
    padding: 8,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
  },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productPrice: { color: "green", marginTop: 4, fontWeight: "bold" },
  categoryHeader: { fontSize: 16, fontWeight: "600", marginVertical: 8, paddingHorizontal: 10 },
  addButton: {
    marginTop: 6,
    backgroundColor: "#28a745",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  quantityButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  quantityText: {
    marginHorizontal: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
