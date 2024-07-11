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
} from 'react-native';
import BluetoothClassic from 'react-native-ble-manager';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../auth/UserContext';

const BluetoothScreen = () => {
  const { username } = useUser();
  const navigation = useNavigation();
  const [samplingSize, setSamplingSize] = useState('');
  const [devices, setDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);

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
        } else {
          console.log('Bluetooth permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
    startScan(); // Initial scan when component mounts
  }, []);

  const startScan = async () => {
    try {
      const devices = await BluetoothClassic.list();
      setDevices(devices);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConnect = async (device) => {
    try {
      await BluetoothClassic.connect(device.id);
      setConnectedDevice(device);
      Alert.alert('Bluetooth Connection Successful');
    } catch (error) {
      console.log('Connection error', error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
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
          handleConnect(selectedDevice);
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
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>BACK</Text>
      </TouchableOpacity>
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
    width: 300, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom:'10%',
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
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
    color:'#000'
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
    
    color: '#000', // Ensures the text color is visible
    backgroundColor: '#CECECE', // Ensures the background color is visible
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
  backButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BluetoothScreen;
