import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';

const CreateBillScreen = () => {
  // State for bill details
  const [billTo, setBillTo] = useState({ name: '', phone: '', address: '' });
  const [shipTo, setShipTo] = useState({ name: '', phone: '', address: '' });
  const [sameAsBillTo, setSameAsBillTo] = useState(false);

  // State for invoice info
  const [invoiceInfo, setInvoiceInfo] = useState({ invoiceNumber: '', invoiceDate: '', paymentDate: '' });

  // State for items (name, quantity, amount)
  const [items, setItems] = useState([{ name: '', quantity: '', amount: '' }]);

  // State for totals
  const [totals, setTotals] = useState({ subTotal: 0, taxRate: 0, taxAmount: 0, grandTotal: 0 });

  // Notes
  const [notes, setNotes] = useState('');

  // Toggle Ship To to be the same as Bill To
  const toggleSameAsBillTo = () => {
    setSameAsBillTo(!sameAsBillTo);
    if (!sameAsBillTo) {
      setShipTo({ name: billTo.name, phone: billTo.phone, address: billTo.address });
    } else {
      setShipTo({ name: '', phone: '', address: '' });
    }
  };

  // Handle input changes for bill and ship to details
  const handleBillToChange = (field, value) => {
    setBillTo({ ...billTo, [field]: value });
  };

  const handleShipToChange = (field, value) => {
    setShipTo({ ...shipTo, [field]: value });
  };

  // Handle input changes for invoice information
  const handleInvoiceChange = (field, value) => {
    setInvoiceInfo({ ...invoiceInfo, [field]: value });
  };

  // Handle input changes for items
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  // Add new item row
  const addItem = () => {
    setItems([...items, { name: '', quantity: '', amount: '' }]);
  };

  // Calculate totals based on items and tax rate
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
      <Text style={styles.title}>Create New Bill</Text>

      {/* Bill To Section */}
      <Text style={styles.sectionTitle}>Bill To</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={billTo.name}
        onChangeText={(text) => handleBillToChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={billTo.phone}
        onChangeText={(text) => handleBillToChange('phone', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={billTo.address}
        onChangeText={(text) => handleBillToChange('address', text)}
      />

      {/* Ship To Section */}
      <Text style={styles.sectionTitle}>Ship To</Text>
      <TouchableOpacity onPress={toggleSameAsBillTo} style={styles.checkboxContainer}>
        <Text style={styles.checkboxText}>{sameAsBillTo ? 'Ship To is Same as Bill To' : 'Ship To is Different'}</Text>
      </TouchableOpacity>
      {!sameAsBillTo && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={shipTo.name}
            onChangeText={(text) => handleShipToChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={shipTo.phone}
            onChangeText={(text) => handleShipToChange('phone', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={shipTo.address}
            onChangeText={(text) => handleShipToChange('address', text)}
          />
        </>
      )}

      {/* Invoice Information Section */}
      <Text style={styles.sectionTitle}>Invoice Information</Text>
      <TextInput
        style={styles.input}
        placeholder="Invoice Number"
        value={invoiceInfo.invoiceNumber}
        onChangeText={(text) => handleInvoiceChange('invoiceNumber', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Invoice Date"
        value={invoiceInfo.invoiceDate}
        onChangeText={(text) => handleInvoiceChange('invoiceDate', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Date"
        value={invoiceInfo.paymentDate}
        onChangeText={(text) => handleInvoiceChange('paymentDate', text)}
      />

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

      {/* Notes Section */}
      <Text style={styles.sectionTitle}>Notes</Text>
      <TextInput
        style={[styles.input, styles.notes]}
        placeholder="Enter any additional notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
      />

      {/* Download Invoice Button */}
      <TouchableOpacity onPress={() => { /* Implement download logic here */ }} style={[styles.button, { backgroundColor: '#FF7700' }]}>
        <Text style={styles.buttonText}>Download Invoice</Text>
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
  notes: { height: 100 },
  totalText: { fontSize: 16, marginVertical: 5 },
  button: { backgroundColor: '#FF7700', padding: 10, alignItems: 'center', marginVertical: 15 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  checkboxContainer: { marginVertical: 10 },
  checkboxText: { color: '#FF7700', fontWeight: 'bold' },
});

export default CreateBillScreen;
