import React, {Children} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import firebase from '@react-native-firebase/app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import {Image, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';

import Loading from './Components/Screens/Loading';
import SignIn from './Components/Screens/SignIn';
import Home from './Components/Screens/Home';
import {firebaseConfig} from './Utils/firebaseConfig';
import signUp from './Components/Screens/signUp';
import Profile from './Components/Screens/Profile';
import PostScreen from './Components/Screens/PostScreen';
import ForgotScreen from './Components/Screens/forgetScreen';
import Entry from './Components/Screens/Entry';
import EditProfile from './Components/Screens/EditProfile';
import Search from './Components/Screens/Search';
import Notifications from './Components/Screens/Notifications';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomButton = ({children, onPress, navigation}) => {
  return (
    <TouchableOpacity
      style={{
        height: 60,
        borderRadius: 100,
        marginBottom: 500,
        width: 60,
        backgroundColor: '#137363',
      }}
      onPress={onPress}>
      <View style={{justifyContent: 'center', marginTop: '50%'}}>
        <AntDesign
          name="plus"
          size={24}
          color="black"
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

 const App = ({navigation}) => {
  if (!firebase.app()) {
    firebase.initializeApp(firebaseConfig);
    firestore().settings({experimentalForceLongPolling: true});
  } else {
    firebase.app();
  }

  function TabNavigator() {
    return (
      <Tab.Navigator
        tabBarOptions={{
            activeTintColor: '#000',
          inactiveTintColor: 'rgba(0,0,0,0.5)',
        }}>
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <Entypo name="home" size={focused ? 32 : 24} color="black" />
              ) : (
                <AntDesign
                  name="home"
                  style={{}}
                  color={color}
                  size={focused ? 32 : 24}
                />
              ),
          }}
          component={Home}
        />

        <Tab.Screen
          name="search"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <FontAwesome5
                  name="search"
                  size={focused ? 32 : 24}
                  color="black"
                />
              ) : (
                <AntDesign name="search1" size={24} color={color} />
              ),
          }}
          component={Search}
        />

        <Tab.Screen
          name={'Post'}
          component={PostScreen}
          options={{
            tabBarVisible: false,
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <AntDesign
                  name="plussquare"
                  size={focused ? 32 : 24}
                  color={color}
                />
              ) : (
                <AntDesign
                  name="plussquareo"
                  size={24}
                  color="black"
                />
              ),
          }}
        />

        <Tab.Screen
          name="Notification"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) =>
              focused ? (
                <FontAwesome
                  name="bell"
                  size={focused ? 32 : 24}
                  color="black"
                />
              ) : (
                <FontAwesome name="bell-o" size={24} color="black" />
              ),
          }}
          component={Notifications}
        />

        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: '',
            tabBarIcon: ({color, focused}) => (
              <Ionicons
                name={focused ? 'people' : 'people-outline'}
                style={{justifyContent: 'center', position: 'absolute'}}
                color={color}
                size={focused ? 32 : 24}
              />
            ),
          }}
          component={Profile}
        />
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
        <Stack.Screen name="Main" options={{headerShown:false}}component={TabNavigator}       />
        <Stack.Screen name="PostScreen" options={{ headerShown: true }}  component={PostScreen}        />
        <Stack.Screen name="Forgot" component={ForgotScreen} />
        <Stack.Screen name="EditScreen" options={{headerShown:false}} component={EditProfile} />
        <Stack.Screen name="HomeProfile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;