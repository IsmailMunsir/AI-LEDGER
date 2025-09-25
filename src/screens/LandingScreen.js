import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Track Bills</Text>
        <Text style={styles.subtitle}>Quotations Easily</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Dashboard')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 300, height: 300, resizeMode: 'contain', marginBottom: 10 },
  textContainer: { alignItems: 'center', marginBottom: 60 },
  title: { fontSize: 22, fontWeight: '600', color: '#000' },
  subtitle: { fontSize: 20, fontWeight: '500', color: '#000', marginTop: 4 },
  button: { position: 'absolute', bottom: 40, backgroundColor: '#FF7700', paddingVertical: 16, borderRadius: 8, width: '90%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
