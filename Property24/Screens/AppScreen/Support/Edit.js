import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {createStackNavigator,StackNavigator, ScrollView} from "react-navigation";
import Logo from "../../SupportScreens/Logo";
import Search from "./Search";
import Dropdown from "./Dropdown";
import AddImage from "./AddImage";
import axios from "axios";
import Modal from "react-native-material-dropdown" 
import AwesomeAlert from 'react-native-awesome-alerts';
import Profile from "./Profile";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { Reducer } from "react-native-router-flux";

const items=[
    {name: "House",
    id:"House"},
    {name: "Apartment",
    id:"Apartment"},
    {name: "Townhouse",
    id:"Townhouse"},
    {name: "Vacant Land",
    id:"Vacant Land"},
    {name: "Farm",
    id:"Farm"},
    {name: "Commercial",
    id:"Commercial"},
    {name:  "Industrial",
    id:"Industrial"}
]
export default class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        agent:""/*this.props.navigation.state.params.data.agent["firstName"]+" "+this.props.navigation.state.params.data.agent["lastName"]*/,
        address:"",
        properties:[],
        imageURL:"",
        price:0,
        showAlert: false,
        message:"",
        token:""/*this.props.navigation.state.params.data.token*/,
        message:"",
        response:null

        }
    }
    getPreData(){
      axios.get('https://hosting-property-clone.herokuapp.com/properties/'+this.props.navigation.state.params["agent"], {
              
              }).then(res =>{
                  console.log(res)
                  this.setState({
                          address: res.data["location"],
                  })
              })
              .catch(error =>{
                  console.log(error)
                  this.setState({
                      showAlert: true,
                      message:"Property already exists!"
                  });
              })
  }
render(){
        let SearchBar = (
        <View>
                <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                fetchDetails={true}
                returnKeyType={'string'}
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

                var data = details;
                this.getAdd(data);
                }}
                query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyBnghjKCGZfylLUWssl8SQbM8ILGeYW5l0',
                language: 'en',
                types: 'geocode', // default: 'geocode'
                }}
                  getDefaultValue={() => {
                    return ""; // text input default value	            return ""; // text input default value
                  }}
                listViewDisplayed="false"
                styles={{
                    textInputContainer: {
                    width: '100%'
                    },
                    description: {
                    fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                    color: '#1faadb'
                    }
                }}

                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                // predefinedPlaces={[]}

                predefinedPlacesAlwaysVisible={true}
                />
        </View>
        )
            return (
                <View style = {styles.container}>
                    <Logo/>
                    <Text style={{textAlign:"center", backgroundColor: "#00BFFF",color:"#ffffff"}}>Edit</Text>
                    <ScrollView>
                        {SearchBar}
                    </ScrollView>
                </View>
                );
            }
}

const styles = StyleSheet.create({container: {
    backgroundColor: "#455a64",
    flex: 1,
},
button:{
    width:300,
    backgroundColor:"#455a64",
    borderWidth:2,
    borderColor:"#ffffff",
    borderRadius: 25,
    marginVertical:10,
    paddingVertical:16,
},
buttonText:{
    fontSize:16,
    fontWeight: "500",
    color: "#ffffff",
    textAlign: "center"
},
sliderBar:{
    width:"100%",
    marginRight:20,
    marginLeft: 20
},footer:{
    height:50,
    backgroundColor:"#ffffff",
    flexDirection:"row",
    justifyContent:"space-evenly",
    position:"absolute",
    bottom:0,
    width:Dimensions.get("window").width
  }, icon: {
    width:25,
    height:25,
  },card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    height:300,
    
    
  },
  cardHeader:{
    paddingVertical:17,
    paddingHorizontal: 16,
    borderTopLeftRadius:1,
    borderTopRightRadius:1,
    flexDirection: "row",
    justifyContent:"space-between",
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
      
  },
  CardImage:{
    flex: 1,
    height: 230,
    width: null,
  },
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor:"#ffffff",
    paddingTop:10,
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    marginTop: 20,
  },
  Propertyname:{
      fontSize:20,
      fontWeight: 'bold',
      color:"#ffffff"
  },
  locationText:{
    fontSize:17,
    color: "#dddddd",
    marginTop: 5
  },
  priceText:{
    fontSize:40,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"#ffffff"
  }
})