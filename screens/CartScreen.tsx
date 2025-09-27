// screens/CartScreen.tsx
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Header from "../components/Header";
import { CartContext } from "../context/CartContext";

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  // Convert cart object to array for mapping
  const cartArray = Object.values(cartItems);

  // Calculate total
  const total = cartArray.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        {cartArray.length === 0 && (
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        )}

        {cartArray.map((item) => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>₹{item.product.price}</Text>

              <View style={styles.qtyContainer}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => removeFromCart(item.product.id)}
                >
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => addToCart(item.product)}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {cartArray.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total: ₹{total}</Text>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { paddingHorizontal: 10, marginBottom: 80 },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "gray" },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 10, flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, color: "gray", marginVertical: 5 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  qtyButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  qtyText: { marginHorizontal: 8, fontWeight: "bold", fontSize: 16 },
  summary: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  totalText: { fontSize: 18, fontWeight: "700" },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
