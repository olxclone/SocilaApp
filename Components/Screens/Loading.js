import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import firebase from "firebase"

export default function Loading({navigation}) {
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                navigation.push('Main')
            }else{
                navigation.push('signIn')
            }
        })
    })
    return (
        <View>
            <Text></Text>
        </View>
    )
}
