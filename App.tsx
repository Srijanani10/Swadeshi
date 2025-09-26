import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CartProvider } from "./context/CartContext";

// Load vector icon fonts explicitly
Ionicons.loadFont();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </>
  );
}
