import React,{Component} from "react";
import {Text,StatusBar,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import {createStackNavigator,StackNavigator, createAppContainer} from "react-navigation";
import Logo from "../../SupportScreens/Logo";
import {withNavigation} from "react-navigation"; 
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from "../Support/Profile";
import Home from "../Support/Home"
import Save from "../Support/Save";

Tabnavigator = createBottomTabNavigator({

    Home:{  
        screen:Home,  
        navigationOptions:{  
          tabBarLabel:'Home',  
          tabBarIcon:({tintColor})=>(  
              <Icon name="ios-home" color={tintColor} size={25}/>  
          )  
        }  
      }, 
      Saved:{  
        screen:Save,  
        navigationOptions:{  
          tabBarLabel:'Saved',  
          tabBarIcon:({tintColor})=>(  
              <Icon name="ios-heart" color={tintColor} size={25}/>  
          )  
        }  
      }, 
      Profile:{  
        screen:Profile,  
        navigationOptions:{  
          tabBarLabel:'Profile',  
          tabBarIcon:({tintColor})=>(  
              <Icon name="ios-person" color={tintColor} size={25}/>  
          )  
        }  
      }, 
},
{  
    initialRouteName: "Home"  
  },  
);
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#455a64",
        flex: 1,
      },
      
      
});
export default createAppContainer(Tabnavigator);