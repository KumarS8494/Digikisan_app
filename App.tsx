import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screen/SplashScreen';
import HomeScreen from './src/screen/HomeScreen';
import MainScreen from './src/screen/MainScreen';
import LoginScreen from './src/auth/Login';
import RegistrationScreen from './src/auth/Register';
import { UserProvider } from './src/auth/UserContext';
import AddressScreen from './src/screen/AddressScreen';
import BluetoothScreen from './src/screen/Bluetooth';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 5000); // Adjusted timeout for testing
  }, []);

  return (
    <UserProvider>
    <NavigationContainer>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="address" component={AddressScreen} options={{headerShown:false}} />
        <Stack.Screen name='BleScrenn' component={BluetoothScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    </UserProvider>
  );
};

export default App;
