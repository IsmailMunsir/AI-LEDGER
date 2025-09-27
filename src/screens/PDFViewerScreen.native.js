import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput } from "react-native";
import Pdf from "react-native-pdf"; // ✅ works on mobile

const { width, height } = Dimensions.get("window");

const PDFViewerScreen = ({ route, navigation }) => {
  const { pdfSource } = route.params || {};
  const pdfRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jumpPage, setJumpPage] = useState("");

  const jumpToPage = () => {
    const target = parseInt(jumpPage);
    if (target > 0 && target <= totalPages) {
      pdfRef.current.setPage(target);
      setPage(target);
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

      {/* Native PDF */}
      <Pdf
        ref={pdfRef}
        source={pdfSource}
        style={styles.pdf}
        onLoadComplete={(pages) => setTotalPages(pages)}
        onPageChanged={(p) => setPage(p)}
        onError={(err) => console.log(err)}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Page {page} / {totalPages}</Text>
        <View style={styles.jumpContainer}>
          <TextInput
            style={styles.jumpInput}
            placeholder="Page #"
            keyboardType="numeric"
            value={jumpPage}
            onChangeText={setJumpPage}
          />
          <TouchableOpacity style={styles.jumpBtn} onPress={jumpToPage}>
            <Text style={styles.jumpBtnText}>Go</Text>
          </TouchableOpacity>
        </View>
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
  pdf: { flex: 1, width, height },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderTopWidth: 1, borderColor: "#eee", backgroundColor: "#fafafa" },
  footerText: { fontSize: 14, color: "#444" },
  jumpContainer: { flexDirection: "row", alignItems: "center" },
  jumpInput: { width: 60, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 6, marginRight: 8, textAlign: "center" },
  jumpBtn: { backgroundColor: "#FF7700", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 6 },
  jumpBtnText: { color: "#fff", fontWeight: "600" },
});
