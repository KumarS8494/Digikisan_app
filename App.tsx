import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RGBProvider } from './src/RGBContext';
import { BluetoothProvider } from './src/BluetoothContext';

import HomeScreen from './src/screen/HomeScreen';
import MainScreen from './src/screen/MainScreen';
import LoginScreen from './src/auth/Login';
import RegistrationScreen from './src/auth/Register';
import { UserProvider } from './src/auth/UserContext';
import AddressScreen from './src/screen/AddressScreen';
import BluetoothScreen from './src/screen/Bluetooth';
import DataScreen from './src/screen/Data';
import WeatherScreen from './src/screen/Weather';
import RgbGraphScreen from './src/screen/RgbGraphScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 1); // Adjusted timeout for testing
  }, []);

  return (
    <BluetoothProvider>
      <UserProvider>
        <RGBProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegistrationScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="address" component={AddressScreen} options={{ headerShown: false }} />
              <Stack.Screen name='BleScreen' component={BluetoothScreen} options={{ headerShown: false }} />
              <Stack.Screen name="DataScreen" component={DataScreen} options={{ headerShown: false }} />
              <Stack.Screen name="weather" component={WeatherScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RgbGraph" component={RgbGraphScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RGBProvider>
      </UserProvider >
    </BluetoothProvider>
  );
};

export default App;
