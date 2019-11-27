import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from "react-native-sectioned-multi-select";

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

export default class Dropdown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedItems: [],
        };
      }
     onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
        this.props.setproperties(selectedItems);
        
      };

      render(){
        return(
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
                    selectedItems={this.state.selectedItems}
                    colors={{selectToggleTextColor:"#B0B0B0"}}
                    />
                </View>
            </View>
        </View>
        );
    }    
}