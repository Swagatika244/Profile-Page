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

export default class loginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        this.props.navigation.navigate('Profile');
      })
      .catch((error) => alert(error.message));
  };
  render() {
    const { email, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/profile.png')}
            style={{ height: 200, width: 200, marginTop: 70 }}></Image>
          <TextInput
            style={[styles.textInput, { marginTop: 20 }]}
            placeholder={'Email Id'}
            keyboardType="email-address"
            onChangeText={(text) => this.setState({ email: text })}
            value={email}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Password'}
            keyboardType="number-pad"
            onChangeText={(text) => this.setState({ password: text })}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity
            style={[styles.buttonStyle, { marginTop: 20 }]}
            onPress={() => {
              this.handleLogin(email, password);
            }}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              color: '#444444',
              marginTop: 30,
              marginBottom: 5,
            }}>
            Create an account
          </Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('signUp')}>
            <Text style={[styles.buttonText, { fontSize: 15 }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderWidth: 2,
    height: 35,
    width: '85%',
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
});
