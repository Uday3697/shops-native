import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateEmail = (email: string) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      // Check if email and password are not empty
      if (!email || !password) {
        Alert.alert('Error', 'Please provide both email and password.');
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
      }

      // Check if email already exists in local storage
      const existingUser = await AsyncStorage.getItem(email);
      if (existingUser !== null) {
        Alert.alert('Error', 'User already exists. Please login.');
        return;
      }

      // Save registration details in local storage
      await AsyncStorage.setItem(email, password);
      Alert.alert('Success', 'Registration successful.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to save registration data:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} color={'gold'} />
      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
        <Text style={{ color: "gold" }}>Already Registered? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: "green" }}>Click here to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    color: 'gold'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'gold'
  },
});

export default RegisterScreen;
