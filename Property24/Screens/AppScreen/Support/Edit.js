import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import Logo from "../../SupportScreens/Logo";
import Search from "./Search";
import Dropdown from "./Dropdown";
import AddImage from "./AddImage";
import axios from "axios";
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
string(){
  var ad = this.state.address
  console.log(ad)
    return(ad)
}
getPreData(){
    axios.get('https://hosting-property-clone.herokuapp.com/properties/'+this.props.navigation.state.params["agent"], {
            
            }).then(res =>{
                var prop = res.data["name"].split(",")
                if(prop.length==1){
                    prop[0]=prop[0].replace(",","")
                }
                var pri = res.data["price"]

                console.log(res.data["location"])
                pri=parseInt(pri.replace("R ",""))
                this.setState({
                        response:res,
                        agent: res.data["agent"],
                        properties: prop,
                        address: res.data["location"],
                        imageUrl: res.data["imageUrl"],
                        price: pri
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
    this.getPreData()
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
                  getDefaultValue={() => {
                    return this.string(); // text input default value	            return ""; // text input default value
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
                        <View  style={{marginTop:5,marginBottom:5}}>
                            {dropDown} 
                        </View>
                        <TouchableOpacity onPress={this.openCamera}>
                                <Image style={{borderWidth:10,borderColor:"#E0E0E0",width:null,height: 200}} source ={require("../../../images/image.png")}/>
                        </TouchableOpacity>
                        <View style={{marginLeft:10,marginRight:10,alignItems:"center",marginTop:20}}>
                                <Text style={{color:"white",fontSize:20}}>Price: R {this.state.price}</Text>
                                <Slider style={styles.sliderBar} minimumValue={0} maximumValue={1000000} step={100} value={this.state.price} onValueChange={(price)=>this.setState({price})} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>					
                        </View>

                        <View style={{alignItems:"center"}}>
                            <TouchableOpacity onPress={this.save} style= {styles.button}>
                                        <Text style={styles.buttonText} >Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer} > 
                                    <View style={styles.socialBarSection} >
                                        <TouchableOpacity  onPress={()=>{show(),fun(item["_id"])}} style={styles.socialBarButton} >
                                            <View>
                                                <Image style={styles.icon} source ={require("../../../images/icons8-close-window-50.png")} />
                                                <Text>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity onPress={this.delete} style={styles.socialBarButton}>
                                            <View>
                                                <Image style={styles.icon} source ={require("../../../images/icons8-trash-50.png")}/>
                                                <Text>Delete</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    <View style={{position:"absolute",height: Dimensions.get('window').height,width: Dimensions.get('window').width}}>
                                    <AwesomeAlert
                                        show={this.state.showAlert}
                                        showProgress={false}
                                        title=""
                                        message={this.state.message}
                                        closeOnTouchOutside={true}
                                        closeOnHardwareBackPress={false}
                                        showCancelButton={false}
                                        showConfirmButton={true}
                                        cancelText="Cancel"
                                        confirmText="."
                                        confirmButtonColor="#DD6B55"
                                        onCancelPressed={() => {
                                            this.hideAlert();
                                        }}
                                        onConfirmPressed={() => {
                                            this.hideAlert();
                                        }}
                                        />
                    </View>    
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