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
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal, { ModalFooter,ModalTitle, ModalButton, ModalContent } from 'react-native-modals';
import Profile from "./Profile";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

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
export default class Home extends Component {
    constructor(props) {
            super(props);
            this.state = {
            agent:this.props.navigation.state.params.data.agent["firstName"]+" "+this.props.navigation.state.params.data.agent["lastName"],
            address:"",
            properties:[],
            imageURL:"",
            price:0,
            showAlert: false,
            message:"",
            token:this.props.navigation.state.params.data.token,
            message:""
            }
        }
showAlert = () => {
            this.setState({
              showAlert: true
            });
          };
         
hideAlert = () => {
            this.setState({
              showAlert: false
            });
          };
getAdd(data){
   // console.log("add",data);
    this.setState(
        {
          address: data.formatted_address+"", // selected address
        }
      );
    }
save=()=>{
    if(this.state.address==""){
        this.setState({
            showAlert: true,
            message:"Please fill in all fields to create a property!"
          });
    }
    else if(this.state.properties==[]){
        this.setState({
            showAlert: true,
            message:"Please fill in all fields to create a property!"
          });
    }

    else if (this.state.price==0){
        this.setState({
            showAlert: true,
            message:"Please fill in all fields to create a property!"
          });
    }
    else{
        
        axios.post('https://hosting-property-clone.herokuapp.com/properties', {
                    
                    "agent": this.state.agent,
                    "name": this.state.properties+"",
                    "location": this.state.address,
                    "imageUrl": "https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg",
                    "price": "R "+this.state.price
                },{
                    "headers": {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization:"Bearer "+this.state.token
                    }
                
                }).then(res =>{
                    //this.props.navigation.navigate("ModalView",{agentName:this.state.agent});
                    this.setState({
                      address:"",
                      properties:[],
                      price:0
                    })
                    this.props.navigation.navigate("Saved",{agentName:this.state.agent+""});
                })
                .catch(error =>{
                    console.log(error)
                    this.setState({
                        showAlert: true,
                        message:"Property already exists!"
                    });
                })
              //  this.props.navigation.navigate("Saved");
    }
    }
onSelectedItemsChange = (selectedItems) => {
    this.setState({ properties:selectedItems });    
  };
render(){
let dropDown =(
    <View style={{backgroundColor:"#bcbcbc",borderColor:"#E0E0E0",borderWidth:1}}>
            <View style={{borderWidth:7,borderColor:"#E0E0E0",backgroundColor:"#E0E0E0"}}>
                <View style={{borderRadius:10,borderWidth:1,backgroundColor:"#ffffff",borderColor:"#ffffff"}}>
                    <SectionedMultiSelect
                    items={items}
                    uniqueKey="id"
                    selectText="Select Property type\name"
                    showDropDowns={true}
                    showCancelButton={true}
                    showRemoveAll={true}
                    hideSearch={true}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={this.state.properties}
                    colors={{selectToggleTextColor:"#B0B0B0"}}
                    />
                </View>
            </View>
        </View>
)
let SearchBar = (
    <View>
    <GooglePlacesAutocomplete
    placeholder='Search'
    minLength={2} // minimum length of text to search
    autoFocus={false}
    fetchDetails={true}
    returnKeyType={'default'}
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
            <Text style={{textAlign:"center", backgroundColor: "#00BFFF",color:"#ffffff"}}>Create</Text>
            <ScrollView>
                {SearchBar}
                <View  style={{marginTop:5,marginBottom:5}}>
                    {dropDown} 
                </View>
                <TouchableOpacity onPress={this.openCamera}>
                        <Image style={{borderWidth:10,borderColor:"#E0E0E0",width:null,height: 210}} source ={require("../../../images/image.png")}/>
                </TouchableOpacity>
                <View style={{marginLeft:10,marginRight:10,alignItems:"center",marginTop:20}}>
                        <Text style={{color:"white",fontSize:20}}>Price: R {this.state.price}</Text>
                        <Slider style={styles.sliderBar} minimumValue={250000} maximumValue={20000000} step={10000} value={this.state.price} onValueChange={(price)=>this.setState({price})} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>					
                </View>

                 <View style={{alignItems:"center"}}>
                    <TouchableOpacity onPress={this.save} style= {styles.button}>
                                <Text style={styles.buttonText} >Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
           
            <Modal
                        visible={this.state.showAlert}
                        footer={
                          <ModalFooter>
                            <ModalButton
                              text="Okay"
                              onPress={() => {
                                this.setState({
                                  showAlert:false
                                })
                              }}
                            />
                          </ModalFooter>
                        }>
              <ModalContent>
                      <Text>{this.state.message}</Text>
              </ModalContent>
            </Modal>
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
}
  
  
});