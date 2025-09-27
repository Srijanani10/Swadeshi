import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import HomeHeader from "../components/Header";
import { CartContext, ProductType } from "../context/CartContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";

const categories = [
  { id: "1", name: "All", icon: "cart-outline" },
  { id: "2", name: "Handlooms", icon: "color-palette-outline" },
  { id: "3", name: "Fashion", icon: "shirt-outline" },
  { id: "4", name: "Stationary", icon: "pencil-outline" },
  { id: "5", name: "Kids & Toys", icon: "game-controller-outline" },
  { id: "6", name: "Garden", icon: "leaf-outline" },
  { id: "7", name: "Medicines", icon: "medkit-outline" },
];

const nearbyStores = [
  { id: "1", name: "Eco Shop", image: "https://via.placeholder.com/100" },
  { id: "2", name: "Village Mart", image: "https://via.placeholder.com/100" },
  { id: "3", name: "Organic World", image: "https://via.placeholder.com/100" },
];

export default function HomeScreen() {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef<ScrollView>(null);
  const categoryRefs = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();

        const mapped = data.map((item: any) => ({
          id: String(item.id),
          name: item.title,
          price: String(item.price),
          image: item.image,
        }));

        setProducts(mapped);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryPress = (id: string) => {
    const yOffset = categoryRefs.current[id] || 0;
    scrollRef.current?.scrollTo({ y: yOffset, animated: true });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader />

      <ScrollView ref={scrollRef} style={{ flex: 1 }}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search products..." />
          <Ionicons name="search-outline" size={22} color="#888" style={{ marginLeft: 8 }} />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => handleCategoryPress(item.id)}>
              <View style={styles.categoryItem}>
                <Ionicons name={item.icon} size={28} color="#28a745" />
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Nearby Stores */}
        <Text style={styles.sectionTitle}>Nearby Stores</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.nearbyStoresContainer}>
          {nearbyStores.map((store) => (
            <View key={store.id} style={styles.storeCard}>
              <Image source={{ uri: store.image }} style={styles.storeImage} />
              <Text style={styles.storeName}>{store.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Lowest Price */}
        <Text style={styles.sectionTitle}>Lowest Price</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
          {products.slice(0, 5).map((product) => {
            const qty = cartItems[product.id]?.quantity || 0;
            return (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate("ProductDetail", { productId: Number(product.id) })}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text numberOfLines={1}>{product.name}</Text>
                <Text style={styles.productPrice}>₹{product.price}</Text>

                {qty > 0 ? (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(product.id)}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{qty}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(product)}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Category-wise Products */}
        <Text style={styles.sectionTitle}>Popular Products</Text>
        {categories.slice(1).map((cat) => (
          <View
            key={cat.id}
            onLayout={(event) => {
              categoryRefs.current[cat.id] = event.nativeEvent.layout.y;
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginVertical: 8 }}>
              <Ionicons name={cat.icon} size={20} color="#28a745" />
              <Text style={styles.categoryHeader}>{cat.name}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
              {products
                .filter((p, index) => index % (categories.length - 1) === Number(cat.id) - 2)
                .map((product) => {
                  const qty = cartItems[product.id]?.quantity || 0;
                  return (
                    <TouchableOpacity
                      key={`${cat.id}-${product.id}`}
                      style={styles.productCard}
                      onPress={() => navigation.navigate("ProductDetail", { productId: Number(product.id) })}
                    >
                      <Image source={{ uri: product.image }} style={styles.productImage} />
                      <Text numberOfLines={1}>{product.name}</Text>
                      <Text style={styles.productPrice}>₹{product.price}</Text>

                      {qty > 0 ? (
                        <View style={styles.quantityContainer}>
                          <TouchableOpacity style={styles.quantityButton} onPress={() => removeFromCart(product.id)}>
                            <Text style={styles.quantityButtonText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantityText}>{qty}</Text>
                          <TouchableOpacity style={styles.quantityButton} onPress={() => addToCart(product)}>
                            <Text style={styles.quantityButtonText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
                          <Text style={styles.addButtonText}>Add</Text>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles remain mostly unchanged, just remove emoji references
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  searchInput: { flex: 1, height: 40 },

  categories: { marginTop: 5, paddingHorizontal: 10 },
  categoryItem: { alignItems: "center", marginRight: 15 },
  categoryText: { fontSize: 12, marginTop: 4 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10, paddingHorizontal: 10 },

  nearbyStoresContainer: { paddingHorizontal: 10, marginBottom: 5 },
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
  productImage: { width: 80, height: 80, borderRadius: 8, resizeMode: "contain" },
  productPrice: { color: "green", marginTop: 4, fontWeight: "bold" },
  categoryHeader: { fontSize: 16, fontWeight: "600", marginLeft: 8 },

  addButton: { marginTop: 6, backgroundColor: "#28a745", paddingVertical: 4, paddingHorizontal: 12, borderRadius: 5 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  quantityButton: { backgroundColor: "#28a745", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5 },
  quantityButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  quantityText: { marginHorizontal: 8, fontWeight: "bold", fontSize: 16 },
});
