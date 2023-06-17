import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import Loader from '../components/Loader';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserDetails();
  });
  const getUserDetails = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };
  const logout = () => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      AsyncStorage.setItem(
        'user',
        JSON.stringify({...userDetails, loggedIn: false}),
      );
      navigation.navigate('Вход');
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      <Text style={styles.text}>Привет {userDetails?.name}</Text>
      <Button title="Выйти" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
