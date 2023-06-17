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

const RegistrationScreen = ({navigation}) => {
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
    if (!inputs.name) {
      handleError('Введите имя', 'name');
      valid = false;
    } else if (inputs.name.length < 3) {
      handleError('Имя должен быть не менее 3 символов', 'name');
      valid = false;
    }
    if (!inputs.email) {
      handleError('Введите почту', 'email');
      valid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Введите корректную почту', 'email');
      valid = false;
    }
    if (!inputs.password) {
      handleError('Введите пароль', 'password');
      valid = false;
    } else if (inputs.password.length < 5) {
      handleError('Пароль должен быть не менее 5 символов', 'password');
      valid = false;
    }

    if (valid) {
      register();
    }
  };

  const register = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      try {
        AsyncStorage.setItem('user', JSON.stringify(inputs));
        navigation.navigate('Вход');
      } catch (error) {
        Alert.alert('Ошибка');
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
        Регистрация
      </Text>

      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          height: '60%',
          width: '90%',
          borderRadius: 25,
        }}>
        <ScrollView>
          <View style={{marginVertical: 10, marginHorizontal: 10}}>
            <Input
              label="Имя"
              iconName="person"
              placeholder="Введите имя"
              error={errors.name}
              onFocus={() => {
                handleError(null, 'name');
              }}
              onChangeText={text => handleOnChange(text, 'name')}
            />
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
            <Button onPress={validate} title="Зарегестрироваться" />
            <Text
              onPress={() => navigation.navigate('Вход')}
              style={{color: 'white', textAlign: 'center', fontSize: 16}}>
              У вас уже есть аккаунт? Войти
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({});
