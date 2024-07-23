import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

const WeatherScreen = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeather API key

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert('Permission Denied', 'Location permission is required to show the weather map.');
          }
        } else {
          getCurrentLocation();
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.log(error.code, error.message);
          Alert.alert('Error', 'Unable to fetch location. Ensure that location services are enabled and try again.');
        },
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
      );
    };

    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      {location && weather && (
        <View style={styles.weatherInfo}>
          <Text style={styles.weatherText}>
            Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C
          </Text>
          <Text style={styles.weatherText}>Condition: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherInfo: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  weatherText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WeatherScreen;
