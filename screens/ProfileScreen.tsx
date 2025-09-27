// ProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type ProfileScreenProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenProp>();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [gender, setGender] = useState<string>('');

  const pickImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxHeight: 500, maxWidth: 500 },
      (response) => {
        if (!response.didCancel && response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) setProfilePic(uri);
        }
      }
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            <Icon name="user" size={24} color="#ff6347" /> My Profile
          </Text>
        </View>

        {/* Profile Icon */}
        <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profilePic} />
          ) : (
            <Icon name="user-circle" size={120} color="#555" />
          )}
        </TouchableOpacity>

        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Icon name="info-circle" size={18} color="#007bff" /> Personal Information
          </Text>

          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter address"
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Date of Birth:</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={dob}
            onChangeText={setDob}
          />

          <Text style={styles.label}>Gender:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter gender"
            value={gender}
            onChangeText={setGender}
          />
        </View>

        {/* Navigation Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Icon name="list" size={18} color="#007bff" /> Your Activity
          </Text>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Orders')}
          >
            <Icon name="shopping-cart" size={18} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Cart')}
          >
            <Icon name="shopping-basket" size={18} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Addresses')}
          >
            <Icon name="map-marker" size={18} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Addresses</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            <Icon name="cog" size={18} color="#007bff" /> Account Settings
          </Text>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <Icon name="lock" size={18} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
            <Icon name="sign-out" size={18} color="#333" style={styles.menuIcon} />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Icon name="save" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f3f7' },
  scrollContainer: { padding: 20, paddingBottom: 40 },

  header: { marginBottom: 20, alignItems: 'center' },
  headerText: { fontSize: 24, fontWeight: 'bold', color: '#ff6347' },

  profilePicContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  profilePic: { width: 130, height: 130, borderRadius: 65 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },

  label: { fontSize: 16, fontWeight: '600', marginTop: 10, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },

  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  menuIcon: { marginRight: 12 },
  menuText: { fontSize: 16, color: '#333' },

  saveButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 25,
    marginTop: 10,
  },
  saveButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
