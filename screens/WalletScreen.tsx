// WalletScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

export type RewardTransaction = {
  id: number;
  description: string;
  coins: number;
  date: string;
};

const WalletScreen: React.FC = () => {
  const [greenCoins, setGreenCoins] = useState<number>(250); // Example balance
  const [transactions, setTransactions] = useState<RewardTransaction[]>([
    { id: 1, description: 'Bought biodegradable plates', coins: 50, date: '2025-09-20' },
    { id: 2, description: 'Purchased organic cotton shirt', coins: 100, date: '2025-09-21' },
    { id: 3, description: 'Recycled old packaging', coins: 100, date: '2025-09-22' },
  ]);

  const handleRedeem = (coinsToRedeem: number) => {
    if (greenCoins >= coinsToRedeem) {
      setGreenCoins(greenCoins - coinsToRedeem);
      Alert.alert('Success', `You redeemed ${coinsToRedeem} Green Coins!`);
      setTransactions([
        { id: transactions.length + 1, description: 'Redeemed Coins', coins: -coinsToRedeem, date: new Date().toISOString().split('T')[0] },
        ...transactions,
      ]);
    } else {
      Alert.alert('Error', 'Not enough Green Coins to redeem!');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>
            <Icon name="leaf" size={20} color="#4CAF50" /> Green Coins Balance
          </Text>
          <Text style={styles.balance}>{greenCoins} Coins</Text>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => handleRedeem(50)}
          >
            <Text style={styles.redeemButtonText}>Redeem 50 Coins</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.redeemButton}
            onPress={() => handleRedeem(100)}
          >
            <Text style={styles.redeemButtonText}>Redeem 100 Coins</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsCard}>
          <Text style={styles.transactionsTitle}>Transaction History</Text>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionRow}>
              <Text style={styles.txDescription}>{tx.description}</Text>
              <Text style={[styles.txCoins, { color: tx.coins > 0 ? 'green' : 'red' }]}>
                {tx.coins > 0 ? `+${tx.coins}` : tx.coins} Coins
              </Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollContainer: { padding: 16, paddingBottom: 40 },

  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  balanceTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  balance: { fontSize: 32, fontWeight: '700', color: '#4CAF50', marginBottom: 20 },
  redeemButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 8,
  },
  redeemButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  transactionsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  transactionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  txDescription: { fontSize: 14, color: '#333', flex: 2 },
  txCoins: { fontSize: 14, fontWeight: '600', flex: 1, textAlign: 'right' },
  txDate: { fontSize: 12, color: 'gray', flex: 1, textAlign: 'right' },
});
