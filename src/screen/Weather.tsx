import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Ensure PROVIDER_GOOGLE is imported
import logoImage from '../assets/images/logo.png';

const WeatherScreen = () => {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '223c0b7a120ede23c6588d13a429d5ac'; // Replace with your OpenWeather API key
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        setLocation(location);
        fetchWeather(location.latitude, location.longitude);
      })
      .catch(error => {
        setLoading(false);
        setError('Unable to fetch location. Please try again.');
        console.warn(error.code, error.message);
      });
  }, []);

  const fetchWeather = (latitude, longitude) => {
    axios.get(weatherUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: 'metric', // Use 'imperial' for Fahrenheit
      }
    })
      .then(response => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('Unable to fetch weather data. Please try again.');
        console.error(error);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00A36C" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={logoImage}
        style={styles.logo}
        resizeMode="contain"
      />
      {location && (
        <MapView
          provider={PROVIDER_GOOGLE} // Use PROVIDER_GOOGLE for Google Maps
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        </MapView>
      )}
      {weather && (
        <View style={styles.weatherCard}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
          <Image
            style={styles.weatherIcon}
            source={{ uri: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png` }}
          />
          <Text style={styles.details}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weather.wind.speed} m/s</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1efe4',
    padding: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 300, // Adjust the height as needed
    marginBottom: 20,
  },
  weatherCard: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A36C',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
  },
  logo: {
    width: 370,
    height: 100,
    padding: '5%',
    marginBottom: 20,
    resizeMode: 'contain',
  },
});

export default WeatherScreen;
