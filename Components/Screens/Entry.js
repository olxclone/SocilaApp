import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import color from '../../Utils/constants/color';
import * as Animatable from "react-native-animatable"

export default function Entry({navigation}) {

  return (
    <Animatable.View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'column',
          flex: 1.5,
          backgroundColor: color.primary,
        }}></View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1.3,
          backgroundColor: color.secondry,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}>
        <View style={{justifyContent:"center"}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('signIn')}
            style={{backgroundColor: color.primary, alignSelf: 'center'}}>
   
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
}
