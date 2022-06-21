import * as React from 'react';
import 'react-native-gesture-handler';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Edit from './Edit';
import Profile from './Profile';
import LoginPage from './loginPage';
import SignUpPage from './SignUpPage';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="logIn"
      screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: '#3080FF',
          },
          headerTitleStyle: {
            fontSize: 26,
            color: 'white',
          },
          headerRight: () => (
            <Feather.Button
              name="edit-3"
              size={28}
              backgroundColor="#3080FF"
              color="white"
              onPress={() => navigation.navigate('Edit')}
            />
          ),
          headerLeft: ()=>(
            <Ionicons.Button
              name="md-chevron-back-outline"
              size={28}
              backgroundColor="#3080FF"
              color="white"
              onPress={() => navigation.navigate('logIn')}
            />
          ),
          
        })}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        options={({ navigation }) => ({
          headerTitle: 'Edit',
          headerStyle: {
            backgroundColor: '#3080FF',
          },
          headerTitleStyle: {
            fontSize: 26,
            color: 'white',
          },
          headerLeftStyle: {
            color: 'white',
          },
          headerLeft: ()=>(
            <Ionicons.Button
              name="md-chevron-back-outline"
              size={28}
              backgroundColor="#3080FF"
              color="white"
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        })}
      />
      <Stack.Screen
        name="logIn"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUpPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Navigator;
