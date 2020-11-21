import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import WriteStoryScreen from './WriteStoryScreen';
import { render } from 'react-dom';
import ReadStoryScreen from './ReadStoryScreen'
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            emailId:"",
            password:"",
        }
    }
  
    resetPassword=async(emailId)=>{
        const reset = firebase.auth().sendPasswordResetEmail(emailId='emailId');
       if(reset){
           alert("A link has been sent to your account.")
       }else{
           alert("An error occured. Contact codersaregreat119@gmail.com for assistance.")
       }
   }
   

authUser=async(emailId,password)=>{
    if(emailId && password){
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
            // const disabledaccount=await firebase.auth().FirebaseAuthInvalidUserException();
            if(response){
             this.props.navigation.navigate('Write');
             alert("Welcome, " + emailId + ".");
            }
        } catch (error) {
            switch(error.code){
                case 'auth/user-not-found':
                    alert("It appears that you don't have an account with Journal Hub, "+ emailId +". You are being sent to the Sign Up page to create an account. 🧾");
                    this.props.navigation.navigate('signup');
                break;
                case 'auth/invalid-email':
                    alert("Your email is invalid. You should format it to be something like example@domain.com.");
                    break;
                case 'auth/wrong-password':
                    alert("Your password is invalid, "+ emailId + "! Please enter the correct password to continue.")
                    break;
                case 'auth/user-disabled':
                    alert("Your account has been disabled, " + emailId + ". Please contact codersaregreat119@gmail.com for assistance. We are very sorry for the inconvenience.")
            }
        }
    }else{
        alert("It appears that you have not entered a username or password. Please enter them to continue to Journal Hub.");
    }
}


render(){
    return(
        <View>
        <Text style={styles.title}> Login To Journal Hub</Text>
        <TextInput style={styles.loginBox} placeholder="Email(example@domain.com) " keyboardType='email-address'
        onChangeText={text=>{
            this.setState({
                emailId:text
            })
        }}
        />
      <TextInput style={styles.signUp} placeholder="Enter Your Password" secureTextEntry={true}
      onChangeText={text=>{
          this.setState({
              password:text
          })
      }}
      />
      <TouchableOpacity onPress={()=>{
          this.authUser(
              this.state.emailId,this.state.password
          )
      }} style={styles.text}>
        <Text>Login</Text>      
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('signup')
      }} style={styles.text}>
        <Text>Sign Up</Text>    
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={()=>{
          this.props.navigation.navigate('iphone')
      }} style={styles.text}>
        <Text>Sign Up With Iphone</Text>    
      </TouchableOpacity> */}
      <TouchableOpacity onPress={()=>{
       this.resetPassword();
    //   alert("This feature is still in development. If you have forgotten your password, please contact codersaregreat119@gmail.com for assistance. NOTE: WE DO NOT STORE USER PASSWORDS. WE SEND A RESET EMAIL THROUGH A DATABASE, WHICH HANDLES ALL THE DATA. FOR DATA PRIVACY CONCERNS, PLEASE GO TO THE FIREBASE DOCS.")
}} style={styles.text}>
      <Text>Forgot Your Password?</Text>
      </TouchableOpacity>
        </View>
    )
}

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor:'white',
    },
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"#00FFFF"
    },
    text:{
        fontSize:30,
        textAlign:"center",
        marginBottom:50,
        alignSelf:"center",
        backgroundColor:'turquoise',
        height:60,
        width:120,
        paddingTop:13,
        borderWidth:3,
        borderRadius:1,
        justifyContent:"center"
    },

    title:{
        fontSize: 40,
        textAlign:'center',
        alignSelf: 'center',
        color:'#90EE90',
        },

    signUp:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10,
        alignSelf:"center",
        justifyContent: 'center',
        borderColor:"#7DF9FF"
    }
    
})
