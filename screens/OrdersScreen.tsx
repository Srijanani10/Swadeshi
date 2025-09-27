// screens/OrdersScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import axios from "axios";

type Order = {
  id: string;
  product: string;
  date: string;
  amount: number;
  image: string;
  quantity: number;
};

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    // Simulate API call to fetch past orders
    const fetchOrders = async () => {
      try {
        // Replace this URL with your real API endpoint
        const response = await axios.get(
          "https://fakestoreapi.com/products?limit=5"
        );
        // Transform data to match Order type
        const fetchedOrders = response.data.map((item: any, index: number) => ({
          id: item.id.toString(),
          product: item.title,
          date: "2025-09-20", // you can use dynamic dates from your API
          amount: Math.floor(item.price * 80), // convert $ to ₹ approx
          image: item.image,
          quantity: Math.floor(Math.random() * 3) + 1, // random quantity 1-3
        }));
        setOrders(fetchedOrders);
        const totalAmount = fetchedOrders.reduce(
          (sum: number, order: Order) => sum + order.amount * order.quantity,
          0
        );
        setTotal(totalAmount);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        {orders.length === 0 && (
          <Text style={styles.emptyText}>No past orders yet.</Text>
        )}

        {orders.map((order) => (
          <View key={order.id} style={styles.orderItem}>
            <Image source={{ uri: order.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{order.product}</Text>
              <Text style={styles.details}>Date: {order.date}</Text>
              <Text style={styles.details}>Quantity: {order.quantity}</Text>
              <Text style={styles.price}>₹{order.amount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {orders.length > 0 && (
        <View style={styles.summary}>
          <Text style={styles.totalText}>Total Spent: ₹{total}</Text>
        </View>
      )}
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { paddingHorizontal: 10, marginBottom: 80 },
  emptyText: { textAlign: "center", marginTop: 50, fontSize: 18, color: "gray" },
  orderItem: {
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
  details: { fontSize: 14, color: "#555" },
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
});
