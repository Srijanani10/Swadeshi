// screens/PaymentScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Header from "../components/Header";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function PaymentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");
  const [walletAmount, setWalletAmount] = useState("");

  const handlePayment = (method: string) => {
    switch (method) {
      case "Card":
        if (!cardNumber) {
          Alert.alert("Error", "Please enter card number");
          return;
        }
        Alert.alert("Payment Success", `Paid via Card: ${cardNumber}`);
        break;

      case "UPI":
        if (!upiId) {
          Alert.alert("Error", "Please enter UPI ID");
          return;
        }
        Alert.alert("Payment Success", `Paid via UPI: ${upiId}`);
        break;

      case "Wallet":
        if (!walletAmount) {
          Alert.alert("Error", "Enter amount in wallet");
          return;
        }
        Alert.alert("Payment Success", `Paid via Wallet: ₹${walletAmount}`);
        break;

      case "Cash on Delivery":
        Alert.alert("Order Placed", "You chose Cash on Delivery");
        break;

      default:
        Alert.alert("Error", "Invalid Payment Method");
    }

    // After payment navigate to Home
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Select Payment Method</Text>

      <View style={styles.buttonContainer}>
        {/* Card */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter Card Number"
            style={styles.input}
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => handlePayment("Card")}
          >
            <FontAwesome5
              name="credit-card"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Pay with Card</Text>
          </TouchableOpacity>
        </View>

        {/* UPI */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter UPI ID"
            style={styles.input}
            value={upiId}
            onChangeText={setUpiId}
          />
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => handlePayment("UPI")}
          >
            <FontAwesome5
              name="mobile-alt"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Pay via UPI</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet */}
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Enter Wallet Amount"
            style={styles.input}
            keyboardType="number-pad"
            value={walletAmount}
            onChangeText={setWalletAmount}
          />
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => handlePayment("Wallet")}
          >
            <FontAwesome5
              name="wallet"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Pay via Wallet</Text>
          </TouchableOpacity>
        </View>

        {/* COD */}
        <TouchableOpacity
          style={[styles.paymentButton, { marginTop: 20 }]}
          onPress={() => handlePayment("Cash on Delivery")}
        >
          <FontAwesome5
            name="home"
            size={20}
            color="#fff"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginVertical: 20 },
  buttonContainer: { paddingHorizontal: 20, marginTop: 10 },

  inputWrapper: { marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },

  paymentButton: {
    flexDirection: "row",
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { marginRight: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
