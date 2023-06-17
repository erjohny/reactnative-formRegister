import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import LoginScreen from './src/views/screens/LoginScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Loader from './src/views/components/Loader';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');
  React.useEffect(() => {
    setTimeout(authUser, 2000);
  }, []);
  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData?.loggedIn) {
          setInitialRouteName('Главная');
        } else {
          setInitialRouteName('Вход');
        }
      } else {
        setInitialRouteName('Регистрация');
      }
    } catch (error) {
      setInitialRouteName('Регистрация');
    }
  };
  return (
    <NavigationContainer>
      {initialRouteName == '' ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Регистрация" component={RegistrationScreen} />
            <Stack.Screen name="Вход" component={LoginScreen} />
            <Stack.Screen name="Главная" component={HomeScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
