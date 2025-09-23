import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CreateQuotationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Quotation Screen (Coming Soon)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  text: { fontSize: 20, fontWeight: 'bold', color: '#FF7700' },
});

export default CreateQuotationScreen;
