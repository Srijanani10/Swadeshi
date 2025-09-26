import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

type Product = {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string;
  description?: string;
};

// Sample products
const products: Product[] = [
  { id: 1, name: "Soap", price: 25, discount: 5, image: "https://via.placeholder.com/200", description: "Natural herbal soap." },
  { id: 2, name: "Organic Honey", price: 350, discount: 20, image: "https://via.placeholder.com/200", description: "Pure organic honey from Jharkhand." },
  { id: 3, name: "Saree", price: 1200, image: "https://via.placeholder.com/200", description: "Handmade cotton saree." },
  { id: 4, name: "Jute Bag", price: 400, image: "https://via.placeholder.com/200", description: "Eco-friendly jute bag." },
];

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const { productId } = route.params;

  const [quantity, setQuantity] = useState(0);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        {/* Product Image */}
        <Image source={{ uri: product.image }} style={styles.productImage} />

        {/* Name & Price */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>
            ₹{product.price} {product.discount ? `(Discount ₹${product.discount})` : ""}
          </Text>
        </View>

        {/* Add / - 1 + */}
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addButton} onPress={() => setQuantity(1)}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
              <Text style={styles.qtyButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.qtyButton}>+</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Delivery Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <Text>Delivered within 3-5 business days.</Text>
        </View>

        {/* Product Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text>{product.description}</Text>
        </View>

        {/* Similar Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar Products</Text>
          {products
            .filter((p) => p.id !== product.id)
            .map((p) => (
              <View key={p.id} style={styles.similarProduct}>
                <Image source={{ uri: p.image }} style={styles.similarImage} />
                <View style={{ marginLeft: 10 }}>
                  <Text>{p.name}</Text>
                  <Text>₹{p.price}</Text>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { paddingHorizontal: 10 },
  productImage: { width: "100%", height: 250, borderRadius: 8, marginTop: 10 },
  infoContainer: { marginTop: 10 },
  productName: { fontSize: 22, fontWeight: "700" },
  productPrice: { fontSize: 18, color: "gray", marginTop: 5 },
  addButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 6, marginTop: 10, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  qtyButton: { fontSize: 20, width: 32, textAlign: "center", color: "#4CAF50" },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 5 },
  similarProduct: { flexDirection: "row", alignItems: "center", marginBottom: 10, backgroundColor: "#fff", padding: 8, borderRadius: 6 },
  similarImage: { width: 60, height: 60, borderRadius: 6 },
  notFound: { marginTop: 50, textAlign: "center", fontSize: 18 },
});
