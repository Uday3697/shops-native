import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductListScreen from './screens/ProductListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{
          headerShown: false
        }} />
        <Stack.Screen name="Products" component={ProductListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
