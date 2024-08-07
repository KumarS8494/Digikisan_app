import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../auth/UserContext'; // Adjust the path accordingly

const MainScreen: React.FC = () => {
    const navigation = useNavigation();
    const { username } = useUser();

    const handleButtonPress = (buttonName: string) => {
        // Alert.alert(buttonName, `You pressed the ${buttonName} button`);
        navigation.navigate('weather')
        // Add navigation or functionality for each button here
    };
    const handleDatasamplingPress =()=>{
      navigation.navigate('address')
    }

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <View style={styles.userContainer}>
                <Text style={styles.username}>{username}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleDatasamplingPress('DATA SAMPLING')}>
                    <Text style={styles.buttonText}>DATA SAMPLING</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('WEATHER INPUTS')}>
                    <Text style={styles.buttonText}>WEATHER INPUTS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('MARKETPLACE')}>
                    <Text style={styles.buttonText}>MARKETPLACE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('CROP DATA (Hidden)')}>
                    <Text style={styles.buttonText}>CROP DATA (Hidden)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('GOVT. SCHEMES')}>
                    <Text style={styles.buttonText}>GOVT. SCHEMES</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#f1efe4', // Background color
    },
    logo: {
      width: 280,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 40,
      borderRadius:20
    },
    userContainer: {
        backgroundColor: '#f1efe4',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginBottom: 40,
    },
    username: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '80%',
    },
    button: {
        borderColor: '#00A36C',
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#00A36C',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#00A36C',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MainScreen;
