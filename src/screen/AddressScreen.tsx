import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../auth/UserContext';

const AddressScreen = () => {
  const { username } = useUser();
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [crops, setCrops] = useState('');

  const handleSavePress = () => {
    console.log('Address:', address);
    console.log('Area:', area);
    console.log('Crops:', crops);
    console.log('City:', city);
    
    // Navigate to WeatherScreen and pass the city name
    navigation.navigate('BleScreen');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.username}>{username}</Text>
      <Image
        source={require('../assets/Gif/mapaddress-unscreen.gif')}
        style={styles.locationIcon}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="#888"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Area"
          placeholderTextColor="#888"
          value={area}
          onChangeText={setArea}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor="#888"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="Crops"
          placeholderTextColor="#888"
          value={crops}
          onChangeText={setCrops}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
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
    marginBottom: '10%',
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 20,
  },
  locationIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#00A36C',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  saveButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  saveButtonText: {
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

export default AddressScreen;
