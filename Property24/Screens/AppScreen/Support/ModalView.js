import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {createStackNavigator,StackNavigator, ScrollView} from "react-navigation";
import {GoogleAutoComplete} from "react-native-google-places-autocomplete";
import Search from "./Search";
import Modal from "react-native-modalbox";
import Dropdown from "./Dropdown";
import List from "./List";
import ModalDropdown from "./ModalDropdown";
import ModalSearch from "./ModalSearch";


export default class ModalView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            image:"",
            price:0,
            search:"",
            selectedItems:[1,2]
        }
      this.showEditModal=this.showEditModal.bind(this);
      this.setSearch=this.setSearch.bind(this);
      this.setDrop=this.setDrop.bind(this);
    }
    showEditModal=()=>{
        //return(this.refs.editModal.open());
        alert("clicked")
    } 
    closeModal=()=>{
        return(this.refs.editModal.close());
    }

    setSearch(){
      return(this.state.search)
    }
    setDrop(){
      this.state.selectedItems
    }

    render(){
        state={
            sliderValue:0
          };
          let mod =(
              <Modal ref={"editModal"} transparent={true} swipeToClose={false} style={{backgroundColor:"#455a64",borderRadius:Platform.OS==="ios" ? 30:0, shadowRadius:10}} backdrop={true} onClosed={()=>{ alert("edited")}}>
              <Text style={{textAlign:"center", backgroundColor: "#00BFFF",color:"#ffffff"}}>Edit</Text>
            <ScrollView style={{flex:1,marginBottom:50}}> 
              <View >
                 <ModalSearch setSearch={this.setSearch}/>
              </View> 
              <View style={{marginTop:5,marginBottom:5}}>
              <ModalDropdown setDrop={this.setDrop}/>
              </View>
              <Image style={styles.CardImage}  source ={require("../../../images/395_Detroit_St.25_forprintuse.0.jpg")} />
              <View style={{marginLeft:10,marginRight:10,alignItems:"center",marginTop:20}}>
                      <Text style={{color:"white",fontSize:20}}>Price: R {this.state.sliderValue}</Text>
                      <Slider style={styles.sliderBar} minimumValue={0} maximumValue={1000000} step={100} value={this.state.sliderValue} onValueChange={(sliderValue)=>this.setState({sliderValue})} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>					
              </View>
              <View style={{marginBottom:20,alignItems:"center"}}>
                <TouchableOpacity  style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
              </ScrollView>
                <View style={styles.footer}>
                 <View style={{justifyContent:"center",}}> 
                    <TouchableOpacity onPress={this.closeModal} >
                      <Image style={styles.icon}  source ={require("../../../images/icons8-close-window-50.png")} />
                      <Text>Close</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{justifyContent:"center"}}>
                    <TouchableOpacity  style={{justifyContent:"center"}}>
                      <Image style={styles.icon} source ={require("../../../images/icons8-trash-50.png")}/>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              

        )
        return(

            <View style = {styles.container}>
                {mod}
                <List showEditModal={this.showEditModal}/>
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
        height:90,
        width: null,
      },
      
      
});