// components/CommunityEndorsements.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  endorsements: string[];
};

const CommunityEndorsements: React.FC<Props> = ({ endorsements }) => {
  if (!endorsements || endorsements.length === 0) return null;

  return (
    <View style={styles.container}>
      {endorsements.map((endorsement, index) => (
        <View key={index} style={styles.badge}>
          <Text style={styles.badgeText}>{endorsement}</Text>
        </View>
      ))}
    </View>
  );
};

export default CommunityEndorsements;

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  badge: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: { fontSize: 12, fontWeight: '600', color: '#333' },
});
