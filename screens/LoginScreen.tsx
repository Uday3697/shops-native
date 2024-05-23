import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const isDarkMode = useColorScheme() === 'dark';

    const handleLogin = async () => {
        try {
            const storedPassword = await AsyncStorage.getItem(email);

            if (storedPassword === password) {
                navigation.navigate('Products');
            } else {
                Alert.alert('Invalid credentials', 'The email or password is incorrect.');
                setPassword('')
            }
        } catch (error) {
            console.error('Failed to fetch data from storage', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: "#ffffff" }]}>
            <Text style={[styles.title, { color: "#000" }]}>
                Login
            </Text>
            <TextInput
                style={[styles.input, { color: '#gold' }]}
                placeholder="Email"
                placeholderTextColor='gold'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={[styles.input, { color: '#gold' }]}
                placeholder="Password"
                placeholderTextColor='gold'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} color={'gold'} />
            <View style={{flexDirection:'row',alignSelf:'center',marginTop:20}}>
                <Text style={{color:"gold"}}>Not Registered ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{color:"blue"}}>Click here </Text></TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        color: "gold"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        color: "gold",
        borderRadius: 8

    },
});

export default LoginScreen;
