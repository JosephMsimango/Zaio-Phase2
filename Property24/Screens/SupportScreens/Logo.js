import React,{Component} from "react";
import {Image,Dimensions,Text,StatusBar,Platform,StyleSheet,View} from "react-native";

export default class Logo extends Component{
    render(){
        return(
            <View style={styles.container}> 
                <Image style={{width:Dimensions.get("window").width,height: 80}} source ={require("../../images/Property-24.png")}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{ 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',

    },

});
