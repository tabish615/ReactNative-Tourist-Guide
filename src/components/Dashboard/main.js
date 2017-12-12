import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Content, Text, Header, Left, Icon, Button, Title, Right, Drawer, Body } from 'native-base';
import SideBar from './sidebar';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'; 
import MyApp from './../Map/map';
// import Polyline from '@mapbox/polyline';
// import SearchPlaces from './../Map/searchplaces'

const { width, height } = Dimensions.get('window');

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            region2: {
                l: [{}],
                fetchDetails: false,
            },
            // end: null,
        }
    }
    // componentWillReceiveProps(props){
    componentDidMount(){
       ///setTimeout(()=>{ 
    if(this.props.end){
        this.setState({
            region2: {
                l: [this.props.end],
                // latitude: details.geometry.location.lat,
                // longitude: details.geometry.location.lng,
                fetchDetails: true,
            }
        })//}, 800)
    }
    }
    render() {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        openDrawer = () => {
            this.drawer._root.open()
        };
        return (
            <Drawer //panOpenMask='.2' panCloseMask='.75'
            ref={(ref) => {this.drawer = ref; }}
            content={<SideBar navigator={this.navigator} />}>
            <Container>
                {/* <Header>
                    <Left>
                        <Button onPress={()=>{openDrawer()}}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>
                            Tourist Guide
                        </Title>
                    </Body>
                    <Right>
                    </Right>
                </Header> */}
                <Content>
                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={false}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    listViewDisplayed='auto'
                    onPress={(data, details = null) => {
                        console.log(details);
                        this.setState({
                            region2: {
                                l: [details],
                                // latitude: details.geometry.location.lat,
                                // longitude: details.geometry.location.lng,
                                fetchDetails: true,
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
                        // zIndex: 1,
                        // paddingTop: 14,
                        // paddingLeft: 10,
                        // paddingRight: 10,
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
                <MyApp searchMarker={this.state.region2} //end={this.state.end}
                />
                </Content>
            </Container>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    // search: {
    //     color: 'white'
    // }
});