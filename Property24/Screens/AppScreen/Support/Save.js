import React,{Component} from "react";
import {Text,StatusBar,Dimensions,Image,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import {createStackNavigator,StackNavigator} from "react-navigation";
import Logo from "../../SupportScreens/Logo";
import ModalView from "./ModalView";
import List from "./List";
import AddImage from "./AddImage";
import Empty from "./Empty";
export default class Saved extends React.Component{
    
    constructor(props){
            super(props);
            this.state={
                email:"Josephmsimango98@gmail.com",
                password:"12345678",
                feedback:"",
                PassMessage: "",
                message:"",
                showAlert: false,
                account:"",
                num:3
                }
            this.state.customstyles={
                backgroundColor:"red",
                position:"absolute"
             }
             this.goToHome=this.goToHome.bind(this)
        }
    goToHome(){
        this.props.navigation.navigate("Home")
    }
    render(){
        
        return(

            <View style = {styles.container}>
                <TouchableOpacity onPress={this.goToHome}>
                <Logo/>
                </TouchableOpacity>
                <List goToHome={this.goToHome}/>
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#455a64",
        flex: 1,
      },
      Empty:{
        position:"absolute",
        flex:1
      },
      signupTextCont: {

        height: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        paddingVertical: 16,
        position: "absolute",
        bottom: 0,
        width:"100%",
      },
      buttonText:{
        fontSize:16,
        fontWeight: "500",
        color: "#ffffff",
        textAlign: "center"
    }
      
      
});