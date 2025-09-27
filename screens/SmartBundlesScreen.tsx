// SeasonalBundlesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { RootStackParamList } from '../navigation/AppNavigator';

export type ProductType = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export type BundleType = {
  id: number;
  title: string;
  season: string;
  products: ProductType[];
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SeasonalBundlesScreen: React.FC = () => {
  const [bundles, setBundles] = useState<BundleType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data: ProductType[] = await res.json();

        // Example: create fake bundles by picking some products
        const seasonalBundles: BundleType[] = [
          {
            id: 1,
            title: 'Diwali Eco Bundle',
            season: 'Diwali',
            products: data.slice(0, 3),
          },
          {
            id: 2,
            title: 'Pongal Celebration Pack',
            season: 'Pongal',
            products: data.slice(3, 6),
          },
          {
            id: 3,
            title: 'Monsoon Essentials',
            season: 'Rainy Season',
            products: data.slice(6, 9),
          },
        ];

        setBundles(seasonalBundles);
      } catch (error) {
        console.log('Error fetching bundles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        {bundles.map((bundle) => (
          <View key={bundle.id} style={styles.bundleCard}>
            <Text style={styles.bundleTitle}>{bundle.title}</Text>
            <Text style={styles.bundleSeason}>{bundle.season}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {bundle.products.map((prod) => (
                <View key={prod.id} style={styles.productCard}>
                  <Image source={{ uri: prod.image }} style={styles.productImage} />
                  <Text style={styles.productName} numberOfLines={1}>
                    {prod.title}
                  </Text>
                  <Text style={styles.productPrice}>₹{prod.price}</Text>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => navigation.navigate('BundleDetails', { bundle })}
            >
              <Text style={styles.viewButtonText}>View Bundle</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SeasonalBundlesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { padding: 16, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  bundleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bundleTitle: { fontSize: 18, fontWeight: 'bold', color: '#4CAF50' },
  bundleSeason: { fontSize: 14, color: 'gray', marginTop: 4 },

  productCard: {
    width: 120,
    height: 180,
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  productImage: { width: 100, height: 100, borderRadius: 8 },
  productName: { marginTop: 5, fontSize: 14, textAlign: 'center' },
  productPrice: { marginTop: 2, color: 'green', fontWeight: '600' },

  viewButton: {
    marginTop: 12,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  viewButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
