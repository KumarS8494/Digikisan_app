import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../auth/UserContext';
import { Picker } from '@react-native-picker/picker';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { useRGB } from '../../src/RGBContext';
import { useBluetooth } from '../../src/BluetoothContext';

const serviceUUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'; // Replace with your service UUID
const characteristicUUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8'; // Replace with your characteristic UUID

const BluetoothScreen = () => {
  const [rgbData, setRgbData] = useState({ R: 0, G: 0, B: 0 });
  const { username } = useUser();
  const navigation = useNavigation();
  const [samplingSize, setSamplingSize] = useState('');
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const { bluetoothData } = useBluetooth();
  const [rawData, setRawData] = useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        if (
          granted['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('You can use the Bluetooth');
          enableBluetooth();
        } else {
          console.log('Bluetooth permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, []);

  const enableBluetooth = async () => {
    try {
      await BleManager.enableBluetooth();
      console.log('Bluetooth is enabled');
      BleManager.start({ showAlert: false });
      startScan();
    } catch (error) {
      console.log('Bluetooth enable error', error);
    }
  };

  const startScan = () => {
    BleManager.scan([], 5, false)
      .then(() => {
        console.log('Scanning...');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleConnect = async (device) => {
    try {
      await BleManager.connect(device.id);
      await BleManager.retrieveServices(device.id);
      setConnectedDevice(device);
      subscribeToCharacteristic(device.id);
      Alert.alert('Bluetooth Connection Successful');
    } catch (error) {
      console.log('Connection error', error);
    }
  };

  const subscribeToCharacteristic = (deviceId) => {
    BleManager.startNotification(deviceId, serviceUUID, characteristicUUID)
      .then(() => {
        console.log('Started notification on characteristic');
      })
      .catch((error) => {
        console.error('Notification error', error);
      });

    // const handleValueUpdate = (data) => {
    //   if (data.peripheral === deviceId && data.characteristic === characteristicUUID) {
    //     const rawData = data.value;
    //     console.log(data.value);
    //     setRawData(rawData);
    //     console.log(Raw Data: ${rawData});
    //   }
    // };
    const handleValueUpdate = (data) => {
      if (data.peripheral === deviceId && data.characteristic === characteristicUUID) {
        // Ensure the data is correctly interpreted
        const rawData = data.value;
        console.log('Raw Data:', rawData);
        setRgbData(rawData);
        try {
          const stringData = String.fromCharCode(...new Uint8Array(rawData));
          console.log('Decoded Data:', stringData);
          setRawData(stringData);
        } catch (error) {
          console.error('Error decoding data:', error);
        }
      }
    };

    const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);
    bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleValueUpdate);

    return () => {
      bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleValueUpdate);
    };
  };

  useEffect(() => {
    const handleDiscoverPeripheral = (peripheral) => {
      if (peripheral.name === 'ESP32') { // Change this line to check for the device name
        setDevices((prevDevices) => [...prevDevices, peripheral]);
      }
    };

    const bleManagerEmitter = new NativeEventEmitter(NativeModules.BleManager);
    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);

    BleManager.start({ showAlert: false });

    return () => {
      bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
    };
  }, []);

  const handleDataPress = () => {
    if (connectedDevice) {
      // navigation.navigate('DataScreen', { deviceName: connectedDevice.name || connectedDevice.id });
      navigation.navigate('RgbGraph', { bluetoothData });
    } else {
      Alert.alert('No device connected', 'Please connect to a Bluetooth device before proceeding.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.dataSamplingButton}>
        <Text style={styles.dataSamplingButtonText}>DATA SAMPLING</Text>
      </TouchableOpacity>
      <Text style={styles.label}>ENTER SAMPLING SIZE</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Sampling Size"
        placeholderTextColor="#888"
        value={samplingSize}
        onChangeText={setSamplingSize}
      />
      <Image
        source={require('../assets/images/bluetooth.png')}
        style={styles.bluetoothIcon}
      />
      <Picker
        selectedValue={connectedDevice ? connectedDevice.id : null}
        style={styles.picker}
        onValueChange={(itemValue) => {
          const selectedDevice = devices.find(device => device.id === itemValue);
          if (selectedDevice) {
            handleConnect(selectedDevice);
          }
        }}
      >
        {devices.map((device) => (
          <Picker.Item
            key={device.id}
            label={device.name || device.id}
            value={device.id}
          />
        ))}
      </Picker>
      <TouchableOpacity style={styles.scanButton} onPress={startScan}>
        <Text style={styles.scanButtonText}>Scan for Devices</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.dataButton} onPress={handleDataPress}>
        <Text style={styles.dataButtonText}>DATA</Text>
      </TouchableOpacity>
      {rawData ? (
        <View style={styles.dataContainer}>
          <Text style={styles.dataLabel}>Raw Data:</Text>
          <Text style={styles.dataValue}>{rawData}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f3e9',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: '10%',
    resizeMode: 'contain',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 20,
  },
  dataSamplingButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  dataSamplingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#00A36C',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#00A36C',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: '80%',
    textAlign: 'center',
    color: '#000',
  },
  bluetoothIcon: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  picker: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    color: '#000',
    backgroundColor: '#CECECE',
  },
  scanButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  dataButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dataContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 2,
  },
  dataLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 8,
  },
  dataValue: {
    fontSize: 16,
    color: '#000',
  },
});

export default BluetoothScreen;