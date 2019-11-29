import React,{Component} from "react";
import {Image,Dimensions,KeyboardAvoidingView,Text,StatusBar,Platform,TouchableOpacity,StyleSheet,View, TextInput} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {Hoshi} from "react-native-textinput-effects";
import axios from "axios";
import Modal, { ModalFooter,ModalTitle, ModalButton, ModalContent } from 'react-native-modals';
import Logo from "../../SupportScreens/Logo";


export default class SignUpPage extends React.Component{
    constructor(props){
    super(props);
    this.state={
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        password_cofirm:"",
        emailVal:"",
        passwordVal:"Invalid, password must be at least 8 characters!",
        confirmVal:"",
        message:"",
        showAlert: false
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
    
    
    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        if(text==="")
            {
                this.setState({
                    customstyles:{
                        color:"#455a64" 
                    },
                    emailVal:""
                });
            }
        else{
            this.setState({
                customstyles:{
                    color:"red" 
                },
                emailVal:"email invalid!"
            })
        }
       
        //alert("Email is Not Correct");
        this.setState({email:text})
        return false;
          }
        else {
            this.setState({
                customstyles:{
                    color:"#455a64" 
                },
                emailVal:"email valid!"
            })  
            this.setState({email:text})
          //alert("Email is Correct");
        }
        }
        PasswordCheck(text){
            if(text==""){
                this.setState({
                    passWordStyle:{
                        color:"#455a64"  
                    },
                    passwordVal: ""
                })   
            }
            else{ if(text.length>=8){
                this.setState({
                    passWordStyle:{
                        color:"#455a64"  
                    },
                    passwordVal: "Password Valid"
                }) 
            }
            else{
                    this.setState({
                        passWordStyle:{
                            color:"red"  
                        },  
                        passwordVal: "Invalid, password must be at least 8 characters!"
                    }) 
                }
            
            }
        this.setState({password:text})
        }

        confirm(text){
            if(text==""){
                this.setState({
                    passConfirmStyle:{
                        color:"red"  
                    },  
                    confirmVal: ""
                }) 
            }
            else{
                if(text.length>=8){
                    if(this.state.password==text){
                        this.setState({
                            passConfirmStyle:{
                                color:"green"  
                            },  
                            confirmVal: "Password matches!"
                        }) 
                    }
                    else{
                        this.setState({
                            passConfirmStyle:{
                                color:"red"  
                            },  
                            confirmVal: "Password doen't match!"
                        }) 
                    }
                }
                else{
                    this.setState({
                        passConfirmStyle:{
                            color:"red"  
                        },  
                        confirmVal: "Password doen't match!"
                    })
                } 
            }
            this.setState({password_cofirm:text})
        }
    signUp =()=>{
        if(this.state.firstname===""){
            this.setState({
                showAlert: true,
                message:"Please fill in all fields!"
              });
        }
        else if(this.state.lastname===""){
            this.setState({
                showAlert: true,
                message:"Please fill in all fields!"
              });
        }
        else if(this.state.email===""){
            this.setState({
                showAlert: true,
                message:"Please fill in all fields!"
              });
        }
        else if(this.state.password===""){
            this.setState({
                showAlert: true,
                message:"Please fill in all fields!"
              });
        }
        else if(this.state.password_cofirm===""){
            this.setState({
                showAlert: true,
                message:"Please fill in all fields!"
              });
        }
        else if(this.state.emailVal=="email invalid!"){
            this.setState({
                showAlert: true,
                message:"email/password invalid! or, password doen't match!"
              });
        }
        else {
                if(this.state.passwordVal=="Invalid, password must be at least 8 characters!"){
                    this.setState({
                        showAlert: true,
                        message:"email/password invalid! or, password doen't match!"
                    });
                }
                else if(this.state.confirmVal=="Password doen't match!"){
                    this.setState({
                        showAlert: true,
                        message:"email/password invalid! or, password doen't match!"
                    });
                }
                else{
                    axios.post('https://hosting-property-clone.herokuapp.com/Customers', {
                        "firstName": this.state.firstname,
                        "lastName": this.state.lastname,
                        "email": this.state.email,
                        "password": this.state.password
            
                    },{
                        "headers": {
                        'Content-Type': 'application/json;charset=UTF-8',
                        }
                    
                    }).then(res =>{
                        this.props.navigation.navigate("Home",res);
                    })
                    .catch(error =>{
                        this.setState({
                            showAlert: true,
                            message:"Account already exists!, Please sign in"
                        });
                    })
                    }
            }
        }
    
    render(){
        
        return(

            <View style = {styles.container}>
                <Logo/>
                    <KeyboardAvoidingView style = {{flex:1}} behavior="padding">
                        <ScrollView style={{marginBottom:50}}>
                    
                            <View  style={styles.containerBox}>
                                        <Text style={styles.header}>Registration</Text>
                                        <Hoshi value={this.state.firstname} label={"First name"} onChangeText={firstname=>this.setState({firstname:firstname})} style={styles.textinput} underlineColorAndroid={"transparent"}/>
                                        <Hoshi value={this.state.lastname} label={"Last name"} onChangeText={lastname=>this.setState({lastname:lastname})} style={styles.textinput}  underlineColorAndroid={"transparent"}/>
                                        
                                        <Text style={[styles.feedback,this.state.customstyles]}>{this.state.emailVal}</Text>
                                        <Hoshi value={this.state.email} label={"Email"} onChangeText={(text)=> this.validate(text)} style={styles.textinput}  underlineColorAndroid={"transparent"} keyboardType="email-address"/>
                                        
                                        <Text style={[styles.feedback, this.state.passWordStyle]}>{this.state.passwordVal}</Text>
                                        <Hoshi value={this.state.password} label={"Password"} onChangeText={(text)=> this.PasswordCheck(text)}style={styles.textinput} secureTextEntry={true} underlineColorAndroid={"transparent"}/>
                                       
                                        <Text style={[styles.passwordConfirm,this.state.passConfirmStyle]}>{this.state.confirmVal}</Text>
                                        <Hoshi value={this.state.password_cofirm} label={"Confirm password"} onChangeText={(text)=> this.confirm(text)} style={styles.textinput} secureTextEntry={true}  underlineColorAndroid={"transparent"}/>
                                
                                    <TouchableOpacity onPress={this.signUp} style={styles.button}> 
                                        <Text style={styles.buttonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                
                            </View>
                    </ScrollView>
                    </KeyboardAvoidingView>  
                    <View style = {styles.signupTextCont}>            
                            <Text>
                                Already have an account?{" "}
                            </Text>

                            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Signin")}>
                                <Text style = {styles.signUpButton}>
                                    Sign in 
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
    },
    passwordConfirm:{
        fontSize:10,
        textAlign:"right",
        marginRight:22,
        marginBottom:-15,
        color:"red"
    }
    ,feedback:{
        fontSize:10,
        textAlign:"right",
        marginRight:22,
        marginBottom:-15,
        color:"red"
    },
    containerBox:{
        alignSelf: 'stretch',
        marginLeft:50,
        marginRight:50,
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
    header:{
        fontSize: 24,
        color: "#fff",
        textAlign:"center",
        borderBottomColor: "#199187",
        borderBottomWidth:1,
    },
    textinput:{
        alignSelf:"stretch",
        color: "white",
        height:40,
        marginBottom:5,
        borderBottomColor:"#f8f8f8",
        borderBottomWidth: 1,
    },
    button:{
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