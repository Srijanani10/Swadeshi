import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import HomeHeader from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

type ProductType = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

// Categories with icons
const categories = [
  { id: "all", name: "All", icon: "cart-outline" },
  { id: "handlooms", name: "Handlooms", icon: "color-palette-outline", apiCategory: "jewelery" },
  { id: "fashion", name: "Fashion", icon: "shirt-outline", apiCategory: "women's clothing" },
  { id: "stationary", name: "Stationary", icon: "pencil-outline", apiCategory: "electronics" },
  { id: "kids", name: "Kids & Toys", icon: "game-controller-outline", apiCategory: "men's clothing" },
  { id: "garden", name: "Garden", icon: "leaf-outline", apiCategory: "electronics" },
  { id: "medicines", name: "Medicines", icon: "medkit-outline", apiCategory: "jewelery" },
];

export default function CategoryScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const categoryPositions = useRef<{ [key: string]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToCategory = (id: string) => {
    if (scrollRef.current && categoryPositions.current[id] !== undefined) {
      scrollRef.current.scrollTo({ y: categoryPositions.current[id], animated: true });
      setSelectedCategory(id);
    }
  };

  // Group products per category
  const groupedProducts = categories.map((cat) => ({
    category: cat,
    products:
      cat.id === "all"
        ? products
        : products.filter((p) => p.category === cat.apiCategory),
  }));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.content}>
        {/* Left: Vertical Categories */}
        <ScrollView style={styles.categoryList}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryItem,
                selectedCategory === cat.id && styles.categoryItemSelected,
              ]}
              onPress={() => scrollToCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon}
                size={24}
                color={selectedCategory === cat.id ? "#fff" : "#28a745"}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Right: Products */}
        <ScrollView style={styles.productScroll} ref={scrollRef}>
          {groupedProducts.map(({ category, products }) => (
            <View
              key={category.id}
              onLayout={(event) => {
                categoryPositions.current[category.id] = event.nativeEvent.layout.y;
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                <Ionicons name={category.icon} size={18} color="#28a745" />
                <Text style={styles.sectionTitle}>{category.name}</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.productCard}
                    onPress={() =>
                      navigation.navigate("ProductDetail", { productId: product.id })
                    }
                  >
                    <Image source={{ uri: product.image }} style={styles.productImage} />
                    <Text style={styles.productName}>{product.title}</Text>
                    <Text style={styles.productPrice}>₹{product.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, flexDirection: "row" },
  categoryList: { width: "18%", backgroundColor: "#f9f9f9", paddingVertical: 15 },
  categoryItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoryItemSelected: { backgroundColor: "#28a745", borderColor: "#28a745" },
  productScroll: { width: "82%", paddingLeft: 10, paddingVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginLeft: 6 },
  productCard: {
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 12,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: { width: 70, height: 70, borderRadius: 12, marginBottom: 6, resizeMode: "contain" },
  productName: { fontSize: 12, fontWeight: "500", textAlign: "center", marginBottom: 2 },
  productPrice: { color: "green", fontSize: 12, fontWeight: "bold" },
});
