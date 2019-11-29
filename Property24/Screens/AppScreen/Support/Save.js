import React,{Component} from "react";
import {Text,StatusBar,Dimensions,ScrollView,Slider,Image,Platform,StyleSheet,TextInput,Button,View,TouchableOpacity} from "react-native";
import {createStackNavigator,StackNavigator} from "react-navigation";
import Logo from "../../SupportScreens/Logo";
import List from "./List";
import AddImage from "./AddImage";
import Modall, { ModalFooter,ModalTitle, ModalButton, ModalContent } from 'react-native-modals';
import Empty from "./Empty";
import axios from "axios";
import Modal from "react-native-modalbox";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";

const items=[
  {name: "House",
  id:"House"},
  {name: "Apartment",
  id:"Apartment"},
  {name: "Townhouse",
  id:"Townhouse"},
  {name: "Vacant Land",
  id:"Vacant Land"},
  {name: "Farm",
  id:"Farm"},
  {name: "Commercial",
  id:"Commercial"},
  {name:  "Industrial",
  id:"Industrial"}
]
export default class Saved extends React.Component{
    constructor(props){
        super(props);
        this.state={
          agenName:this.props.navigation.state.params.data.agent["firstName"]+" "+this.props.navigation.state.params.data.agent["lastName"],
            array:[],
            id:"",
            Modalproperties: [],
            modalAddress:"",
            ModalimageUrl: "",
            Modalprice: 0,
            token: this.props.navigation.state.params.data.token,

            showAlert:false,
            message:"",
            showCancelButton:null,
            showConfirmButton:null,
            cancelText:"",
            confirmText:"",
            visible:false

        }
        this.showEditModal=this.showEditModal.bind(this);
        this.method=this.method.bind(this)
        this.delete=this.delete.bind(this),
        this.save=this.save.bind(this)
        this.goToHome=this.goToHome.bind(this)
      }
delete(arg){
        
        this.setState({
          visible:true,
          id:arg

        })
}

goToHome(){
  this.props.navigation.navigate("Home")
}
ShowList(show,deleteFun){
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
                             <TouchableOpacity  onPress={()=>{show(item["_id"])}} style={styles.socialBarButton} >
                                 <View>
                                     <Image style={styles.icon} source ={require("../../../images/icons8-edit-64.png")} />
                                     <Text>Edit</Text>
                                 </View>
                             </TouchableOpacity>
                         </View>
                         <View style={styles.socialBarSection}>
                             <TouchableOpacity onPress={()=>{deleteFun(item["_id"])}} style={styles.socialBarButton}>
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
          return(<View style={{justifyContent:"center",flex:1}}><Empty goToHome={this.goToHome}/></View>)
        }
        else{
            return(<ScrollView>
              {data}
              <View style={{paddingBottom:5}}/>
          </ScrollView>)
          }
        //console.log(data); <Text onPress={}>Click</Text>
        }
        method(){
          this.state.modalAddress
          }
          showEditModal=(arg)=>{
            
            axios.get('https://hosting-property-clone.herokuapp.com/properties/'+arg).then(res =>{
              console.log(res)
              var prop = res.data["name"].split(",")
                    if(prop.length==1){
                        prop[0]=prop[0].replace(",","")
                    }
                    var pri = res.data["price"]
    
                    pri=parseInt(pri.replace("R ",""))
                    this.setState({
                            response:res,
                            id: res.data["_id"],
                            agent: res.data["agent"],
                            Modalproperties: prop,
                            modalAddress:res.data["location"],
                            ModalimageUrl: res.data["imageUrl"],
                            Modalprice:pri
                    })
              this.setState({
                  
                  
                })
          })
          this.refs.editModal.open();
          
    //console.log(arg)
            // this.props.navigation.navigate("Edit",{agent:arg});
          }
    save(){
      this.closeModal
      axios.put('https://hosting-property-clone.herokuapp.com/properties/'+this.state.id,{

                    "agent": this.state.agenName,
                    "name": this.state.Modalproperties+"",
                    "location": this.state.modalAddress,
                    "imageUrl": this.state.ModalimageUrl,
                    "price": "R "+this.state.Modalprice
                },{
                    "headers": {
                    'Content-Type': 'application/json;charset=UTF-8',
                    Authorization:"Bearer "+this.state.token
                    }
                
                }).then(res =>{
                  this.closeModal()
                })
                .catch(error =>{
                    console.log(error)
                   
                })
    }
    onSelectedItemsChange = (selectedItems) => {
            this.setState({ modalAddress:selectedItems });    
            };
    closeModal=()=>{
          this.refs.editModal.close();
        }
    getList(){
         
          axios.get('https://hosting-property-clone.herokuapp.com/properties/search/'+this.state.agenName).then(res =>{
          
            this.setState({array:res.data})
        })
      }
    render(){
     /* <Text onPress={()=>{return(this.showAlert("Do you want to delete?",true,true,"Yes! I'm sure","No, don't delete!","Alert"))}}>Clicked</Text>*/
     let dropDown =(
      <View style={{backgroundColor:"#bcbcbc",borderColor:"#E0E0E0",borderWidth:1}}>
              <View style={{borderWidth:7,borderColor:"#E0E0E0",backgroundColor:"#E0E0E0"}}>
                  <View style={{borderRadius:10,borderWidth:1,backgroundColor:"#ffffff",borderColor:"#ffffff"}}>
                      <SectionedMultiSelect
                      items={items}
                      uniqueKey="id"
                      selectText="Select Property type\name"
                      showDropDowns={true}
                      showCancelButton={true}
                      showRemoveAll={true}
                      hideSearch={true}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={this.state.Modalproperties}
                      colors={{selectToggleTextColor:"#B0B0B0"}}
                      />
                  </View>
              </View>
          </View>
      ) 
    
     return(
            <View style={styles.container}>
                <Logo/>
                {
                 this.ShowList(this.showEditModal,this.delete)
                }
                <Modal ref={"editModal"} transparent={true} swipeToClose={false} style={{backgroundColor:"#455a64",borderRadius:Platform.OS==="ios" ? 30:0, shadowRadius:10}} backdrop={true}>
                  <Logo/>
                  
                  <Text style={{textAlign:"center", backgroundColor: "#00BFFF",color:"#ffffff"}}>Edit</Text>
                  <View style={{flex:1,marginLeft:5,marginRight:5}}> 
                    <ScrollView>
                            <Text style={{color:"#ffffff",fontSize:20,textAlign:"center"}}>{this.state.modalAddress}</Text>
                            {dropDown}
                            <View style={{borderWidth:10,borderColor:"#E0E0E0",marginTop:5}}>
                              <Image style={styles.CardImage}   source={{uri: this.state.ModalimageUrl}} />
                            </View>
                                <View style={{marginLeft:10,marginRight:10,alignItems:"center",marginTop:20}}>
                                        <Text style={{color:"white",fontSize:20}}>Price: R {this.state.Modalprice}</Text>
                                        <Slider style={styles.sliderBar} minimumValue={250000} maximumValue={2000000} step={10000} value={this.state.Modalprice} onValueChange={(Modalprice)=>this.setState({Modalprice})} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000"/>					
                                </View>

                                <View style={{alignItems:"center"}}>
                                    <TouchableOpacity onPress={this.save} style= {styles.button}>
                                                <Text style={styles.buttonText} >Save</Text>
                                    </TouchableOpacity>
                                </View>
                    </ScrollView>
                    </View>      
                    <View style={styles.cardFooter}>
                                <View style={styles.socialBarContainer} > 
                                    <View style={styles.socialBarSection} >
                                        <TouchableOpacity  onPress={this.closeModal} style={styles.socialBarButton} >
                                            <View>
                                                <Image style={styles.icon} source ={require("../../../images/icons8-close-window-50.png")} />
                                                <Text>Cancel</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.socialBarSection}>
                                        <TouchableOpacity onPress={()=>{this.delete(this.state.id)}} style={styles.socialBarButton}>
                                            <View>
                                                <Image style={styles.icon} source ={require("../../../images/icons8-trash-50.png")}/>
                                                <Text>Delete</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>  
                </Modal>
                <Modall
                        visible={this.state.visible}
                        modalTitle={<ModalTitle title="Alert" />}
                        footer={
                          <ModalFooter>
                            <ModalButton
                              text="No, don't delete!"
                              onPress={() => {
                                this.setState({
                                  visible:false
                                })
                              }}
                            />
                            <ModalButton
                              text="Yes! I'm Sure"
                              onPress={() => {
                                
                                axios.delete('https://hosting-property-clone.herokuapp.com/properties/'+this.state.id,{
                                      "headers": {
                                      'Content-Type': 'application/json;charset=UTF-8',
                                      Authorization:"Bearer "+this.state.token
                                      }
                                  
                                  }).then(res =>{
                                    this.setState({
                                      visible:false
                                    })
                                    this.closeModal()
                                  })
                                  .catch(error =>{
                                    this.setState({
                                      visible:false
                                    })
                                    this.closeModal()
                                    
                                  })
                              }}
                              
                              

                            />
                          </ModalFooter>
                        }
                  >
              <ModalContent>
                <Text>Are you sure you want to delete this property?</Text>
              </ModalContent>
            </Modall> 
            </View>
        )
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
        borderColor:"#ffffff",        
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
})