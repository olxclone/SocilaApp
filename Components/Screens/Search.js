import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, ScrollView, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function Search() {
  const [userData, setUserData] = useState([]);
  const [search , setSearch] = useState()

  const getUser = async() => {
   await firestore()
      .collection('users')
      .where('userName',"==" , search)
      .get()
      .then((snapshot) => {
        snapshot.forEach((data) => setUserData(data.data()));
      });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View>
      <TextInput onChangeText={(search) => setSearch(search)} />
      <FlatList
        data={userData}
        numColumns={1}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.userName}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
