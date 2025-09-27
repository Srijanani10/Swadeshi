// screens/NegotiatorScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "../components/Header";

export default function NegotiatorScreen() {
  const [buyerPrice, setBuyerPrice] = useState<string>("");
  const [sellerPrice, setSellerPrice] = useState<string>("");
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);

  const handleNegotiate = () => {
    const buyer = parseFloat(buyerPrice);
    const seller = parseFloat(sellerPrice);

    if (isNaN(buyer) || isNaN(seller)) {
      Alert.alert("Invalid Input", "Please enter valid numbers for both prices.");
      return;
    }

    // Simple AI: suggest the average price
    const suggested = (buyer + seller) / 2;
    setSuggestedPrice(suggested);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>AI Fair-Trade Negotiator</Text>

        <View style={styles.inputGroup}>
          <Text>Buyer Expected Price (₹):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={buyerPrice}
            onChangeText={setBuyerPrice}
            placeholder="Enter buyer price"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text>Seller Quote Price (₹):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={sellerPrice}
            onChangeText={setSellerPrice}
            placeholder="Enter seller price"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNegotiate}>
          <Text style={styles.buttonText}>Get Suggested Price</Text>
        </TouchableOpacity>

        {suggestedPrice !== null && (
          <View style={styles.result}>
            <Text style={styles.resultText}>
              Suggested Fair Price: ₹{suggestedPrice.toFixed(2)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20, textAlign: "center" },
  inputGroup: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  result: { marginTop: 20, alignItems: "center" },
  resultText: { fontSize: 18, fontWeight: "700", color: "#333" },
});
