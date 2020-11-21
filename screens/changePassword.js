import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';
import firebase from 'firebase';

export default class changePassword extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
    };
  }

  

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      console.log(currentUser);
      user.updatePassword(this.state.newPassword).then(() => {
        alert("Your password was updated.");
      }).catch((error) => { alert("Something went wrong.") });
    })
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        alert("Your email was changed," + currentUser);
      }).catch((error) => { console.log(error.message); alert("To change your email, you have to enter your current password. Your current password is eiher incorrect, or something else went wrong in our servers. Please try reloading.") });
    })
  }
  
  render() {
    return (

      <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
         <Text style={styles.text}>Account Settings ⚙️</Text>
        <TextInput style={styles.textInput} value={this.state.currentPassword}
          placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({currentPassword: text}) }}
        />

        <TextInput style={styles.textInput} value={this.state.newPassword}
          placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
          onChangeText={(text) => { this.setState({newPassword: text}) }}
        />

        <Button title="Change Password" onPress={this.onChangePasswordPress} />

        <TextInput style={styles.textInput} value={this.state.newEmail}
          placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => { this.setState({newEmail: text}) }}
        />

        <Button title="Change Email" onPress={this.onChangeEmailPress} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: { color: "black", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});
