import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
// import { TouchableOpacity } from "react-native-gesture-handler";
import {padding, width, height} from '../../Utils/constants/styles';
import color from '../../Utils/constants/color';
import firebase from 'firebase';
import DocumentPicker from 'react-native-document-picker';
// import { Colors } from "react-native/Libraries/NewAppScreen";

export default function signUp({navigation}) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [userName, setUserName] = useState();
  const [imageUri, setImageUri] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState('');

  const PickProfileImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      setImageUri(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
            } else {
        throw err;
      }
    }

    // Pick multiple files
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, 
          res.name,
          res.size,
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const uploadImage = async () => {
    if (imageUri === null) {
      return null;
    }

    const path = `profile/${Date.now()}/${Date.now()}`;
    return new Promise(async (resolve, rej) => {
      const response = await fetch(imageUri);
      const file = await response.blob();
      let upload = firebase.storage().ref(path).put(file);
      // setUploading(true);
      console.log('Post Added');
      upload.on(
        'state_changed',
        (snapshot) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
        },

        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log(url);
          setImageUrl(url);
          resolve(url);
          setImageUri(null);
        },
      );
    });
  };

  async function signUp() {
    uploadImage();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: userName,
          photoURL: imageUrl,
        });
        if (imageUri === null) {
          setImageError('please select a profile image');
        }
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setError('That email address is already in use!');
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/') {
          setError('invalid');
        }

        if (error.code === 'auth/invalid-email') {
          setError('That email address is invalid!');
        }
        setError(error.message);
      });
    firebase
      .database()
      .ref('users')
      .push({
        userName,
        uid: await firebase.auth().currentUser.uid,
        profileImage: imageUrl,
        createdAt: Date.now(),
      });
  }

  return (
    <ScrollView>
      <ScrollView>
        <KeyboardAvoidingView>
          <TouchableOpacity onPress={() => PickProfileImage()}>
            <Image
              source={{uri: imageUri}}
              style={{
                width: 180,
                marginTop: height / 18,
                alignSelf: 'center',
                borderRadius: width,
                height: 180,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}
            />
          </TouchableOpacity>
          <Text>{imageError}</Text>
          <TouchableOpacity
            onPress={() => uploadImage()}
            style={{alignSelf: 'center', marginVertical: width / 25}}>
            <Text
              style={{
                fontSize: padding - 1,
                borderRadius: padding,
                width: width / 3,
                textAlign: 'center',
                fontWeight: 'bold',
                color: color.secondry,
              }}>
              Save
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="User Name"
            onChangeText={(val) => setUserName(val)}
            style={{
              padding,
              fontSize: padding,
              elevation: 28,
              backgroundColor: color.primary,
              shadowColor: color.secondry,
              marginHorizontal: padding,
              fontWeight: 'bold',
              // marginTop: height / 4,
            }}
          />
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            style={{
              padding,
              fontSize: padding,
              elevation: 28,
              backgroundColor: color.primary,
              shadowColor: color.secondry,
              marginVertical: padding - 4,
              marginHorizontal: padding,
              fontWeight: 'bold',
            }}
          />

          <TextInput
            placeholder="Password"
            onChangeText={(val) => setPassword(val)}
            secureTextEntry
            style={{
              padding,
              fontSize: padding,
              elevation: 28,
              backgroundColor: color.primary,
              shadowColor: color.secondry,
              marginHorizontal: padding,
              fontWeight: 'bold',
            }}
          />
          <Text
            style={{
              color: 'red',
              top: 24 / 2,
              fontWeight: 'bold',
              letterSpacing: 0.5,
              fontSize: padding - 2,
              textAlign: 'center',
              marginTop: padding - 10,
            }}>
            {error}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: width / 14,
              elevation: 28,
              shadowColor: color.secondry,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => signUp()}
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
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ScrollView>
  );
}
