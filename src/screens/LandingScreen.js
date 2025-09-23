import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <Text style={styles.heading}>Track Bills & Quotations Easily</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Dashboard')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 },
  logo: { width: 100, height: 100 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#FF7700', marginTop: 20, textAlign: 'center' },
  button: { backgroundColor: '#FF7700', paddingVertical: 12, paddingHorizontal: 50, borderRadius: 5, marginTop: 30 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});

export default LandingScreen;
