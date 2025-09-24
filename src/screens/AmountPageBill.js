import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const AmountPageBill = ({ route, navigation }) => {
  const { invoiceData } = route.params;
  const [taxRate, setTaxRate] = useState("0");

  // ✅ Predefined notes
  const noteOptions = [
    "Thank you for your business! We appreciate your trust.",
    "Payment is due within 7 days. Please contact us for any issues.",
    "Keep this invoice for your records. Returns accepted within 14 days.",
    "We value your partnership and look forward to working again.",
  ];
  const [noteIndex, setNoteIndex] = useState(0);

  const cycleNote = () => {
    setNoteIndex((prev) => (prev + 1) % noteOptions.length);
  };

  const [useNote, setUseNote] = useState(true); // toggle notes on/off
  const [customNote, setCustomNote] = useState(""); // user-typed note

  // ✅ Totals calculation
  const { subTotal, taxAmount, grandTotal } = useMemo(() => {
    const sub = invoiceData.items.reduce((sum, item) => {
      const amt = parseFloat(item.amount) || 0;
      return sum + amt;
    }, 0);

    const rate = parseFloat(taxRate) || 0;
    const taxAmt = (sub * rate) / 100;
    const grand = sub + taxAmt;

    return { subTotal: sub, taxAmount: taxAmt, grandTotal: grand };
  }, [invoiceData.items, taxRate]);

  const downloadInvoice = () => {
    const finalNote = useNote
      ? customNote.trim() !== ""
        ? customNote
        : noteOptions[noteIndex]
      : "";

    Alert.alert("Download", "Invoice downloaded successfully ✅");
    console.log("Final Invoice Data:", {
      ...invoiceData,
      subTotal,
      taxRate,
      taxAmount,
      grandTotal,
      notes: finalNote,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Bill</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Totals */}
        <Text style={styles.section}>Totals</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Sub Total</Text>
          <Text style={styles.value}>${subTotal.toFixed(2)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tax Rate (%)</Text>
          <TextInput
            style={[styles.input, styles.taxInput]}
            keyboardType="numeric"
            value={taxRate}
            onChangeText={setTaxRate}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Tax Amount</Text>
          <Text style={styles.value}>${taxAmount.toFixed(2)}</Text>
        </View>

        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={[styles.label, { fontWeight: "700", fontSize: 16 }]}>
            Grand Total :
          </Text>
          <Text style={[styles.value, { fontWeight: "700", fontSize: 16 }]}>
            ${grandTotal.toFixed(2)}
          </Text>
        </View>

        {/* Notes */}
        <View style={styles.notesHeader}>
          <Text style={styles.section}>Notes</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* 🔄 Cycle note */}
            <TouchableOpacity onPress={cycleNote}>
              <Ionicons
                name="refresh"
                size={22}
                color="#FF7700"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
            {/* ☑ Enable/disable note */}
            <TouchableOpacity onPress={() => setUseNote(!useNote)}>
              <Ionicons
                name={useNote ? "checkbox" : "square-outline"}
                size={22}
                color="#FF7700"
              />
            </TouchableOpacity>
          </View>
        </View>

        {useNote && (
          <>
            {/* Show selected template */}
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>{noteOptions[noteIndex]}</Text>
            </View>

            {/* OR Custom note */}
            <Text style={styles.orText}>OR</Text>
            <TextInput
              style={[styles.input, styles.customNoteInput]}
              multiline
              placeholder="Type your own note..."
              value={customNote}
              onChangeText={setCustomNote}
            />
          </>
        )}

        {/* Download button */}
        <TouchableOpacity style={styles.button} onPress={downloadInvoice}>
          <Text style={styles.buttonText}>Download Invoice</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // ✅ Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 54 : 24,
    paddingBottom: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  scrollContent: { padding: 20, paddingBottom: 40 },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 12,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontSize: 15, color: "#333" },
  value: { fontSize: 15, color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fdfdfd",
    fontSize: 15,
    marginBottom: 12,
  },
  taxInput: {
    width: 80,
    textAlign: "center",
    fontWeight: "600",
  },

  // ✅ Notes
  notesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  noteBox: {
    borderWidth: 1,
    borderColor: "#FF7700",
    borderRadius: 8,
    padding: 14,
    backgroundColor: "#fff4ec",
    marginBottom: 16, // 👈 gap added
  },
  noteText: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  orText: {
    textAlign: "center",
    marginBottom: 10,
    color: "#888",
    fontWeight: "600",
  },
  customNoteInput: {
    height: 100,
    textAlignVertical: "top",
    marginBottom: 16, // 👈 gap added
  },

  // ✅ Button
  button: {
    backgroundColor: "#FF7700",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default AmountPageBill;
