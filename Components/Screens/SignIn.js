import React, { useEffect, useState } from "react";
import { View, Text, TextInput, KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  padding,
  width,
  height,
} from "../../Utils/constants/styles";
import color from "../../Utils/constants/color"
import firebase from "firebase";
import DocumentPicker from "react-native-document-picker"

export default function signIn({navigation}) {
 
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [Image, setImage] = useState();


  const PickProfileImage = async() =>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
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
          res.type, // mime type
          res.name,
          res.size
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

 async function GoogleLoginAsync(){
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.GoogleAuthProvider.credential(user.auth.idToken, user.auth.accessToken,);
        const googleProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }

  function signUp() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database().ref('user').set({
          userUid: firebase.auth().currentUser.uid,
          createdAt: Date.UTC,
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("That email address is already in use!");
          console.log("That email address is already in use!");
        }
        if (error.code === "auth/") {
          setError("invalid");
        }

        if (error.code === "auth/invalid-email") {
          setError("That email address is invalid!");
        }
        setError(error.message);
      });
  }
  function Login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <View>
      <View>
        <KeyboardAvoidingView>
          <TextInput
            placeholder="Email"
            onChangeText={(val) => setEmail(val)}
            style={{
              padding,
              fontSize: padding,
              elevation: 28,
              backgroundColor: color.primary,
              shadowColor: color.secondry,
              marginTop: height / 4,
              marginVertical: padding - 4,
              marginHorizontal: padding,
              fontWeight: "bold",
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
              fontWeight: "bold",
            }}
          />
          <Text
            style={{
              color: "red",
              top: 24 / 2,
              fontWeight: "bold",
              letterSpacing: 0.5,
              fontSize: padding - 2,
              textAlign: "center",
              marginTop: padding - 10,
            }}
          >
            {error}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: width / 14,
              elevation: 28,
              shadowColor: color.secondry,
            }}
          >
            <TouchableOpacity
              onPress={() => Login(email, password)}
              style={{ elevation: 28, shadowColor: color.secondry }}
            >
              <View style={{ elevation: 28, shadowColor: color.secondry }}>
                <Text
                  style={{
                    fontSize: padding - 1,
                    marginLeft: padding,
                    backgroundColor: color.secondry,
                    padding,
                    borderRadius: padding,
                    width: width / 3,
                    textAlign: "center",
                    color: color.secondry,
                  }}
                >
                  Login
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('signUp')}
              style={{ elevation: 28, shadowColor: color.secondry }}
            >
              <Text
                style={{
                  fontSize: padding - 1,
                  marginRight: padding,
                  backgroundColor: color.secondry,
                  padding,
                  borderRadius: padding,
                  width: width / 3,
                  textAlign: "center",
                  color: color.primary,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>      
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
