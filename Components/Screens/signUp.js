import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
} from 'react-native';
import {padding, width, height} from '../../Utils/constants/styles';
import color from '../../Utils/constants/color';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import DocumentPicker from 'react-native-document-picker';

export default function signUp({navigation}) {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [userName, setUserName] = useState();
  const [imageUri, setImageUri] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageError, setImageError] = useState('');
  const [transferred, setTransferred] = useState(0);
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function PickProfileImage() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setImageUri(res.uri);
      console.log(res.uri, res.type, res.name, res.size);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  const uploadImage = async () => {
    const path = `profile/${Date.now()}/${Date.now()}`;
    return new Promise(async (resolve, rej) => {
      const response = await fetch(imageUri);
      const file = await response.blob();
      let upload = storage().ref(path).put(file);

      console.log('Post Added');
      upload.on(
        'state_changed',
        (snapshot) => {
          console.log(
            `${snapshot.bytesTransferred} transferred out of ${snapshot.totalBytes}`,
          );
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );

          setVisible(true);
        },

        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          console.log(url);
          setImageUrl(url);
          resolve(url);
          setVisible(false);
          setImageUri(null);
          setUploading(false);
        },
      );
    });
  };

  async function signUp() {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: userName,
          photoURL: imageUrl,
        });

        firestore().collection('users').doc(userCredential.user.uid).set({
          userName,
          userImg: '',
          email,
          uid: userCredential.user.uid,
          createdAt: Date.now(),
          bio: '',
          web: '',
        });
      })
      .catch((error) => {});
  }

  return (
    <View style={{backgroundColor: "#fff",flex:1}}>
      <ScrollView>
        <Text
          style={{
            position: 'absolute',
            fontSize: 64,
            alignSelf: 'center',
            top: '30%',
          }}>
          {'𝓟𝓱𝓸𝓽𝓸𝓰𝓻𝓪𝓶'}
        </Text>
        <KeyboardAvoidingView style={{marginTop:'65%'}}>
          <TextInput
            placeholder="User Name"
            onChangeText={(val) => setUserName(val)}
          
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
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
                     style={{
              padding: 10,
              marginVertical: padding,
              fontSize: padding - 6,
              backgroundColor: '#F6F6F6',
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
                    fontSize: padding - 4,

                    textAlign: 'center',
                    color: color.primary,
                  }}>
                  Sign up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
