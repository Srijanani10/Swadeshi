// navigation/AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import StoresScreen from "../screens/StoreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";

// Context
import { CartProvider } from "../context/CartContext";

// Root Stack Type
export type RootStackParamList = {
  Tabs: undefined;
  Cart: undefined;
};

// Tab Param List
export type RootTabParamList = {
  Home: undefined;
  Categories: undefined;
  Stores: undefined;
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function TabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "🏠 Home" }} />
      <Tab.Screen name="Categories" component={CategoryScreen} options={{ tabBarLabel: "📚 Categories" }} />
      <Tab.Screen name="Stores" component={StoresScreen} options={{ tabBarLabel: "🏪 Stores" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "👤 Profile" }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <CartProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Tabs" component={TabsNavigator} />
          <RootStack.Screen name="Cart" component={CartScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
