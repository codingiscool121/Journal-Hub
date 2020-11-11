import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {Header} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config'
import Login from './Login';

export default class WriteStoryScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            storyText: '',
            emailId:""
        }
    }

    submitStory = ()=>{
    //   console.log(db.collection("stories"))
        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            storyText: this.state.storyText,
            //date: firebase.firestore.FieldValue.serverTimestamp().now().toDate()
        })
        this.setState({
            title: '',
            author: '',
            storyText: ''
        })
    }

  signOut=()=>{
      const signout=firebase.auth().signOut()
      if(signout){
        this.props.navigation.navigate('login');
        alert("You have been succesfully signed out of Journal Hub, and are now being redirected back to the login page.")
      }else{
          alert("We could not sign you out.");
      }
  }
    render(){
        return(
               <KeyboardAvoidingView>
                <Header 
                    backgroundColor = {'lightblue'}
                     centerComponent = {{
                        text : 'Journal Hub',
                        style : { color: 'white', fontSize: 30}
                    }}
                />
                {/* <KeyboardAvoidingView style={styles.container}> */}
                <TextInput 
                    placeholder="Entry Title..."
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            title: text
                        })
                    }}
                    value={this.state.title}
                    style={styles.title}/>
                    {/* </KeyboardAvoidingView> */}

                    {/* <KeyboardAvoidingView style={styles.container}> */}
                <TextInput
                    placeholder="Author"
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            author: text
                        })
                    }}
                    value={this.state.author}
                    style={styles.author} />
                    {/* </KeyboardAvoidingView> */}

              <KeyboardAvoidingView styles={styles.container}>
                <TextInput 
                    placeholder="Write your entry..."
                    placeholderTextColor='black'
                    onChangeText= {(text)=>{
                        this.setState({
                            storyText: text
                        })
                    }}
                    value={this.state.storyText}
                    style={styles.storyText}
                    multiline={true}/>
                    </KeyboardAvoidingView>
                    
                    <TouchableOpacity
                       style={styles.submitButton}
                    onPress={this.submitStory}
                   >
                    <Text style={styles.buttonText}>Submit</Text>

                </TouchableOpacity>
                <TouchableOpacity
                style={styles.signOut}
                onPress={this.signOut}
               >
                <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                
                </KeyboardAvoidingView>
        );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title:{
      height: 40,
      borderWidth: 2,
      marginTop: 40,
      margin: 10,
      color:'black',
      padding: 6,

  },
  author: {
      height: 40,
      borderWidth: 2,
      margin: 10,
       padding: 6,
  },
  storyText: {
      height: 250,
      borderWidth: 2,
      margin: 10, 
      padding: 6,
  },
  submitButton:{
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'turquoise',
      width: 80,
      height: 40,color:'black',
  },
  buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
      color:'black',
  },

  signOut:{
      justifyContent: 'center',
      alignSelf:'center',
      backgroundColor:'#ffcccb',
      fontWeight:'bold',
      color:'black',
      width:80,
      height:40, color:'black',
  }
});