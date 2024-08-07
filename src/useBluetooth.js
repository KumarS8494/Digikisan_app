// useBluetooth.js
import { useContext } from 'react';
import { BluetoothContext } from './BluetoothContext';

const useBluetooth = () => {
  const context = useContext(BluetoothContext);
  if (!context) {
    throw new Error('useBluetooth must be used within a BluetoothProvider');
  }
  return context;
};

export default useBluetooth;
