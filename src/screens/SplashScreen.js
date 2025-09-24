// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Landing'); // move to Landing after 3 seconds
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Your logo */}
      <Image
        source={require('../assets/logo1.png')} // save the image you uploaded as logo.png inside assets folder
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>AI LEDGER</Text>
      <Text style={styles.subtitle}>Smart. Simple. Bills.</Text>
    </View>
  ); 
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF7A00', // orange background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
});
