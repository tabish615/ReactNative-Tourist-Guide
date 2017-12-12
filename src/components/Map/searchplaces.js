import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Container, Content, Header } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; 
import MyApp from './map';

const { width, height } = Dimensions.get('window');

export default class SearchPlaces extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         region2: {
    //             latitude: null,
    //             longitude: null,
    //             fetchDetails: false
    //         }
    //     }
    // }
    render() {
        return (
            <View>
                {/* <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    listViewDisplayed='auto'
                    onPress={(data, details = null) => {
                        this.setState({
                            region2: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                fetchDetails: true
                            }
                        })
                    }}
                    styles={{
                    textInputContainer: {
                        backgroundColor: 'rgba(0,0,0,0)',
                        borderTopWidth: 0,
                        borderBottomWidth:0,
                        flex: 0.1,
                        width : width,
                        zIndex: 1,
                        paddingTop: 14,
                        paddingLeft: 10,
                        paddingRight: 10,
                        // paddingBottom: 20
                    },
                    listView : {
                        backgroundColor: 'white',
                        zIndex: 2,
                        marginTop: 0,
                        paddingTop: 0,
                    },
                    textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                    },
                    predefinedPlacesDescription: {
                        backgroundColor: 'rgba(0,0,0,0)',                        
                    },
                    poweredContainer: {
                        backgroundColor: 'rgba(0,0,0,0)'
                    },
                    }}
                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyDyurz-X5eVkubiv4kmQC0i3fVvmOIqoqc',
                        language: 'en', // language of the results
                        types: 'establishment' // default: 'geocode'
                    }}
                    currentLocation={false}
                />
                <MyApp searchMarker={this.state.region2} /> */}
            </View>
        )
    }
}