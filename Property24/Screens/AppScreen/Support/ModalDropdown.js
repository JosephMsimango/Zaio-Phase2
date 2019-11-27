import React, { Component } from 'react';
import { View } from 'react-native';
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const items=[
    {name: "House",
    id:1},
    {name: "Apartment",
    id:2},
    {name: "Townhouse",
    id:3},
    {name: "Vacant Land",
    id:4},
    {name: "Farm",
    id:5},
    {name: "Commercial",
    id:6},
    {name:  "Industrial",
    id:7}
]

export default class ModalDropdown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          selectedItems: [],
          first:true
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