// AddressesScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';

type Address = {
  id: string;
  label: string;
  detail: string;
};

const initialAddresses: Address[] = [
  { id: '1', label: 'Home', detail: '123, Main Street, City' },
  { id: '2', label: 'Office', detail: '456, Business Ave, City' },
];

const AddressesScreen: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLabel, setCurrentLabel] = useState('');
  const [currentDetail, setCurrentDetail] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!currentLabel || !currentDetail) return;
    if (editId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, label: currentLabel, detail: currentDetail } : a))
      );
    } else {
      setAddresses((prev) => [
        ...prev,
        { id: Date.now().toString(), label: currentLabel, detail: currentDetail },
      ]);
    }
    setCurrentLabel('');
    setCurrentDetail('');
    setEditId(null);
    setModalVisible(false);
  };

  const handleEdit = (address: Address) => {
    setCurrentLabel(address.label);
    setCurrentDetail(address.detail);
    setEditId(address.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Addresses</Text>
      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.addressCard} onPress={() => handleEdit(item)}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.detail}>{item.detail}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No addresses found.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add New Address</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Label (Home, Office, etc.)"
              value={currentLabel}
              onChangeText={setCurrentLabel}
              style={styles.input}
            />
            <TextInput
              placeholder="Address Detail"
              value={currentDetail}
              onChangeText={setCurrentDetail}
              style={styles.input}
            />
            <Button title={editId ? "Save Changes" : "Add Address"} onPress={handleAdd} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f2f3f7' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  addressCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  detail: { fontSize: 14, color: '#555' },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000066' },
  modalContent: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 },
});
