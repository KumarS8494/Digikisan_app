import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../auth/UserContext';

const DataScreen = () => {
  const { username } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const { deviceName } = route.params;

  const [sampleNumber, setSampleNumber] = useState(1); // State for sample number

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleNextPress = () => {
    setSampleNumber(prevSampleNumber => prevSampleNumber + 1); // Increment sample number
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.dataSamplingButton}>
        <Text style={styles.dataSamplingButtonText}>DATA SAMPLING</Text>
      </TouchableOpacity>
      <View style={styles.devicePickerContainer}>
        <Image
          source={require('../assets/images/bluetooth.png')}
          style={styles.bluetoothIcon}
        />
        <Text style={styles.deviceNameText}>{deviceName}</Text>
      </View>
      <Image
        source={require('../assets/images/map.png')}
        style={styles.mapIcon}
      />
      <Text style={styles.sampleText}>Sample {sampleNumber}</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
        <Text style={styles.nextButtonText}>NEXT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Collect Data</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#00A36C',
    borderWidth: 2,
    marginBottom: 20,
  },
  dataSamplingButtonText: {
    color: '#00A36C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  devicePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#00A36C',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    height: 40,
  },
  bluetoothIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  deviceNameText: {
    fontSize: 16,
    color: '#000',
  },
  mapIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  sampleText: {
    fontSize: 16,
    color: '#00A36C',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#00A36C',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  nextButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  nextButtonText: {
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

export default DataScreen;
