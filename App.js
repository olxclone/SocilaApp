import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase';

import Loading from './Components/Screens/Loading';
import SignIn from './Components/Screens/SignIn';
import Home from './Components/Screens/Home';
import {firebaseConfig} from './Utils/firebaseConfig';
import signUp from './Components/Screens/signUp';
import Profile from './Components/Screens/Profile';
import PostScreen from './Components/Screens/PostScreen';
import { Text, TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = ({navigation}) => {
  if (!firebase.app()) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  function TabNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          options={{headerShown: false}}
          component={Loading}
        />
        <Stack.Screen
          name="signIn"
          options={{headerShown: false}}
          component={SignIn}
        />
        <Stack.Screen
          name="signUp"
          options={{headerShown: false}}
          component={signUp}
        />
        <Stack.Screen
          name="Main"
          options={{headerShown: true,headerTitle:"Feed",headerLeft:() => null,headerRight:() =><TouchableOpacity onPress={() => {navigation.navigate('PostScreen')}}><Text style={{fontSize:18,fontWeight:"bold",marginHorizontal:14}}>Post</Text></TouchableOpacity> }}
          component={TabNavigator}
        />
        <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
