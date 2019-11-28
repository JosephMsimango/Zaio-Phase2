import React,{Component} from "react";
import{createStackNavigator} from "react-navigation-stack";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import PropertyApp from "./Screens/AppScreen/MainScreen/PropertyApp";
import StartPage from "./Screens/StartScreen/MainScreen/StartPage";
import SignInPage from "./Screens/StartScreen/Support/SignInPage";
import SignUpPage from "./Screens/StartScreen/Support/SignUpPage";
import Empty from "./Screens/AppScreen/Support/Empty";
import List from "./Screens/AppScreen/Support/List";
import Search from "./Screens/AppScreen/Support/Search";
import ModalView from "./Screens/AppScreen/Support/List";
import ModalSearch from "./Screens/AppScreen/Support/ModalSearch";
import ModalDropdown from "./Screens/AppScreen/Support/ModalDropdown";
import Dropdown from "./Screens/AppScreen/Support/Dropdown";
import AddImage from "./Screens/AppScreen/Support/AddImage"

const StartStack = createStackNavigator(
    {Signin:
        {
          screen:SignInPage,
          navigationOptions:{
            header:null
          }
        }, 
        Signup:
        {
          screen:SignUpPage,
          navigationOptions:{
            header:null
          }
        }
      })
const ExtraScreens = createStackNavigator({
  List:
        {
          screen:List,
          navigationOptions:{
            header:null
          }
        },
})

const AppStack = createStackNavigator(
    {
      PropApp:{
        screen:PropertyApp,
        navigationOptions:{
          header:null
        }
      }
    })

const Root =  createSwitchNavigator(
  {
      firstScreen: StartStack,
      SecondScreen: AppStack,
      NeverUse: ExtraScreens
  },
  {
    initialRouteName: "firstScreen",
  }
);
const App = createAppContainer(Root);
export default App;
/*export default class App extends Component {
  render(){
    return (
        <Routes/>
    )}
  }*/

/*export const AppStackNavigator= createStackNavigator({
  StartPage:{
    screen:StartPage,
    navigationOptions:{
      header:null
    }

  },
  Propertyapp:{
    screen:PropertyApp,
    navigationOptions:{
      header:null
    }
  },
})
const AppContainer =createAppContainer(AppStackNavigator);
//export default App;*/
