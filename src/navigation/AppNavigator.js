// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LandingScreen from '../screens/LandingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import CreateQuotationScreen from '../screens/CreateQuotationScreen';
import BillFormScreen from '../screens/BillFormScreen';
import AmountPageBill from '../screens/AmountPageBill';
import InvoiceSuccess from '../screens/InvoiceSuccess';
import PDFViewerScreen from '../screens/PDFViewerScreen'; 
// 👆 Expo will automatically load PDFViewerScreen.web.js on web,
//    and PDFViewerScreen.native.js on iOS/Android.

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="CreateQuotation" component={CreateQuotationScreen} />
        <Stack.Screen name="BillForm" component={BillFormScreen} />
        <Stack.Screen name="AmountPageBill" component={AmountPageBill} />
        <Stack.Screen name="InvoiceSuccess" component={InvoiceSuccess} />
        <Stack.Screen name="PDFViewer" component={PDFViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
