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

  const cartArray = Object.values(cartItems);

  const total = cartArray.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        {cartArray.map(item => (
          <View key={item.product.id} style={styles.cartItem}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.product.name}</Text>
              <Text style={styles.price}>₹{item.product.price}</Text>
              <View style={styles.qtyContainer}>
                <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
                  <Text style={styles.qtyButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => addToCart(item.product)}>
                  <Text style={styles.qtyButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <Text style={styles.totalText}>Total: ₹{total}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- styles same as your previous CartScreen styles ---


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { paddingHorizontal: 10, marginBottom: 80 },
  cartItem: { flexDirection: "row", backgroundColor: "#fff", marginVertical: 5, padding: 10, borderRadius: 8, alignItems: "center" },
  image: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 10, flex: 1 },
  name: { fontSize: 16, fontWeight: "600" },
  price: { fontSize: 14, color: "gray", marginVertical: 5 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: { fontSize: 20, width: 32, textAlign: "center", color: "#4CAF50" },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  summary: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", padding: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 5 },
  totalText: { fontSize: 18, fontWeight: "700" },
  checkoutButton: { backgroundColor: "#4CAF50", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 6 },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
