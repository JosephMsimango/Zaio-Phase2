import React,{Component} from "react";
import {Text,Dimensions,TouchableOpacity,ScrollView,Image,StyleSheet,View, TextInput} from "react-native";
import Logo from "../../SupportScreens/Logo";
import { Actions } from "react-native-router-flux";
import PropertyApp from "../../AppScreen/MainScreen/PropertyApp";
import axios from "axios";
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal, { ModalFooter,ModalTitle, ModalButton, ModalContent } from 'react-native-modals';



export default class SignInPage extends React.Component{
    constructor(props){
    super(props);
    this.state={
        email:"",
        password:"",
        feedback:"",
        PassMessage: "",
        message:"",
        showAlert: false,
        account:""
        }
    this.state.customstyles={
        borderColor:"#455a64"
     }
    this.state.feedStyle={
        color:"#455a64"
    }
    this.state.passWordStyle={
        color:"#455a64" 
    }
    this.signin=this.signin.bind(this); 
    }
    showAlert = () => {
        this.setState({
          showAlert: true
        });
      };
     
      hideAlert = () => {
        this.setState({
          showAlert: false
        });
      };
   

    PasswordCheck(text){
        if(text==""){
            this.setState({
                passWordStyle:{
                    color:"#455a64"  
                },
                PassMessage: ""
            })   
        }
        else{ if(text.length>=8){
            this.setState({
                passWordStyle:{
                    color:"#455a64"  
                },
                PassMessage: ""
            }) 
        }
        else{
                this.setState({
                    passWordStyle:{
                        color:"#D91755"  
                    },  
                    PassMessage: "Invalid password must be at least 8 characters"
                }) 
            }
        
        }
    this.setState({password:text})
    }
    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        if(text==="")
            {
                this.setState({
                    customstyles:{
                    borderColor:"#455a64",  
                    },
                    feedStyle:{
                        color:"#455a64"  
                    },
                    feedback:""
                });
            }
        else{
            this.setState({
                customstyles:{
                borderColor:"#D91755",  
                },
                feedStyle:{
                    color:"#D91755"  
                },
                feedback:"email invalid"
            })
        }
       
        //alert("Email is Not Correct");
        this.setState({email:text})
        return false;
          }
        else {
            this.setState({
                customstyles:{
                borderColor:"#455a64",  
                },
                feedStyle:{
                    color:"#455a64"  
                },
                feedback:"email valid"
            })  
            this.setState({email:text})
          //alert("Email is Correct");
        }
        }
    getInputPassword=(typeTxt)=>{
        this.setState({password:typeTxt})
    }
    
    signin(){
    
    if(this.state.email==""){
        this.setState({
            showAlert: true,
            message:"Please enter both email and password to sign in"
          });
      
    }
    else if(this.state.password==""){
        this.setState({
            showAlert: true,
            message:"Please enter both email and password to sign in"
          });
      
    }
    else{
        if(this.state.feedback=="email invalid"){
            this.setState({
                showAlert: true,
                message:"Invalid email or password!"
              });
        }
        else if(this.state.PassMessage=="Invalid password must be at least 8 characters"){
            this.setState({
                showAlert: true,
                message:"Invalid email or password!"
              });
        }
        else{
                axios.post("https://hosting-property-clone.herokuapp.com/agents/authentication",{
                email: this.state.email,
                password: this.state.password
                }).then(res =>{
                   
                    this.props.navigation.navigate("Profile",res);
                    this.props.navigation.navigate("Saved",res);
                    this.props.navigation.navigate("Home",res);
                    
                })
                .catch(error =>{
                    this.setState({
                        showAlert: true,
                        message:"Incorrect password/email, or \n Account doesn't exists!, Please sign up"
                    });
                })
            }
        }
    }
      
    render(){
        
        return(

            <View style = {styles.container}>
                <Logo/>
                <ScrollView style={styles.margin}>
                            <Text style={[styles.feedback, this.state.feedStyle]}>{this.state.feedback}</Text>
                        <View style={styles.inputBox}>
                            <Image style={styles.icon}  source ={require("../../../images/icons8-mail-account-32.png")} />
                            <TextInput style={[styles.textIn,this.state.customstyles,{width:230}]} onChangeText={(text)=> this.validate(text)} value={this.state.email} underlineColorAndroid = "rgba(0,0,0,0)" placeholder ="Email" placeholderTextColor = "#ffffff"/>
                        </View>
                            <Text style={[styles.pass, this.state.passWordStyle]}>{this.state.PassMessage}</Text>
                        <View style={styles.inputBox}>
                            <Image style={styles.icon}  source ={require("../../../images/icons8-key-64.png")} />
                            <TextInput style={styles.textIn,{color:"#ffffff",width:220}} onChangeText={(text)=> this.PasswordCheck(text)} value={this.state.password}  secureTextEntry={true} underlineColorAndroid = "rgba(0,0,0,0)" placeholder ="Password" placeholderTextColor = "#ffffff"/>
                        </View>
                        <TouchableOpacity onPress={this.signin} style= {styles.button}>
                            <Text style={styles.buttonText}>Sign in</Text>
                        </TouchableOpacity>

                    </ScrollView>
                <View style = {styles.signupTextCont}>            
                    <Text>
                        Don't have an account yet?{" "}
                    </Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signup")} >
                    <Text style = {styles.signUpButton} >
                        Sign up 
                    </Text>
                    </TouchableOpacity>
                </View>

                <Modal
                        visible={this.state.showAlert}
                        footer={
                          <ModalFooter>
                            <ModalButton
                              text="Okay"
                              onPress={() => {
                                this.setState({
                                  showAlert:false
                                })
                              }}
                            />
                          </ModalFooter>
                        }>
              <ModalContent>
                      <Text>{this.state.message}</Text>
              </ModalContent>
            </Modal>
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: "#455a64", 
        alignItems: 'center',
        justifyContent: "center"
    },
    textIn:{
        color:"#ffffff",
        
    },
    icon: {
        width:25,
        height:25,
        alignItems:"center",
        marginRight:10,
      },
    feedback:{
        fontSize:10,
        textAlign:"right",
        marginRight:22,
        marginBottom:-10
    }, pass:{
        fontSize:10,
        textAlign:"right",
        marginRight:22,
        marginBottom:-10
    },
    margin:{   
        marginTop:"25%"
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
      signUpButton:{
        color: "#006bb3",
        fontSize:16,
        fontWeight: "500"   
      },
    inputBox:{
        width:300,
        backgroundColor:"rgba(255,255,255,0.3)",
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical:4,
        fontSize:16,
        marginVertical: 10,
        borderWidth:1,
        borderColor: "#455a64",
        flexDirection:"row",
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
    }
});