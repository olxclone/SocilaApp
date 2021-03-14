import React, {useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import firebase from 'firebase';
import {padding} from '../../Utils/constants/styles';
import {Colors} from 'react-native-paper';

require('firebase/firestore');

export default function Home() {
  return (
    <View>
      {/* <View
        style={{
          padding: padding - 5,
          backgroundColor: Colors.grey300,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
          <Text style={{textAlign: 'center', fontSize: padding - 5}}>Feed</Text>

        <Pressable>
          <Text style={{textAlign: 'center', fontSize: padding - 5}}>Post</Text>
        </Pressable>
      </View> */}
      <Text onPress={() => firebase.auth().signOut()}>log out</Text>
    </View>
  );
}
