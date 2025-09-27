import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const PDFViewerScreen = ({ route, navigation }) => {
  const { pdfSource } = route.params || {};

  const openPDF = () => {
    if (pdfSource?.uri) {
      window.open(pdfSource.uri, "_blank"); // ✅ open in new tab
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PDF Viewer</Text>
        <View style={{ width: 50 }} />
      </View>

      {/* Fallback */}
      <View style={styles.content}>
        <Text style={styles.info}>Web does not support inline PDF preview.</Text>
        <TouchableOpacity style={styles.button} onPress={openPDF}>
          <Text style={styles.buttonText}>Open PDF in New Tab</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PDFViewerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", alignItems: "center", padding: 12, borderBottomWidth: 1, borderColor: "#eee", backgroundColor: "#f9f9f9" },
  backBtn: { fontSize: 16, color: "#FF7700", fontWeight: "600" },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 18, fontWeight: "600", color: "#333" },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  info: { fontSize: 16, color: "#555", marginBottom: 20 },
  button: { backgroundColor: "#FF7700", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
