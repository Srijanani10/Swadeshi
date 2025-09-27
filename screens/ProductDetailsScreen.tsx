import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from "react-native";
import Header from "../components/Header";
import { useRoute } from "@react-navigation/native";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const { productId } = route.params;
  const [product, setProduct] = useState<ProductType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduct = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const dataProduct = await resProduct.json();
        setProduct(dataProduct);

        const resAll = await fetch(`https://fakestoreapi.com/products`);
        const dataAll = await resAll.json();
        setProducts(dataAll);
      } catch (error) {
        console.log("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#28a745" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={styles.notFound}>Product not found</Text>
      </View>
    );
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this product: ${product.title} for ₹${product.price}`,
        title: product.title,
      });
    } catch (error) {
      console.log("Error sharing product:", error);
    }
  };

  const similarProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.productName}>{product.title}</Text>
            <Text style={styles.productPrice}>₹{product.price}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartRow}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={() => setQuantity(1)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => setQuantity(quantity - 1)}>
                <Text style={styles.qtyButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.qtyButton}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <Text>Delivered within 3-5 business days.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <Text>{product.description}</Text>
        </View>

        {similarProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((p) => (
                <View key={p.id} style={styles.similarProductCard}>
                  <Image source={{ uri: p.image }} style={styles.similarImage} />
                  <Text style={styles.similarName} numberOfLines={1}>
                    {p.title}
                  </Text>
                  <Text style={styles.similarPrice}>₹{p.price}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { paddingHorizontal: 10 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  productImage: { width: "100%", height: 250, borderRadius: 8, marginTop: 10 },
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  productName: { fontSize: 22, fontWeight: "700" },
  productPrice: { fontSize: 18, color: "gray", marginTop: 5 },
  shareButton: { backgroundColor: "#eee", padding: 8, borderRadius: 6 },
  shareText: { color: "#333" },
  cartRow: { alignItems: "flex-end", marginTop: 10 },
  addButton: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 6 },
  addButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: { fontSize: 20, width: 32, textAlign: "center", color: "#4CAF50" },
  qtyText: { fontSize: 16, marginHorizontal: 10 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 5 },
  similarProductCard: { width: 120, marginRight: 15, alignItems: "center", padding: 8, backgroundColor: "#fff", borderRadius: 8 },
  similarImage: { width: 100, height: 100, borderRadius: 8 },
  similarName: { marginTop: 5, fontWeight: "600" },
  similarPrice: { color: "green", marginTop: 2, fontWeight: "bold" },
  notFound: { marginTop: 50, textAlign: "center", fontSize: 18 },
});
