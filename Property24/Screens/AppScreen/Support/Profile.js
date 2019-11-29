import React,{Component} from "react";
import {Text,Image,StatusBar,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import {createStackNavigator,StackNavigator} from "react-navigation";
import axios from "axios";
import Logo from "../../SupportScreens/Logo";


export default class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Firstname: "",
            Lastname: "",
            Email: "",
            
        }
        this.signout=this.signout.bind(this)
        this.getInfo=this.getInfo.bind(this)
    }
    signout(){
      this.props.navigation.navigate("firstScreen");
    }
    getInfo(){
     axios.get('https://hosting-property-clone.herokuapp.com/agents/'+this.props.navigation.state.params.data.agent["_id"]).then(res =>{
          this.setState({
              Firstname:res.data["firstName"],
              Lastname:  res.data["lastName"],
              Email:res.data["email"],
          })
            })
            .catch(error =>{
                console.log(error)
            })
     
    }
    render(){
       // console.log(this.props.navigation.dangerouslyGetParent().getParam('res'))
       this.getInfo()
       return(
            
            <View style = {styles.container}>
              <Logo/>
              <Image style={styles.avatar} source ={require("../../../images/ProfilePic.png")} />
                    <View style={styles.body}> 
                        <Text style={styles.firstname}>{this.state.Firstname}</Text>
                        <Text  style={styles.lastname}>{this.state.Lastname}</Text>
                        <Text style={styles.email}>{this.state.Email}</Text>
                        <TouchableOpacity onPress={this.signout} style={styles.button}>
                             <Text style={styles.buttonText}>SignOut</Text>
                        </TouchableOpacity>
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
      header:{
        backgroundColor: "#00BFFF",
        height:200,
      },
      buttonText:{
        fontSize:16,
        color: "#ffffff",
        
    },
    button:{
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    borderWidth:4,
    borderColor:"#ffffff",
    backgroundColor: "#00BFFF",
    },
      body:{
        marginTop:150,
        flex:1,
        alignItems:"center",
        padding:30,
      },
      firstname:{
          fontSize:50,
          color:"#FFFFFF",
          fontWeight:"600"
      },
      lastname:{
        color:"#FFFFFF",
      },
      email:{
          color:"#00BFFF",
      }
      ,
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130,
      },
    });
     