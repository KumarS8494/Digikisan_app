import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useUser } from './UserContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUsername } = useUser();
  const [username, setUsernameInput] = useState('');
  const [password, setPasswordInput] = useState('');

  const handleLogin = () => {
    // Validate username and password here
    // If valid:
    setUsername(username);
    navigation.navigate('Main');
  };

  const registrationHandle = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number, Username or Email"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsernameInput}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPasswordInput}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={registrationHandle}>
        <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f3e9', // Background color
  },
  logo: {
    width: 280,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 150,
    borderRadius:20
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
    backgroundColor: '#fff', // White background for input fields
    color: '#000' // Ensure the text is visible
  },
  passwordVisibilityToggle: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  loginButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#00A36C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#888',
    marginBottom: 20,
  },
  signUpText: {
    color: '#888',
  },
  signUpLink: {
    color: '#00A36C',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
