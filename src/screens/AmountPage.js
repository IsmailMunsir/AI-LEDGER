// src/screens/AmountPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const AmountPage = () => {
  const [items, setItems] = useState([{ name: '', quantity: '', amount: '' }]);
  const [totals, setTotals] = useState({ subTotal: 0, taxRate: 0, taxAmount: 0, grandTotal: 0 });

  // Function to handle item input changes
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', amount: '' }]);
  };

  const calculateTotal = () => {
    let subTotal = 0;
    items.forEach(item => {
      subTotal += parseFloat(item.amount) || 0;
    });
    const taxAmount = (totals.taxRate / 100) * subTotal;
    const grandTotal = subTotal + taxAmount;
    setTotals({ subTotal, taxAmount, grandTotal });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Amount Details</Text>

      {/* Item Details Section */}
      <Text style={styles.sectionTitle}>Item Details</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <TextInput
            style={styles.input}
            placeholder="Item Name"
            value={item.name}
            onChangeText={(text) => handleItemChange(index, 'name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={item.quantity}
            onChangeText={(text) => handleItemChange(index, 'quantity', text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={item.amount}
            onChangeText={(text) => handleItemChange(index, 'amount', text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* Add New Item Button */}
      <TouchableOpacity onPress={addItem} style={styles.button}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      {/* Tax Rate Section */}
      <Text style={styles.sectionTitle}>Tax Rate</Text>
      <TextInput
        style={styles.input}
        placeholder="Tax Rate (%)"
        value={totals.taxRate.toString()}
        onChangeText={(text) => setTotals({ ...totals, taxRate: parseFloat(text) })}
        keyboardType="numeric"
      />

      {/* Totals Section */}
      <Text style={styles.sectionTitle}>Totals</Text>
      <Text style={styles.totalText}>Sub Total: ${totals.subTotal.toFixed(2)}</Text>
      <Text style={styles.totalText}>Tax Amount: ${totals.taxAmount.toFixed(2)}</Text>
      <Text style={styles.totalText}>Grand Total: ${totals.grandTotal.toFixed(2)}</Text>

      {/* Calculate Total Button */}
      <TouchableOpacity onPress={calculateTotal} style={styles.button}>
        <Text style={styles.buttonText}>Calculate Total</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF7700', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
  itemContainer: { marginBottom: 10 },
  totalText: { fontSize: 16, marginVertical: 5 },
  button: { backgroundColor: '#FF7700', padding: 10, alignItems: 'center', marginVertical: 15 },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default AmountPage;
