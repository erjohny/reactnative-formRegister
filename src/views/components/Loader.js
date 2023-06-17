import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS} from '../../conts/colors';
const Loader = ({visible = false}) => {
  const {width, height} = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, {height, width}]}>
        {/* <View style={style.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{marginLeft: 10, fontSize: 16}}>Loading...</Text>
        </View> */}
        <Image
          style={{
            height: 50,
            width: 50,
          }}
          source={require('../../../assets/Loading.gif')}
        />
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: COLORS.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loader;
