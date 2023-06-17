import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../conts/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{marginBottom: 20}}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
              ? COLORS.darkBlue
              : COLORS.light,
          },
        ]}>
        <Icon
          name={iconName}
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.3)',
            marginRight: 10,
          }}
        />
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={{color: 'white', flex: 1}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye' : 'eye-off'}
            style={{
              fontSize: 20,
              color: hidePassword ? 'rgba(255,255,255,0.3)' : 'white',
            }}
          />
        )}
      </View>
      {error && <Text style={{color: 'red', fontSize: 12}}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.white,
  },
  inputContainer: {
    height: 55,
    backgroundColor: '#494a48',
    borderRadius: 15,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
  },
});
