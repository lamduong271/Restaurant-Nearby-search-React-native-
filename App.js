import React from 'react';
import { MapView } from 'expo';
import{StyleSheet,View, TextInput, Button,Alert} from "react-native";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      textInput:"",
      latitude: 60.200692,
      longitude: 24.934302,
      restaurantList:[]
    }
  }
  onShow=()=>{
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+this.state.textInput+'&key=AIzaSyCS-Q2QnDSuvpE2OL7CLa6_iArG-AuZYUw';
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      const urlDetail = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+responseJson.results[0].geometry.location.lat+','+responseJson.results[0].geometry.location.lng+'&radius=500&type=restaurant&key=AIzaSyCS-Q2QnDSuvpE2OL7CLa6_iArG-AuZYUw';
      fetch(urlDetail)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          restaurantList:responseJson.results
        })
     
        })
        .catch((error) => {
        Alert.alert("wrong");
        });
   
      })
      .catch((error) => {
      Alert.alert("wrong");
      }); 
}
  render() {
    var restaurantList=this.state.restaurantList;
    var renderList=restaurantList.map((value,index)=>{
      return (
        <MapView.Marker
        key={index}
        coordinate={{
          latitude:value.geometry.location.lat,
          longitude:value.geometry.location.lng
        }} title="Haaga"
        ></MapView.Marker>
      );
    })
    return (
      <View>
      <MapView
        style={{ height: "85%" }}
        initialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: Math.max(0,this.state.latitude),
          longitudeDelta: Math.max(0,this.state.longitude)
        }}>
        {renderList}
        </MapView>
      <View style={{height:"15%"}}>
      <TextInput style={styles.textStyle} value={this.state.textInput} onChangeText={(text)=>this.setState({textInput:text})}/>
      <View style={{width:"100%", backgroundColor:"pink",height:50}}><Button onPress={this.onShow} color="black" title="Show"></Button></View>
      
      </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
    height:50,
    width:"100%",
    borderWidth:1,
    borderColor:"pink",
    marginTop:20,
    marginBottom:20
  }
});
