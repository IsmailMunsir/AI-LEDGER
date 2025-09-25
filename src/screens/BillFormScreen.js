import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, StyleSheet, View, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const BillFormScreen = ({ navigation }) => {
  const [billTo, setBillTo] = useState({ name: "", phone: "", address: "" });
  const [shipTo, setShipTo] = useState({ name: "", phone: "", address: "" });
  const [company, setCompany] = useState({ name: "", phone: "", address: "" });
  const [sameAsBillTo, setSameAsBillTo] = useState(false);
  const [items, setItems] = useState([{ name: "", quantity: "", price: "", amount: "" }]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "price") {
      const qty = parseFloat(newItems[index].quantity) || 0;
      const price = parseFloat(newItems[index].price) || 0;
      newItems[index].amount = (qty * price).toString();
    }
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: "", quantity: "", price: "", amount: "" }]);

  const finishInvoice = () => {
    const data = { billTo, shipTo: sameAsBillTo ? billTo : shipTo, company, items };
    navigation.navigate("AmountPageBill", { invoiceData: data });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Bill</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.formContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Bill To</Text>
        <TextInput style={styles.input} placeholder="Name" value={billTo.name} onChangeText={(t) => setBillTo({ ...billTo, name: t })} />
        <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={billTo.phone} onChangeText={(t) => setBillTo({ ...billTo, phone: t })} />
        <TextInput style={styles.input} placeholder="Address" value={billTo.address} onChangeText={(t) => setBillTo({ ...billTo, address: t })} />

        <Text style={styles.section}>Ship To</Text>
        <TouchableOpacity onPress={() => setSameAsBillTo(!sameAsBillTo)}>
          <Text style={styles.checkbox}>{sameAsBillTo ? "☑ Same as Bill To" : "☐ Same as Bill To"}</Text>
        </TouchableOpacity>
        {!sameAsBillTo && (
          <>
            <TextInput style={styles.input} placeholder="Name" value={shipTo.name} onChangeText={(t) => setShipTo({ ...shipTo, name: t })} />
            <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={shipTo.phone} onChangeText={(t) => setShipTo({ ...shipTo, phone: t })} />
            <TextInput style={styles.input} placeholder="Address" value={shipTo.address} onChangeText={(t) => setShipTo({ ...shipTo, address: t })} />
          </>
        )}

        <Text style={styles.section}>Your Company</Text>
        <TextInput style={styles.input} placeholder="Name" value={company.name} onChangeText={(t) => setCompany({ ...company, name: t })} />
        <TextInput style={styles.input} placeholder="Phone" keyboardType="phone-pad" value={company.phone} onChangeText={(t) => setCompany({ ...company, phone: t })} />
        <TextInput style={styles.input} placeholder="Address" value={company.address} onChangeText={(t) => setCompany({ ...company, address: t })} />

        <Text style={styles.section}>Item Details</Text>
        {items.map((item, i) => (
          <View key={i} style={styles.itemContainer}>
            <TextInput style={styles.input} placeholder="Item Name" value={item.name} onChangeText={(t) => handleItemChange(i, "name", t)} />
            <TextInput style={styles.input} placeholder="Quantity" keyboardType="numeric" value={item.quantity} onChangeText={(t) => handleItemChange(i, "quantity", t)} />
            <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" value={item.price} onChangeText={(t) => handleItemChange(i, "price", t)} />
            <TextInput style={[styles.input, { backgroundColor: "#eee" }]} placeholder="Amount" value={item.amount} editable={false} />
          </View>
        ))}
        <TouchableOpacity style={styles.secondaryButton} onPress={addItem}>
          <Text style={styles.secondaryButtonText}>+ Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={finishInvoice}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillFormScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 15, paddingTop: Platform.OS === "ios" ? 54 : 24, paddingBottom: 16, backgroundColor: "#f9f9f9", borderBottomWidth: 1, borderColor: "#eee" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "600", color: "#333" },
  formContainer: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { fontSize: 16, fontWeight: "600", marginVertical: 12, color: "#444" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, marginBottom: 12, backgroundColor: "#fdfdfd" },
  checkbox: { fontSize: 15, color: "#FF7700", fontWeight: "600", marginBottom: 10 },
  itemContainer: { marginBottom: 16, padding: 10, borderWidth: 1, borderColor: "#eee", borderRadius: 8, backgroundColor: "#fafafa" },
  button: { backgroundColor: "#FF7700", paddingVertical: 16, borderRadius: 10, alignItems: "center", marginTop: 30 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryButton: { borderColor: "#FF7700", borderWidth: 2, paddingVertical: 14, borderRadius: 8, alignItems: "center", marginTop: 10 },
  secondaryButtonText: { color: "#FF7700", fontSize: 15, fontWeight: "600" },
});
