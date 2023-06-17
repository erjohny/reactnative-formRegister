/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {
  changeNavigationBarColor,
  hideNavigationBar,
  showNavigationBar,
} from './src';

export default changeNavigationBarColor;
export {hideNavigationBar, showNavigationBar};

AppRegistry.registerComponent(appName, () => App);
