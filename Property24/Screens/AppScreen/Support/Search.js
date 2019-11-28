import React from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Searchbar } from "react-native-paper";

/*
The component is child component for location search 
the selected location can be stored in state variable
*/
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
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      searchResult: "",
      address:null,
      lat:null,
      lng:null,
        selectedItems: [],

    }
  }
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.setproperties(selectedItems);
    
  };
  getAdd(data){
    //console.log("add",data);
    this.setState(
        {
          address: data.formatted_address, // selected address
          lat: data.geometry.location.lat,//  selected coordinates latitude
          lng:data.geometry.location.lng, //  selected coordinates longitute

        }
      );
}
  render() {
    return (
      <View >
          <GooglePlacesAutocomplete
    placeholder='Search'
    minLength={2} // minimum length of text to search
    autoFocus={false}
    fetchDetails={true}
    returnKeyType={'default'}
    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true

      var data = details;
      this.getAdd(data);
    }}
    query={{
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: 'AIzaSyBnghjKCGZfylLUWssl8SQbM8ILGeYW5l0',
      language: 'en',
      types: 'geocode', // default: 'geocode'
    }}

    listViewDisplayed={this.state.showPlacesList}
    textInputProps={{
      onFocus: () => this.setState({ showPlacesList: true }),
      onBlur: () => this.setState({ showPlacesList: false }),
    }}
    styles={{
        textInputContainer: {
          width: '100%'
        },
        description: {
          fontWeight: 'bold'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}

    currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
    currentLocationLabel="Current location"
    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch

    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    // predefinedPlaces={[]}

    predefinedPlacesAlwaysVisible={true}
  />
       
      </View>
    );
  }
}