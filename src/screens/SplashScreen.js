import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Landing'); // Go to Landing after 3 sec
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo1.png')} style={styles.logo} />
      <Text style={styles.appName}>AI LEDGER</Text>
      <Text style={styles.slogan}>Smart. Simple. Bills.</Text>
      <ActivityIndicator size="large" color="white" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF7700' },
  logo: { width: 100, height: 100 },
  appName: { fontSize: 24, fontWeight: 'bold', color: 'white', marginTop: 20 },
  slogan: { fontSize: 16, color: 'white', marginTop: 10 },
  loader: { marginTop: 20 },
});

export default SplashScreen;
