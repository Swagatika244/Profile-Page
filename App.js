import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import db from './config';

import Navigator from './screens/Navigator'


class App extends React.Component {
  render(){
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  );}
}

export default App;
