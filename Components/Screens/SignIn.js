import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {padding, width, height} from '../../Utils/constants/styles';
import color from '../../Utils/constants/color';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function signIn({navigation}) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [Image, setImage] = useState();

  function Login() {
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            Alert.alert('The email you have entered is invalid');
          case 'auth/user-disabled':
            Alert.alert('This user is Disabled');
          case 'auth/user-not-found':
            Alert.alert('The email you have entered could not be found');
          case 'auth/wrong-password':
            Alert.alert('The password is incorrect');
        }
      });
  }

  return (
    <KeyboardAvoidingView style={{backgroundColor: '#fff', flex: 1}}>
      <View>
        <Text
          style={{
            position: 'absolute',
            fontSize: 64,
            alignSelf: 'center',
            top: '30%',
          }}>
          {'𝓟𝓱𝓸𝓽𝓸𝓰𝓻𝓪𝓶'}
        </Text>
        <KeyboardAvoidingView style={{marginTop: height / 3}}>
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            style={{
              padding: 10,

              fontSize: padding - 6,
              backgroundColor: '#F6F6F6',
              marginVertical: padding - 4,
              marginHorizontal: padding,
              borderColor: '#111',
              borderWidth: 0.5,
              borderRadius: 5,
            }}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry
            style={{
              padding: 10,
              fontSize: padding - 6,
              backgroundColor: '#F6F6F6',
              marginHorizontal: padding,
              borderColor: '#111',
              borderWidth: 0.5,
              borderRadius: 5,
            }}
          />
          <Text
            style={{
              color: 'red',
              position: 'absolute',
              top: 24 / 2,
              fontWeight: 'bold',
              letterSpacing: 0.5,
              fontSize: padding - 6,
              textAlign: 'center',
              marginTop: padding - 10,
            }}>
            {error}
          </Text>
          <View
            style={{
              marginTop: width / 14,
              elevation: 28,
              shadowColor: color.secondry,
            }}>
            <TouchableOpacity
              onPress={() => Login(email, password)}
              style={{
                alignSelf: 'center',
                backgroundColor: '#45A4FF',
                padding: 10,
                borderRadius: 5,
                width: width - 40,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: padding - 1,

                    textAlign: 'center',
                    color: color.primary,
                  }}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => navigation.push('signUp')}
              style={{elevation: 28, shadowColor: color.secondry}}>
              <Text
                style={{
                  fontSize: padding - 1,
                  marginRight: padding,
                  backgroundColor: color.secondry,
                  padding,
                  borderRadius: padding,
                  width: width / 3,
                  textAlign: 'center',
                  color: color.primary,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity> */}
          </View>
          <Text
            onPress={() => navigation.navigate('Forgot')}
            style={{textAlign: 'center', fontSize: 12, marginVertical: 24}}>
            Forgot yor password ? Get help in logging in .
          </Text>
        </KeyboardAvoidingView>
      </View>
      <View
        style={{
          position: 'absolute',
          zIndex: 10,
          bottom: 5,
          borderTopColor: '#222',
          borderTopWidth: 0.5,
          width,
          padding: 10,
        }}>
        <Text style={{alignItems: 'center', textAlign: 'center'}}>
          Dont't have an account?
          <Text onPress={() => navigation.navigate('signUp')} style={{color: '#1467B7'}}> Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
