import React from 'react';
import {View, Text, Image} from 'react-native';
import firebase from 'firebase';

export default function Profile() {
  return (
    <View>
      <Image
        source={{uri: firebase.auth().currentUser.photoURL}}
        style={{
          width: 150,
          borderRadius: 1000,
          alignSelf: 'center',
          height: 150,
          marginVertical:24
        }}
      />
      <Text style={{
          textAlign:"center",
          fontWeight:"bold"
      }}>{firebase.auth().currentUser.displayName}</Text>
    </View>
  );
}
