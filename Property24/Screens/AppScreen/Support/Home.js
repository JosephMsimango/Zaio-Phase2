import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {createStackNavigator,StackNavigator, ScrollView} from "react-navigation";
import {GoogleAutoComplete} from "react-native-google-places-autocomplete";
import Logo from "../../SupportScreens/Logo";
import Search from "./Search";
import Dropdown from "./Dropdown";
import AddImage from "./AddImage";
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            agent:this.props.navigation.state.params.data.agent["firstName"]+" "+this.props.navigation.state.params.data.agent["lastName"],
            properties:[],
            address:"",
            imageURL:"",
            price:0,
            showAlert: false,
            message:"",
            token:this.props.navigation.state.params.data.token
            
        }
    this.setaddress=this.setaddress.bind(this);
    this.setproperties=this.setproperties.bind(this);
    this.save=this.save.bind(this);
    this.openCamera=this.openCamera.bind(this);
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
    openCamera(){
        //return(<AddImage/>)
        this.setState({
            showAlert: true,
            message:"This feature is not available at the moment, please continue!"
          });
    }
    setaddress(arg){
        this.setState({address:arg})
    }
    setproperties(arg){
        this.setState({properties:arg})
    }
    save(){
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
                        "imageUrl":"https://si.wsj.net/public/resources/images/B3-DM067_RIGHTS_IM_20190319162958.jpg",
                        "price": "R "+this.state.price
            
                    },{
                        "headers": {
                        'Content-Type': 'application/json;charset=UTF-8',
                        Authorization:"Bearer "+this.state.token
                        }
                    
                    }).then(res =>{
                        this.props.navigation.navigate("Saved");
                    })
                    .catch(error =>{
                        this.setState({
                            showAlert: true,
                            message:"An error occured! Please try again later!"
                        });
                    })
                  //  this.props.navigation.navigate("Saved");
        }
    }
    
    render(){
        //console.log(this.state.token+"")
        return(

            <View style = {styles.container}>
                <Logo/>
                <Text style={{textAlign:"center", backgroundColor: "#00BFFF",color:"#ffffff"}}>Create</Text>
                <ScrollView>
                <View style={{ marginRight:5, marginLeft:5}}> 
                <View>
                    <Search setaddress={this.setaddress}/>
                </View>
                
                <View  style={{marginTop:5,marginBottom:5}}>
                    <Dropdown setproperties={this.setproperties}/> 
                </View>
                
                <View>
                    <TouchableOpacity onPress={this.openCamera}>
                        <Image style={{borderWidth:10,borderColor:"#E0E0E0",width:null,height: 210}} source ={require("../../../images/image.png")}/>
                    </TouchableOpacity>
                </View>
                <View style={{marginLeft:10,marginRight:10,alignItems:"center",marginTop:20}}>
                        <Text style={{color:"white",fontSize:20}}>Price: R {this.state.price}</Text>
                        <Slider style={styles.sliderBar} minimumValue={0} maximumValue={1000000} step={100} value={this.state.price} onValueChange={(price)=>this.setState({price})} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>					
                </View>

                 <View style={{alignItems:"center"}}>
                    <TouchableOpacity onPress={this.save} style= {styles.button}>
                                <Text style={styles.buttonText} >Save</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </ScrollView>
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
                                cancelText=""
                                confirmText="Okay"
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
    }
      
      
});