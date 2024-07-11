import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';

// Import the image at the top
import logoImage from '../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
  const handleButtonPress = () => {
    // Alert.alert('work in progress');
    console.log('Button pressed');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={logoImage} // Replace with your image path
        style={styles.logo}
        resizeMode="contain" // Adjust resizeMode as per your image requirements
      />
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Login with email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  logo: {
    width: 300, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    padding:'30%',
    marginBottom:'50%',
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
  },
  button: {
    backgroundColor: '#3498db', // Example button background color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom:'60%',
  },
  buttonText: {
    color: '#ffffff', // Example button text color
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
