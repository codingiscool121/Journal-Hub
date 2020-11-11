import React from 'react';
import { StyleSheet, Text, View ,FlatList,ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config'

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };
  
  retrieveStories=()=>{
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              allStories.push(doc.data())
          })
          this.setState({allStories})
        })
    }
  

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allStories.filter((item)=> {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData);
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View style ={styles.container}>
           <Header 
                backgroundColor = {'lightblue'}
                centerComponent = {{
                    text : 'Journal Hub-Search',
                    style : { color: 'white', fontSize: 20}
                }}
            />
          <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Search for a entry here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>
          
          <ScrollView>
              <View>
                {
                  this.state.search === "" ? 
                    this.state.allStories.map((item)=>(
                      <View style={{borderColor:'turquoise',borderWidth:2,padding:10,alignItems:'center',margin:30}}>
                        <Text>
                          Title : {item.title}
                        </Text>
                        <Text>
                          Author : {item.author}
                        </Text>
						<Text>
							Story: {item.storyText};
						</Text>
                      </View>
                    ))
                  :
                  this.state.dataSource.map((item)=>(
                    <View style={{borderColor:'turquoise',borderWidth:2,padding:20,alignItems:'center',margin:30}}>
                      <Text>
                       Title : {item.title}
                      </Text>
                      <Text>
                       Author : {item.author}
                      </Text>
					  <Text>
						  Story: {item.storyText};
					  </Text>
                    </View>
                  ))
                }
              </View>
          </ScrollView> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'lightblue',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'turquoise',
    justifyContent:'center',
    alignSelf: 'center',
  }
});