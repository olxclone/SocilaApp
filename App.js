import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from 'firebase';
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/MaterialIcons"

import Loading from './Components/Screens/Loading';
import SignIn from './Components/Screens/SignIn';
import Home from './Components/Screens/Home';
import {firebaseConfig} from './Utils/firebaseConfig';
import signUp from './Components/Screens/signUp';
import Profile from './Components/Screens/Profile';
import PostScreen from './Components/Screens/PostScreen';
import {Text, TouchableOpacity} from 'react-native';
import ForgotScreen from './Components/Screens/forgetScreen';

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
      <Tab.Navigator tabBarOptions={{activeTintColor:"#000",inactiveTintColor:"rgba(0,0,0,0.5)"}}>
        <Tab.Screen name="Home" options={{tabBarLabel:"Home",tabBarIcon:({color}) => (<AntDesign name="home" color={color} size={28} />)}} component={Home} />
        <Tab.Screen name="Profile" options={{tabBarIcon:({color}) => (<Ionicons name="people" color={color} size={28} />)}} component={Profile} />
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
          options={{
            headerShown: false,
            headerTitle: 'Feed',
            headerLeft: () => null,
          }}
          component={TabNavigator}
        />
        <Stack.Screen
          name="PostScreen"
          options={{headerShown: false}}
          component={PostScreen}
        />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
