// AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import StoreScreen from "../screens/StoreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import StoreProductsScreen from "../screens/StoreProductsScreen";
import PaymentScreen from "../screens/PaymentScreen";

// New Screens
import OrdersScreen from "../screens/OrdersScreen";
import AddressesScreen from "../screens/AddressesScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import BarterScreen from "../screens/BarterScreen";
import SmartBundlesScreen from "../screens/SmartBundlesScreen";
import WalletScreen from "../screens/WalletScreen";
import SkillsScreen from "../screens/SkillsScreen";
import BundleDetailsScreen from "../screens/BundleDetailsScreen";
import NegotiatorScreen from "../screens/NegotiatorScreen";

// Context
import { CartProvider } from "../context/CartContext";

export type RootStackParamList = {
  Tabs: undefined;
  Cart: undefined;
  ProductDetail: { productId: number };
  StoreProducts: { storeId: number };
  Payment: undefined;
  Orders: undefined;
  Addresses: undefined;
  ChangePassword: undefined;
  Barter: undefined;
  BundleDetails: { bundle: any };
  Wallet: undefined;
  Skills: undefined;
  Negotiator: { product: any };
};

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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Categories":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Stores":
              iconName = focused ? "storefront" : "storefront-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoryScreen} />
      <Tab.Screen name="Stores" component={StoreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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
          <RootStack.Screen name="ProductDetail" component={ProductDetailsScreen} />
          <RootStack.Screen name="StoreProducts" component={StoreProductsScreen} />
          <RootStack.Screen name="Payment" component={PaymentScreen} />
          <RootStack.Screen name="Orders" component={OrdersScreen} />
          <RootStack.Screen name="Addresses" component={AddressesScreen} />
          <RootStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          <RootStack.Screen name="Barter" component={BarterScreen} />
          <RootStack.Screen name="BundleDetails" component={SmartBundlesScreen} />
          <RootStack.Screen name="Wallet" component={WalletScreen} />
          <RootStack.Screen name="Skills" component={SkillsScreen} />
          <RootStack.Screen name="Negotiator" component={NegotiatorScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
