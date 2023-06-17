import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from './screens/tabScreens/Feed';

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Feed2" component={Feed} />
    </Tab.Navigator>
  );
}
export default function () {
  return (
    <NavigationContainer>
      <TabGroup />
    </NavigationContainer>
  );
}
