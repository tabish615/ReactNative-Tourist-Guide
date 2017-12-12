import MapView from 'react-native-maps';
import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, } from 'react-native';
import { Container, Content, Header, View, Button, Text, Icon, Card, CardItem, Body } from 'native-base';
import Polyline from '@mapbox/polyline';
import {Actions} from 'react-native-router-flux';

class NearPlaces extends React.Component {

    render() {
        return (
                        <Container>
                            <Content>
                                <Card>
                                    <CardItem>
                                        <Body>
                                            <Text>Name : {this.props.place.name}</Text>
                                            <Text>Address : {this.props.place.vicinity}</Text>
                                            <Text>Website : {this.props.place.website}</Text>
                                            <Text>Rating : {this.props.place.rating}</Text>               
                                        </Body>
                                        <Button onPress={()=>{Actions.main({end: this.props.place})}}>
                                                <Text>
                                                    GO
                                                </Text>
                                        </Button> 
                                      </CardItem>
                                 </Card>
                              </Content>
                          </Container>
        );
    }
} 

export default NearPlaces; 