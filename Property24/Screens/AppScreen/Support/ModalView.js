import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {createStackNavigator,StackNavigator, ScrollView} from "react-navigation";
import {GoogleAutoComplete} from "react-native-google-places-autocomplete";
import Search from "./Search";
import Modal from "react-native-modalbox";
import Dropdown from "./Dropdown";
import ModalDropdown from "./ModalDropdown";
import ModalSearch from "./ModalSearch";
import List from "./List";
import axios from "axios"


export default class ModalView extends React.Component{
        constructor(props){
          super(props);
          this.state={
            sliderValue:0,
            id:"",
            address:"",
            properties:[],
            imageUrl:"",
            sliderValue:0
          }
          this.showEditModal=this.showEditModal.bind(this);
          this.setSearch=this.setSearch.bind(this);
          this.setDrop=this.setDrop.bind(this);
          this.goToHome=this.goToHome.bind(this);
          this.setaddress=this.setaddress.bind(this);
          this.propertiesFromDrop=this.propertiesFromDrop.bind(this)
        }

        showEditModal(idProp){
            this.setState({id:idProp+""})
            this.refs.editModal.open();
          }
        closeModal=()=>{
          this.refs.editModal.close();
        }
        goToHome(){
          return(this.props.goToHome)
        }

        setaddress(arg){
          console.log(arg)
              this.setState({address:arg})
        }
        propertiesFromDrop(arg){
          console.log(arg)
              this.setState({properties:arg})
        }
        getAPIData(){
          axios.get('https://hosting-property-clone.herokuapp.com/properties/5ddef545fc7a730004f3dd08').then(res =>{
            let p =res.data["price"]
            let pr =parseInt(p.replace("R ",""))
          this.setState({
              address:res.data["location"],
              properties:  res.data["name"].split(","),
              imageUrl:res.data["imageUrl"],
              sliderValue:pr
          })
            })
            .catch(error =>{
                console.log(error)
            })
        }
        setSearch(){
          return(this.state.address+"")
        }
        setDrop(){
          let arr = this.state.properties;
          if(arr.length==1){
          arr[0]=arr[0].replace(",","")
          return(arr)
          }
          else{
            return(arr)
          }
        }
        render (){
          this.getAPIData()
        let mod =(
          <Modal ref={"editModal"} transparent={true} swipeToClose={false} style={{backgroundColor:"#455a64",borderRadius:Platform.OS==="ios" ? 30:0, shadowRadius:10}} backdrop={true} onClosed={()=>{ alert("edited")}}>
         
          
          </Modal>
        )
        return(

          <View style = {styles.container}>
            {
              mod
            }
          <List showEditMod={this.showEditModal} goToH={this.goToHome}/> 
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
    },
    footer:{
        height:50,
        backgroundColor:"#ffffff",
        flexDirection:"row",
        justifyContent:"space-evenly",
        position:"absolute",
        bottom:0,
        width:Dimensions.get("window").width
      },
      icon: {
        width:25,
        height:25,
      },
       CardImage:{
        flex: 1,
        height:250,
        width: null,
      },
      
      
});