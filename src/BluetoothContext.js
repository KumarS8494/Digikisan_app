import React, { createContext, useContext, useState, useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothContext = createContext();

export const BluetoothProvider = ({ children }) => {
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [rgbData, setRgbData] = useState({ R: 0, G: 0, B: 0 });

  useEffect(() => {
    const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);

    const handleValueUpdate = (data) => {
      console.log('Received data:', data); // Log the entire data object
      const rawData = data.value;
      // Example of decoding raw data if necessary
      const stringData = String.fromCharCode(...new Uint8Array(rawData));
      console.log('Decoded Data:', stringData);
      setRgbData(stringData);
    };

    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleValueUpdate);

    return () => {
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleValueUpdate);
    };
  }, [connectedDevice]);

  useEffect(() => {
    console.log('Current RGB Data:', rgbData); // Log RGB data
  }, [rgbData]);

  return (
    <BluetoothContext.Provider value={{ connectedDevice, setConnectedDevice, rgbData }}>
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetooth = () => useContext(BluetoothContext);