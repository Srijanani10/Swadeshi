// screens/SkillsScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";

// Define skill type
export type SkillType = {
  id: string;
  workerName: string;
  skill: string;
  experience: string;
};

const SkillsScreen: React.FC = () => {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState<{ [key: string]: string }>({});

  // Fetch fake skills data
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Using fake API for demonstration
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();

        // Map fake API data to skill format
        const formatted: SkillType[] = data.slice(0, 10).map((d: any, idx: number) => ({
          id: String(d.id),
          workerName: d.name,
          skill: ["Pottery", "Weaving", "Handloom", "Carpentry", "Painting"][idx % 5],
          experience: `${(idx + 1) * 2} years`,
        }));

        setSkills(formatted);
      } catch (error) {
        console.log("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleRequestOrder = (skillId: string, workerName: string) => {
    const qty = orderQuantity[skillId];
    if (!qty || isNaN(Number(qty)) || Number(qty) <= 0) {
      Alert.alert("Invalid Quantity", "Please enter a valid quantity for your order.");
      return;
    }

    Alert.alert(
      "Order Request Sent",
      `You requested ${qty} item(s) from ${workerName}.`,
      [{ text: "OK", onPress: () => setOrderQuantity({ ...orderQuantity, [skillId]: "" }) }]
    );
  };

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
        {skills.map((skill) => (
          <View key={skill.id} style={styles.card}>
            <Text style={styles.workerName}>{skill.workerName}</Text>
            <Text style={styles.skillText}>Skill: {skill.skill}</Text>
            <Text style={styles.experienceText}>Experience: {skill.experience}</Text>

            <View style={styles.orderRow}>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={orderQuantity[skill.id] || ""}
                onChangeText={(text) =>
                  setOrderQuantity({ ...orderQuantity, [skill.id]: text })
                }
              />
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => handleRequestOrder(skill.id, skill.workerName)}
              >
                <Text style={styles.requestText}>Request Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SkillsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scroll: { padding: 16, paddingBottom: 40 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  workerName: { fontSize: 18, fontWeight: "700", color: "#4CAF50" },
  skillText: { fontSize: 14, marginTop: 6 },
  experienceText: { fontSize: 14, marginTop: 2, color: "gray" },

  orderRow: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  requestButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  requestText: { color: "#fff", fontWeight: "600" },
});
