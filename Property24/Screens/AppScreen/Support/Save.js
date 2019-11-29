import React,{Component} from "react";
import {Text,StatusBar,Dimensions,ScrollView,Slider,Image,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import {createStackNavigator,StackNavigator} from "react-navigation";
import Logo from "../../SupportScreens/Logo";
import List from "./List";
import AddImage from "./AddImage";
import Empty from "./Empty";
import axios from "axios";
import Modal, {ModalTitle,ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

export default class Saved extends React.Component{
    constructor(props){
        super(props);
        this.state={
            agenName:this.props.navigation.state.params.data.agent["firstName"],
            array:[],
            id:"",
            visible: false,
        }
        this.showEditModal=this.showEditModal.bind(this);
        this.setPropId=this.setPropId.bind(this);
    }
    getList(){
        axios.get('https://hosting-property-clone.herokuapp.com/properties/search/'+this.state.agenName).then(res =>{
        
          this.setState({array:res.data})
      })
    }
    showEditModal=()=>{
        this.props.navigation.navigate("Edit",this.state.id);
      }
    closeModal=()=>{
      this.refs.editModal.close();
    }
    setPropId(PropId){
        this.setState({
          id:PropId
        })
      }
    ShowList(show,fun){
        this.getList()
         /* var list =this.state.array.services.map()*/
        let jsonData = this.state.array
        let data = jsonData.map(function(item) {
          return(
            
            <View key={item["_id"]}> 
            <View style={styles.card,{borderColor:"#ffffff",borderLeftWidth:5,borderRightWidth:5,borderTopWidth:5,marginTop: 5,}}>
                 <View style={styles.cardHeader}>
                 <View>
                          <Text style={styles.Propertyname}>{""+item["name"]}</Text>
                          <Text style={styles.locationText}>{""+item["location"]}</Text>
                          <TouchableOpacity>
                          </TouchableOpacity>
                  </View>
                 </View>
                <Image style={styles.CardImage}   source={{uri: item["imageUrl"]}} />
              <Text style={styles.priceText}>{""+item["price"]}</Text>
             </View>
             <View style={styles.cardFooter}>
                     <View style={styles.socialBarContainer} > 
                         <View style={styles.socialBarSection} >
                             <TouchableOpacity  onPress={()=>{show(),fun(item["_id"])}} style={styles.socialBarButton} >
                                 <View>
                                     <Image style={styles.icon} source ={require("../../../images/icons8-edit-64.png")} />
                                     <Text>Edit</Text>
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
                 
         </View>
            /*key: item["_id"],
            address: item["name"]*/
        );
        });
    
        if(data.length<1){
          return(<View style={{justifyContent:"center",flex:1}}><Empty/></View>)
        }
        else{
            return(<ScrollView>
              {data}
              <View style={{paddingBottom:5}}/>
          </ScrollView>)
          }
        //console.log(data); <Text onPress={}>Click</Text>
        }
    render(){
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
        return(
            <View style={styles.container}>
                 <TouchableOpacity>
                <Logo/>
                </TouchableOpacity>
                {
                 this.ShowList(this.showEditModal,this.setPropId)
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
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
        paddingTop: 12.5,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        borderColor:"#ffffff",
        borderLeftWidth:5,
        borderRightWidth:5
        
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