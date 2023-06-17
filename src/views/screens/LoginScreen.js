import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Keyboard,
  Alert,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../conts/colors';
import {changeNavigationBarColor} from '../..';
import {Input} from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError('Введите почту', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Введите пароль', 'password');
    }

    if (valid) {
      login();
    }
  };

  const login = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      let userData = await AsyncStorage.getItem('user');
      if (userData) {
        userData = JSON.parse(userData);
        if (
          inputs.email == userData.email &&
          inputs.password == userData.password
        ) {
          AsyncStorage.setItem(
            'user',
            JSON.stringify({...userData, loggedIn: true}),
          );
          navigation.navigate('Главная');
        } else {
          Alert.alert('Ошибка', 'Неверный логин или пароль');
        }
      } else {
        Alert.alert('Ошибка', 'Неверный логин или пароль');
      }
    }, 3000);
  };

  const handleOnChange = (text, inputs) => {
    setInputs(prevState => ({...prevState, [inputs]: text}));
  };

  const handleError = (errorMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorMessage}));
  };

  changeNavigationBarColor();
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#4e4f4d',
      }}>
      <Loader visible={loading} />
      <Text
        style={{
          color: COLORS.white,
          fontSize: 40,
          fontWeight: 'bold',
          margin: 15,
        }}>
        Авторизация
      </Text>

      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          height: '45%',
          width: '90%',
          borderRadius: 25,
        }}>
        <ScrollView>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Input
              label="Логин"
              iconName="mail"
              placeholder="Введите почту"
              error={errors.email}
              onFocus={() => {
                handleError(null, 'email');
              }}
              onChangeText={text => handleOnChange(text, 'email')}
            />
            <Input
              label="Пароль"
              iconName="lock-closed"
              placeholder="Введите пароль"
              password
              error={errors.password}
              onFocus={() => {
                handleError(null, 'password');
              }}
              onChangeText={text => handleOnChange(text, 'password')}
            />
            <Button onPress={validate} title="Вход" />
            <Text
              onPress={() => navigation.navigate('Регистрация')}
              style={{color: 'white', textAlign: 'center', fontSize: 16}}>
              У вас нет аккаунта? Зарегестрироваться
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
