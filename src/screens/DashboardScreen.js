import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";

const { width, height } = Dimensions.get("window");

const DashboardScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={require("../assets/calculator.png")} style={styles.logo} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome to AI Ledger</Text>
          <Text style={styles.subtitle}>
            Your Smart and Easy Solution for Managing Bills and Quotations.
            Simplify your finances with just a few clicks.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("BillForm")}
          >
            <Text style={styles.primaryButtonText}>Create new Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("CreateQuotation")}
          >
            <Text style={styles.secondaryButtonText}>Create new Quotation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.08,
  },
  header: { alignItems: "center", marginBottom: height * 0.05 },
  logo: { width: width * 0.9, height: width * 0.9, resizeMode: "contain" },
  textContainer: { marginBottom: height * 0.04, paddingHorizontal: 10 },
  welcomeText: { fontSize: 26, fontWeight: "700", color: "#333", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#555", textAlign: "center", lineHeight: 22 },
  buttonContainer: { width: "100%", gap: 15 },
  primaryButton: { backgroundColor: "#FF7700", paddingVertical: 16, borderRadius: 8, alignItems: "center" },
  primaryButtonText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  secondaryButton: { borderColor: "#FF7700", borderWidth: 2, paddingVertical: 16, borderRadius: 8, alignItems: "center" },
  secondaryButtonText: { color: "#FF7700", fontSize: 17, fontWeight: "600" },
});

export default DashboardScreen;
