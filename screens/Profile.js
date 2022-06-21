import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Header,
  SafeAreaView,
} from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import firebase from 'firebase';
import db from '../config';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      image: null,
    };
  }
  getUserData = async () => {
    const userId = firebase.auth().currentUser.uid;
    const currentUser = await db
      .collection('users')
      .doc(userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          this.setState({ userData: documentSnapshot.data() });
        }
      });
  };
  componentDidMount() {
    this.getUserData();
  }
  componentDidUpdate() {
    this.getUserData();
  }
  render() {
    const { userData, bDate, gender } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfoContainer}>
          <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Avatar.Image
              source={{ uri: userData ? userData.avatar : null }}
              size={150}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Title style={[styles.title, { marginTop: 10 }]}>
              {userData ? userData.name : ''}
            </Title>
            <Caption style={[styles.caption, { marginBottom: 10 }]}>
              {userData ? userData.uid : ''}
            </Caption>
          </View>
        </View>
        <View style={styles.bioBoxWrapper}>
          <View
            style={[
              styles.bioBox,
              { borderRightColor: 'gray', borderRightWidth: 2 },
            ]}>
            <Title style={styles.title}>
              {userData && userData.date_of_birth !== ''
                ? userData.date_of_birth
                : 'dd/mm/yyyy'}
            </Title>
            <Caption style={styles.caption}>Date of birth</Caption>
          </View>
          <View style={styles.bioBox}>
            <Title style={styles.title}>
              {userData && userData.gender !== '' ? userData.gender : 'Others'}
            </Title>
            <Caption style={styles.caption}>Gender</Caption>
          </View>
        </View>
        <View style={[styles.contactContainer]}>
          <Feather name="phone" color="" size={27} />
          <Text style={styles.textStyle}>
            Mobile number : {userData ? userData.mobile_number : ''}
          </Text>
          <Text style={styles.textStyle}></Text>
        </View>
        <View style={styles.contactContainer}>
          <Fontisto name="email" color="" size={27} />
          <Text style={styles.textStyle}>Email : {userData ? userData.email : ''}</Text>
          <Text style={styles.textStyle}></Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bioBoxWrapper: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
  },
  bioBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bolder',
    fontSize: 21.5,
  },
  caption: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  contactContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 30,
  },
  textStyle: {
    fontSize: 19,
    marginLeft: 10,
    fontWeight: 500,
  },
});
