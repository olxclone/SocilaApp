import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {padding} from './Utils/constants/styles';

export default function EditProfileheader({onUpdate, navigation}) {
  return (
    <View style={{backgroundColor: '#FFF', padding: padding - 4}}>
      <SafeAreaView
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            position: 'absolute',
            left: padding + 18,
            fontWeight: 'bold',
            fontSize: padding - 3,
          }}>
          Edit Profile
        </Text>
        <TouchableOpacity onPress={() => onUpdate()}>
          <MaterialIcons name="done" size={28} color="#128EF2" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
