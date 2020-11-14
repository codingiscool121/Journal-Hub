import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard, TextInput } from 'react-native';
import firebase from 'firebase';
import db from '../config'
import WriteStoryScreen from './WriteStoryScreen';
import { render } from 'react-dom';
import ReadStoryScreen from './ReadStoryScreen'
import { color } from 'react-native-reanimated';

export default class SignUp extends React.Component{
    authUser=async(emailId,password)=>{
        if(emailId && password){
            try {
                const create = await firebase.auth().createUserWithEmailAndPassword(emailId,password)
                // const disabledaccount=await firebase.auth().FirebaseAuthInvalidUserException();
                if(create){
                 this.props.navigation.navigate('login');
                 alert("Hello, " + emailId + ". You have successfully been signed up for Journal Hub, and are now being redirected to the login page. You can sign in with your credentials there.");
                }
            } catch (error) {
                switch(error.code){
                    case 'auth/invalid-email':
                        alert("Your email is invalid, or in an incorrect format. You formatted it like this: "+emailId+". You should format it to be something like example@domain.com.");
                        break;
                }
            }
        }else{
            console.log("Please enter your preferred email address and password to continue.")
            alert("Please enter your preferred email address and password to continue.");
        }
    }
    
    
    render(){
        return(
            <View>
            <Text style={styles.title}> Signup for Journal Hub</Text>
            <TextInput style={styles.loginBox} placeholder="Enter Your Preferred Email" keyboardType='email-address'
            onChangeText={text=>{
                this.setState({
                    emailId:text
                })
            }}
            />
          <TextInput style={styles.loginBox} placeholder="Enter Your Password" secureTextEntry={true}
          onChangeText={text=>{
              this.setState({
                  password:text
              })
          }}
          />
          <TouchableOpacity onPress={()=>{
              const getin=
              this.authUser(
                  this.state.emailId,this.state.password
              )
              if(getin){
                  console.log("got in.")
              }else{
                  alert("Please enter your preferred credentials to continue.")
              }
          }} style={styles.text}>
            <Text>Sign Up</Text>      
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
             this.props.navigation.navigate('login')
          }} style={styles.text}>
            <Text>Back to Login</Text>      
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
            borderColor:"#7DF9FF"
        },
        text:{
            fontSize:30,
            textAlign:"center",
            marginBottom:50,
            alignSelf:"center",
            backgroundColor:'#7DF9FF',
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
            backgroundColor:"black",
            color:"blue"
        }
    })
