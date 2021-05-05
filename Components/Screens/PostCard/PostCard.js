import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {padding, width, height} from '../../../Utils/constants/styles';
import {Card} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function PostCard({item, navigation, onDelete, route}) {
  const [userData, setUserData] = useState();

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      }, []);
  };

  useEffect(() => {
    const cleanup = getUser();
    return () => cleanup;
  }, []);

  return (
    <View style={{width, borderRadius: 200}}>
      <View style={{marginVertical: 24, backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeProfile', item)}
            style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: width / 7,
                margin: padding - 4,
                borderRadius: 75,
                height: width / 7,
              }}
              source={{
                uri: userData
                  ? userData.userImg ||
                    'https://firebasestorage.googleapis.com/v0/b/olxclone-3137d.appspot.com/o/download.jpeg?alt=media&token=c7eb2461-43db-4293-950f-1594ad0080b2'
                  : 'https://firebasestorage.googleapis.com/v0/b/olxclone-3137d.appspot.com/o/download.jpeg?alt=media&token=c7eb2461-43db-4293-950f-1594ad0080b2',
              }}
            />
            <Text
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '8%',
                color: '#000',
                fontSize: padding,
              }}>
              {userData ? userData.userName : 'Test'}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{position: 'absolute', top: 58, left: '26%'}}>
          {new Date().toDateString(item.createdAt)}
        </Text>
        <Card.Divider />
        <Image
          resizeMode="cover"
          source={{uri: item.image}}
          style={{
            width: item.image ? width : 0,
            alignSelf: 'center',
            height: item.image ? height / 2.7 : 0,
          }}
        />
        <View>
          {auth().currentUser.uid === item.uid ? (
            <AntDesign
              name="delete"
              style={{marginBottom: 15}}
              onPress={() => onDelete(item.id)}
              size={24}
              color="black"
            />
          ) : (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'flex-end',
                  top: 0,
                  position: 'absolute',
                }}>
                <AntDesign
                  name="like2"
                  size={26}
                  color="black"
                  style={{marginHorizontal: 24}}
                />
                <AntDesign name="dislike2" size={26} color="black" />
              </View>
              <AntDesign
                name="hearto"
                style={{marginVertical: padding - 4}}
                size={24}
                color="black"
              />
            </>
          )}
          <Text style={{fontSize: padding - 6}}>{item.postText}</Text>
        </View>
      </View>
    </View>
  );
}
