import React,{Component} from "react";
import {Text,StatusBar,Dimensions,Image,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";

export default class Empty extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        return(

            
            <View style={{alignItems:"center",justifyContent:"center",position:"absolute",height: Dimensions.get('window').height,width: Dimensions.get('window').width}}>
                <View style={{flexDirection:"row",justifyContent:"center",backgroundColor:"rgba(255,255,255,0.3)",borderRadius:10,width:180}}>
                    <Text style={{fontSize:15,color:"#ffffff"}}>{"No Properties at the moment!"}</Text>
                </View>
                    <Image style={{alignItems:"center",width:250,height: 250}} source ={require("../../../images/1c6716b235863cb53f9b3dbd3aa36ab8-red-circle-question-mark-icon-by-vexels.png")}/>
                
                <View style={{flexDirection:"row",justifyContent:"center",backgroundColor:"rgba(255,255,255,0.3)",borderRadius:10,width:200}}>
                    <Text style={{fontSize:15,color:"#ffffff"}}>{"To create a property click "}</Text>
                    <TouchableOpacity onPress={this.props.Home()}>
                        <Text style={{fontSize:15,color:"#006bb3"}}>{"here"}</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:15,color:"#ffffff"}}>{" !"}</Text>
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