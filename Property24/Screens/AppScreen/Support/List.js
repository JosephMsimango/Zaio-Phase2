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
            array:[],
            id:""
          }
        this.goToHome=this.goToHome.bind(this)
        this.showModal=this.showModal.bind(this)
        this.setPropId=this.setPropId.bind(this)
    }
    getList(){
      axios.get('https://hosting-property-clone.herokuapp.com/properties').then(res =>{
        this.setState({array:res.data})
    })
    .catch(error =>{

    })
    }
    goToHome(){
      return(this.props.goToH())
    }
    showModal(){
      this.props.showEditMod(this.state.id)
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
      return(<View style={{justifyContent:"center",flex:1}}><Empty goTo={this.goToHome}/></View>)
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
        return(

            <View style = {styles.container}>
               {
                 this.ShowList(this.showModal,this.setPropId)
               }
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#455a64",
        flex: 1,
        marginRight:5,
        marginLeft:5,
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