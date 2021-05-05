import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {padding, width, height} from '../../Utils/constants/styles';
import color from '../../Utils/constants/color';
import PostCard from './PostCard/PostCard';

function Profile({navigation, route}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState();
  const [userData, setUserData] = useState(null);

  const fetchUsersFollowing = async () => {
    await firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .onSnapshot((querySnapshot) => {
        let following = querySnapshot.docs.map((doc) => {
          const id = doc.id;
          return id;
        });
      });
  };

  const onFollow = () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(route.params.uid)
      .set({
        following: true,
      })
      .then(setFollowing(true));
  };

  const onUnFollow = () => {
    firestore()
      .collection('following')
      .doc(auth().currentUser.uid)
      .collection('userFollowing')
      .doc(route.params.uid)
      .delete()
      .then(setFollowing(false));
  };

  const fetchPosts = async () => {
    try {
      const list = [];

      await firestore()
        .collection('Posts')
        .where(
          'uid',
          '==',
          route.params ? route.params.uid : auth().currentUser.uid,
        )
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const {
              uid,
              displayName,
              postText,
              image,
              createdAt,
              userImage,
            } = doc.data();
            list.push({
              uid,
              displayName,
              postText,
              image,
              createdAt,
              userImage,
            });
          });
        });

      setPosts(list);
      if (loading) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.uid : auth().currentUser.uid)
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      }, []);
  };

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      fetchUsersFollowing();
      getUser();
      fetchPosts();
    }

    return () => {
      unmounted = true;
    };
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {};

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://firebasestorage.googleapis.com/v0/b/olxclone-3137d.appspot.com/o/download.jpeg?alt=media&token=c7eb2461-43db-4293-950f-1594ad0080b2'
              : 'https://firebasestorage.googleapis.com/v0/b/olxclone-3137d.appspot.com/o/download.jpeg?alt=media&token=c7eb2461-43db-4293-950f-1594ad0080b2',
          }}
        />
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.userName}>
        {userData ? userData.userName || 'Test' : 'Test'}
      </Text>
      <Text style={styles.aboutUser}>
        {userData ? userData.bio || 'No details added.' : ''}
      </Text>
      {route.params ? (
        following ? (
          <TouchableOpacity onPress={() => onUnFollow()} style={styles.userBtn}>
            <Text>Following</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onFollow()} style={styles.userBtn}>
            <Text>Follow</Text>
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditScreen')}
          style={styles.userBtn}>
          <Text style={styles.userBtnTxt}>Edit</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        {posts.map((item) => (
          <PostCard navigation={navigation} route={route} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 100,
    width: 100,
    marginLeft: 35,
    marginTop: 24,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    left: 40,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    left: 40,
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#000000',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '65%',
    marginVertical: 42,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
