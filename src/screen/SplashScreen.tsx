import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import Splashvideo from '../assets/SplashScreen.mp4'

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);

  const onNext = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      navigation.navigate('Home'); // Navigate to 'Home' screen
    }
  };

  const onPrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getPageContent = () => {
    switch (page) {
      case 1:
        return (
          <View style={styles.container}>
            <Text style={styles.text}> </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Splash Screen Page 2</Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Splash Screen Page 3</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={Splashvideo}
        style={styles.backgroundVideo}
        resizeMode="cover"
        repeat
        muted
      />
      <View style={styles.contentOverlay}>
        {getPageContent()}
        {/* <View style={styles.buttonContainer}>
          <Button title="Previous" onPress={onPrevious} disabled={page === 1} />
          <Button title="Next" onPress={onNext} />
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay color for better readability
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
});

export default SplashScreen;
