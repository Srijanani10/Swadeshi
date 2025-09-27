// ProductDetailsScreen.tsx
import React, { useState, useEffect, useContext } from "react";
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
import { useRoute, useNavigation } from "@react-navigation/native";
import { CartContext, ProductType } from "../context/CartContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type EndorsementType = {
  id: string;
  groupName: string;
  endorsedBy: number;
};

export default function ProductDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { productId } = route.params;

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [endorsements, setEndorsements] = useState<EndorsementType[]>([]);

  // Fetch product & all products for similar items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProduct = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const dataProduct = await resProduct.json();
        setProduct({
          id: String(dataProduct.id),
          name: dataProduct.title,
          price: dataProduct.price,
          image: dataProduct.image,
          description: dataProduct.description,
          category: dataProduct.category,
        });

        const resAll = await fetch(`https://fakestoreapi.com/products`);
        const dataAll = await resAll.json();
        const formattedAll = dataAll.map((p: any) => ({
          id: String(p.id),
          name: p.title,
          price: p.price,
          image: p.image,
          description: p.description,
          category: p.category,
        }));
        setProducts(formattedAll);

        // Fake endorsements for demonstration
        setEndorsements([
          { id: "1", groupName: "Kerala Women SHG", endorsedBy: 50 },
          { id: "2", groupName: "Tamil Nadu Handloom SHG", endorsedBy: 30 },
        ]);
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
        message: `Check out this product: ${product.name} for ₹${product.price}`,
        title: product.name,
      });
    } catch (error) {
      console.log("Error sharing product:", error);
    }
  };

  const similarProducts = products.filter(
    (p) => p.id !== product.id && p.category === product.category
  );

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setQuantity(quantity + 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const CommunityEndorsements = ({ endorsements }: { endorsements: EndorsementType[] }) => (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>
        Community Endorsements
      </Text>
      {endorsements.map((e) => (
        <View
          key={e.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
            backgroundColor: "#e6f2ff",
            padding: 8,
            borderRadius: 6,
          }}
        >
          <Text style={{ fontWeight: "600", flex: 1 }}>{e.groupName}</Text>
          <Text style={{ color: "#007bff", fontWeight: "700" }}>
            Certified by {e.endorsedBy} members
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>₹{product.price}</Text>
          </View>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartRow}>
          {quantity === 0 ? (
            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={handleRemoveFromCart}>
                <Text style={styles.qtyButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity onPress={handleAddToCart}>
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

        <CommunityEndorsements endorsements={endorsements} />

        {similarProducts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((p) => (
                <View key={p.id} style={styles.similarProductCard}>
                  <Image source={{ uri: p.image }} style={styles.similarImage} />
                  <Text style={styles.similarName} numberOfLines={1}>
                    {p.name}
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
