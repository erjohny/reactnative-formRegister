import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../conts/colors';

const Button = ({title, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: '#494a48',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginVertical: 15,
      }}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
