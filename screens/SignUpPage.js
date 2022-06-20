import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      mobNum: '',
    };
  }

  handleSignUp = (email, password, firstName, lastName, mobNum) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        db.collection('users')
          .doc(user.uid)
          .set({
            name: firstName.concat(' ', lastName),
            mobile_number: mobNum,
            uid: user.uid,
            email: email,
            date_of_birth: '',
            gender: '',
            avatar: null
          });
        this.props.navigation.navigate('Edit');
      })
      .catch((error) => alert(error.message));
  };
  
  render() {
    const { email, password, firstName, lastName, mobNum } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textStyle}>Create an account</Text>
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder={'First Name'}
            onChangeText={(text) => this.setState({ firstName: text })}
            value={firstName}
          />
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder={'Last Name'}
            onChangeText={(text) => this.setState({ lastName: text })}
            value={lastName}
          />
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder={'Mobile Number'}
            onChangeText={(text) => this.setState({ mobNum: text })}
            value={mobNum}
            keyboardType="number-pad"
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Email Id'}
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ email: text })}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            onChangeText={(text) => this.setState({ password: text })}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.buttonStyle, { marginTop: 20 }]}
            onPress={() => {
              if (
                email == '' ||
                password == '' ||
                firstName == '' ||
                lastName == '' ||
                mobNum == ''
              ) {
                alert('Fill all the fields...');
              } else if (mobNum.length != 10) {
                alert('Invalid mobile number...');
              } else {
                this.handleSignUp(email, password, firstName, lastName, mobNum);
                this.setState({
                  email: '',
                  password: '',
                  firstName: '',
                  lastName: '',
                  mobNum: '',
                });
              }
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: '#444444',
              marginTop: 30,
              marginBottom: 5,
            }}>
            Already have an account? Log In
          </Text>
          <TouchableOpacity
            style={[styles.buttonStyle]}
            onPress={() => this.props.navigation.navigate('logIn')}>
            <Text style={[styles.buttonText, { fontSize: 15 }]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 2,
    height: 35,
    width: '80%',
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    fontWeight: 500,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonStyle: {
    padding: 7.5,
    paddingHorizontal: 13,
    borderRadius: 10,
    backgroundColor: '#3080FF',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 20,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
