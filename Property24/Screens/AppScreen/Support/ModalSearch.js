import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Searchbar } from "react-native-paper";

/*
The component is child component for location search 
the selected location can be stored in state variable
*/
export default class ModalSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      searchResult: "",
      defaultVal:""
    }
  }
  string(){
    return( this.props.setSearch()+"")
  }
  render() {
    return (
      <View >
        <GooglePlacesAutocomplete
          placeholder="Add Address..."
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={"search"}
          listViewDisplayed="false"
          fetchDetails={true}
          renderDescription={row =>
            row.description || row.formatted_address || row.name
          }
          onPress={(data, details = null) => {
            console.log(data.description)
            this.props.addressFromSeach(data.description)
           // this.setState({searchResult:data.description})
          }}
          getDefaultValue={() => {
            return this.string(); // text input default value
          }}
          query={{
            key: "AIzaSyBnghjKCGZfylLUWssl8SQbM8ILGeYW5l0",
            language: "en", // language of the results
            types: "(regions)" // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: "bold"
            },
            backgroundColor: 'gray',
            predefinedPlacesDescription: {
              color: "#1faadb"
            },
          }}
          
          debounce={200}
        />
      </View>
    );
  }
}