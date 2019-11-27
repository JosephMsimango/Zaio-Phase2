import React,{Component, Fragment} from "react";
import {Text,Image,Dimensions,StatusBar,Slider,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {createStackNavigator,StackNavigator, ScrollView} from "react-navigation";
import {GoogleAutoComplete} from "react-native-google-places-autocomplete";
import Empty from "./Empty";
import axios from "axios"


export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array:[{idNumber:"1",properyName:"House",location:"Sandton,Johannesburg",imageUrl:"https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjuopi59L7lAhWNHRQKHfHQDLEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.curbed.com%2F2019%2F8%2F6%2F20756052%2Fdenver-house-for-sale-cherry-creek-north&psig=AOvVaw2vru_UzZn8qy1DRpg8Ivme&ust=1572350563447303",price: "R 105000",}]
          }
        this.showEditModal=this.showEditModal.bind(this);
        this.goToHome=this.goToHome.bind(this);
    }
    showEditModal=()=>{
        this.props.showEditModal()
    }
    goToHome(){
      return(this.props.goToHome)
    }
    getList(){
      axios.get('https://hosting-property-clone.herokuapp.com/properties').then(res =>{
        console.log(res)
    })
    .catch(error =>{
        this.setState({
            showAlert: true,
            message:"Account already exists!, Please sign in"
        });
    })
    }
    ShowList=()=>{
        this.getList()
        let list =[];
            for(let i=0;i<0;i++){
                list.push(
                    
                    <View>
                       <View style={styles.card,{borderColor:"#ffffff",borderLeftWidth:5,borderRightWidth:5,borderTopWidth:5,marginTop: 5,}}>
                            <View style={styles.cardHeader}>
                            <View>
                                    <Text style={styles.Propertyname}>{"House, Apartment"}</Text>
                <Text style={styles.locationText}>{"23 de Enero,caracas, Capital District, Venezuela"}</Text>
                                </View>
            
                            </View>
                                <Image style={styles.CardImage}  source ={require("../../../images/395_Detroit_St.25_forprintuse.0.jpg")} />
                <Text style={styles.priceText}>{"R488800"}</Text>
                        </View>
                        <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer} > 
                                    <View style={styles.socialBarSection} >
                                        <TouchableOpacity onPress={this.showEditModal} style={styles.socialBarButton} >
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
                    
                )
            }
            //<View style={{justifyContent:"center",flex:1}}><Empty/></View>
            //<View style={{marginBottom:5}}><ScrollView>{list}</ScrollView></View>
          if(list.length<1){
            return(<View style={{justifyContent:"center",flex:1}}><Empty Home={this.goToHome}/></View>)
          }
          else{
            return(<View style={{marginBottom:5}}><ScrollView>{list}</ScrollView></View>)
          }
        }
    render(){
        return(

            <View style = {styles.container}>
                  {this.ShowList()}
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#455a64",
        flex: 1,
        marginRight:5,
        marginLeft:5
        
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
      
      
});