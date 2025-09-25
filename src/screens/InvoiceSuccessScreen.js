// screens/InvoiceSuccessScreen.js
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Print from "expo-print";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keys to persist SAF selection
const BASE_DIR_KEY = "AI_LEDGER_SAF_DIR";

const InvoiceSuccessScreen = ({ navigation, route }) => {
  const { invoiceData, subTotal, taxRate, taxAmount, grandTotal, notes } =
    route.params || {};

  const [savedFileUri, setSavedFileUri] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const generateAndSave = async () => {
      try {
        // Build Invoice HTML
        const html = `
          <html>
            <head>
              <meta charset="utf-8" />
              <style>
                body { font-family: Arial, sans-serif; padding: 20px; color:#222;}
                h1 { color: #FF7700; margin-bottom: 8px; }
                table { width: 100%; border-collapse: collapse; margin-top: 12px; }
                th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; }
                th { background: #FF7700; color: #fff; }
                .totals { margin-top: 18px; }
              </style>
            </head>
            <body>
              <h1>Invoice</h1>

              <h3>Bill To</h3>
              <p>${invoiceData?.billTo?.name || ""}<br/>
                 ${invoiceData?.billTo?.phone || ""}<br/>
                 ${invoiceData?.billTo?.address || ""}</p>

              <h3>Ship To</h3>
              <p>${invoiceData?.shipTo?.name || ""}<br/>
                 ${invoiceData?.shipTo?.phone || ""}<br/>
                 ${invoiceData?.shipTo?.address || ""}</p>

              <h3>Company</h3>
              <p>${invoiceData?.company?.name || ""}<br/>
                 ${invoiceData?.company?.phone || ""}<br/>
                 ${invoiceData?.company?.address || ""}</p>

              <h3>Items</h3>
              <table>
                <tr>
                  <th>Item</th><th>Qty</th><th>Price</th><th>Amount</th>
                </tr>
                ${(invoiceData?.items || [])
                  .map(
                    (it) => `
                      <tr>
                        <td>${it.name || ""}</td>
                        <td>${it.quantity || ""}</td>
                        <td>$${Number(it.price || 0).toFixed(2)}</td>
                        <td>$${Number(it.amount || 0).toFixed(2)}</td>
                      </tr>`
                  )
                  .join("")}
              </table>

              <div class="totals">
                <p><b>Sub Total:</b> $${Number(subTotal || 0).toFixed(2)}</p>
                <p><b>Tax Rate:</b> ${Number(taxRate || 0)}%</p>
                <p><b>Tax Amount:</b> $${Number(taxAmount || 0).toFixed(2)}</p>
                <p><b>Grand Total:</b> $${Number(grandTotal || 0).toFixed(2)}</p>
              </div>

              <h3>Notes</h3>
              <p>${notes || "N/A"}</p>
            </body>
          </html>
        `;

        // Generate temporary PDF
        const { uri: tempPdfUri } = await Print.printToFileAsync({ html });
        const fileName = `Invoice_${Date.now()}.pdf`;

        let finalUri;
        if (Platform.OS === "android") {
          finalUri = await savePdfToDownloads(tempPdfUri, fileName);
        } else {
          finalUri = await savePdfToIos(tempPdfUri, fileName);
        }

        setSavedFileUri(finalUri);
        console.log("Invoice saved at:", finalUri);

        Alert.alert("Saved ✅", "Invoice PDF saved successfully.");
      } catch (err) {
        console.error("PDF Save Error:", err);
        Alert.alert("Error", "Failed to save invoice PDF");
      }

      // Auto redirect after 5s
      timerRef.current = setTimeout(() => {
        navigation.replace("Dashboard");
      }, 5000);
    };

    generateAndSave();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Save into Android Downloads/AI LEDGER/downloaded/
  const savePdfToDownloads = async (tempUri, fileName) => {
    let baseDir = await AsyncStorage.getItem(BASE_DIR_KEY);

    if (!baseDir) {
      const perm = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (!perm.granted) throw new Error("Permission denied");
      baseDir = perm.directoryUri;
      await AsyncStorage.setItem(BASE_DIR_KEY, baseDir);
    }

    // Create subfolder "AI LEDGER/downloaded"
    const aiLedgerDir = await getOrCreateSubDir(baseDir, "AI LEDGER");
    const downloadedDir = await getOrCreateSubDir(aiLedgerDir, "downloaded");

    const base64 = await FileSystem.readAsStringAsync(tempUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const targetFileUri =
      await FileSystem.StorageAccessFramework.createFileAsync(
        downloadedDir,
        fileName,
        "application/pdf"
      );

    await FileSystem.writeAsStringAsync(targetFileUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return targetFileUri; // content:// URI
  };

  const getOrCreateSubDir = async (parentUri, folderName) => {
    try {
      return await FileSystem.StorageAccessFramework.makeDirectoryAsync(
        parentUri,
        folderName
      );
    } catch {
      const children = await FileSystem.StorageAccessFramework.readDirectoryAsync(
        parentUri
      );
      const found = children.find((u) =>
        decodeURIComponent(u).endsWith(`/${folderName}`)
      );
      if (found) return found;
      throw new Error("Could not create subdir");
    }
  };

  // iOS: Save into Files/AI_LEDGER/downloaded/
  const savePdfToIos = async (tempUri, fileName) => {
    const dir = FileSystem.documentDirectory + "AI_LEDGER/downloaded/";
    const info = await FileSystem.getInfoAsync(dir);
    if (!info.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
    const finalPath = dir + fileName;
    await FileSystem.copyAsync({ from: tempUri, to: finalPath });
    return finalPath;
  };

  // Open / Share saved file
  const viewInvoice = async () => {
    if (!savedFileUri) {
      Alert.alert("No File", "Invoice not ready yet.");
      return;
    }
    try {
      if (Platform.OS === "android") {
        try {
          await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
            data: savedFileUri,
            type: "application/pdf",
            flags: 1,
          });
        } catch {
          await Sharing.shareAsync(savedFileUri);
        }
      } else {
        await Sharing.shareAsync(savedFileUri);
      }
    } catch (err) {
      console.error("Open File Error:", err);
      Alert.alert("Error", "Could not open invoice PDF");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.replace("Dashboard")}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
      </View>

      {/* Success UI */}
      <View style={styles.content}>
        <Text style={styles.title}>Invoice Generated & Saved!</Text>
        <Text style={styles.subtitle}>
          Saved in <Text style={{ fontWeight: "700" }}>Downloads/AI LEDGER/downloaded</Text>
        </Text>

        <View style={styles.iconWrapper}>
          <Ionicons name="checkmark" size={60} color="#FF7700" />
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#444", marginBottom: 15 }]}
          onPress={viewInvoice}
        >
          <Text style={styles.buttonText}>View Invoice</Text>
        </TouchableOpacity>

        <Text style={styles.redirectText}>
          Redirecting to Dashboard in 5s...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceSuccessScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 54 : 24,
    paddingBottom: 16,
  },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 25 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8, color: "#000", textAlign: "center" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 24, textAlign: "center" },
  iconWrapper: {
    borderWidth: 4,
    borderColor: "#FF7700",
    borderRadius: 100,
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button: { paddingVertical: 16, borderRadius: 10, alignItems: "center", width: "80%" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  redirectText: { fontSize: 14, color: "#888", marginTop: 10 },
});
