import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import { Title, Caption } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from 'firebase';
import db from '../config';
import UserPermissions from '../UserPermissions';
import * as ImagePicker from 'expo-image-picker';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      avatar: null,
      bDate: '',
      gender: '',
    };
  }
  bs = React.createRef();
  fall = new Animated.Value(1);

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

  handleUpdatae = (avatar, bDate, gender) => {
    const userId = firebase.auth().currentUser.uid;

    db.collection('users').doc(userId).update({
      date_of_birth: bDate,
      gender: gender,
      avatar: avatar,
    });
  };

  handlePickAvatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.setState({
        userData: { ...this.state.userData, avatar: result.uri },
      });
    }
  };
  /*handleClickAvatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({
        userData: { ...this.state.userData, avatar: result.uri },
      });
    }
  };*/

  renderContent = () => (
    <View style={{ backgroundColor: 'white' }}>
      <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 500 }}>
        Upload profile picture
      </Text>
      <TouchableOpacity
        style={[styles.panelButton, { marginTop: 25 }]}
        onPress={() => {}}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          this.handlePickAvatar;
        }}>
        <Text style={styles.buttonText}>Choose from file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.panelButton, { marginBottom: 50 }]}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  render() {
    const { userData, bDate, gender } = this.state;
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints={[300, 0]}
          renderContent={this.renderContent}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => {
              this.bs.current.snapTo(0);
            }}>
            <View
              style={{
                height: 150,
                width: 150,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{ uri: userData ? userData.avatar : null }}
                style={{
                  height: 150,
                  width: 150,
                }}
                imageStyle={{
                  borderRadius: 30,
                  backgroundColor: '#3080FF',
                  borderWidth: 2.5,
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo
                    name="camera"
                    size={40}
                    style={{
                      opacity: 0.4,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Title style={{ fontSize: 27, fontWeight: 'bold', marginTop: 10 }}>
            {userData ? userData.name : 'User Name'}
          </Title>
          <Caption style={{ fontWeight: 'bold', fontSize: 14 }}>
            {userData ? userData.uid : 'User Id'}
          </Caption>
        </View>
        <View style={{ marginLeft: 15, marginRight: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: 500 }}>Bio :</Text>
          <TextInput
            style={styles.textInput}
            placeholder={
              userData && userData.date_of_birth !== ''
                ? userData.date_of_birth
                : 'Date of birth'
            }
            onChangeText={(text) => this.setState({ ...userData, bDate: text })}
            value={bDate}
          />
          <TextInput
            style={styles.textInput}
            placeholder={
              userData && userData.gender !== '' ? userData.gender : 'Gender'
            }
            onChangeText={(text) =>
              this.setState({ ...userData, gender: text })
            }
            value={gender}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textStyle}>
              Mobile number : {userData ? userData.mobile_number : ''}
            </Text>
            <Text style={styles.textStyle}>
              Email : {userData ? userData.email : ''}
            </Text>
          </View>
        </View>
        <View style={styles.buttonStyle}>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              if (bDate == '' && gender == '') {
                alert('Fill the fields!!!');
              } else {
                this.handleUpdatae(userData.avatar, bDate, gender);
                this.setState({ bDate: '', gender: '' });
                alert('Updation is successful!!!');
              }
            }}>
            <Text style={[styles.buttonText, { paddingHorizontal: 13 }]}>
              Update
            </Text>
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
    borderRadius: 15,
    marginTop: 10,
    padding: 20,
    fontSize: 18,
    fontWeight: 500,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 15,
  },
  buttonStyle: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelButton: {
    padding: 7.5,
    borderRadius: 10,
    backgroundColor: '#3080FF',
    alignItems: 'center',
    marginVertical: 7,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
