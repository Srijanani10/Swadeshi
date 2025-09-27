// BundleDetailsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'BundleDetails'>;

const BundleDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { bundle } = route.params;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.bundleTitle}>{bundle.title}</Text>
        <Text style={styles.bundleSeason}>{bundle.season}</Text>

        <View style={styles.productsContainer}>
          {bundle.products.map((product: { id: React.Key | null | undefined; image: any; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
            <View key={product.id} style={styles.productCard}>
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName} numberOfLines={1}>
                {product.title}
              </Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Bundles</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BundleDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scroll: { padding: 16, paddingBottom: 40 },

  bundleTitle: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50' },
  bundleSeason: { fontSize: 16, color: 'gray', marginBottom: 20 },

  productsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: { width: 100, height: 100, borderRadius: 8 },
  productName: { marginTop: 8, fontSize: 14, fontWeight: '600', textAlign: 'center' },
  productPrice: { marginTop: 4, color: 'green', fontWeight: 'bold' },

  backButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
