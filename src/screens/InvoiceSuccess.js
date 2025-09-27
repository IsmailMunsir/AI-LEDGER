import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

const InvoiceSuccess = ({ route, navigation }) => {
  const { subTotal, taxRate, taxAmount, grandTotal, notes } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Invoice Created ✅</Text>
        <Text style={styles.subtitle}>SubTotal: ${subTotal.toFixed(2)}</Text>
        <Text style={styles.subtitle}>Tax ({taxRate}%) : ${taxAmount.toFixed(2)}</Text>
        <Text style={styles.subtitle}>Grand Total: ${grandTotal.toFixed(2)}</Text>
        <Text style={styles.note}>Notes: {notes || "No notes added"}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("PDFViewer", {
              pdfSource: { uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
            })
          }
        >
          <Text style={styles.buttonText}>Preview Invoice PDF</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceSuccess;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  card: { width: "85%", padding: 20, borderRadius: 12, backgroundColor: "#fafafa", elevation: 3 },
  title: { fontSize: 22, fontWeight: "700", color: "#333", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#555", marginVertical: 2 },
  note: { fontSize: 14, color: "#666", marginTop: 10, fontStyle: "italic" },
  button: { backgroundColor: "#FF7700", paddingVertical: 14, borderRadius: 8, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
