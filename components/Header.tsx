import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
  PermissionsAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "react-native-geolocation-service";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Header() {
  const navigation = useNavigation<any>();
  const [locationName, setLocationName] = useState("Current Location");

  // Request permission (Android)
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need your location to show it",
          buttonPositive: "OK",
          buttonNegative: "Cancel",
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Reverse geocode coordinates to get location name
  const getLocationName = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.address) {
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state;
        setLocationName(city || "Current Location");
      } else {
        setLocationName("Current Location");
      }
    } catch (error) {
      console.log("Error reverse geocoding:", error);
      setLocationName("Current Location");
    }
  };

  const openGoogleMaps = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission Denied",
        "Enable location permission to open Google Maps"
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Update location name
        getLocationName(latitude, longitude);

        // Open Google Maps at current location
        const url = Platform.select({
          ios: `http://maps.apple.com/?ll=${latitude},${longitude}`,
          android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(You)`,
        });

        Linking.openURL(url!).catch((err) => {
          console.error("Failed to open map:", err);
          Alert.alert("Error", "Unable to open maps");
        });
      },
      (error) => {
        console.log("Geolocation error:", error);
        Alert.alert("Error", "Unable to fetch location. Make sure GPS is ON.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.locationContainer}
        onPress={openGoogleMaps}
      >
        <Ionicons name="location-sharp" size={20} color="#4CAF50" />
        <Text style={styles.location}>{locationName}</Text>
      </TouchableOpacity>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart" size={26} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person" size={26} color="#4CAF50" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    elevation: 4,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: { fontSize: 16, fontWeight: "600", marginLeft: 5 },
  icons: { flexDirection: "row", alignItems: "center" },
});
