import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import { Text, Button, Container, Content } from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Index extends Component {
    render () {
        return (
                <Container style={styles.container}>
                        <StatusBar
                            barStyle="light-content"
                        />
                    <Content>
                        <Text style={styles.textContainer}>Welcome To Tourist Guide App</Text>
                        <Button block info 
                            onPress={()=>Actions.signin()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}> 
                                Sign in 
                            </Text>
                        </Button>
                        <Button block info 
                            onPress={()=>Actions.signup()} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>
                                Sign up 
                            </Text>
                        </Button>
                    </Content>
                </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        backgroundColor: '#2980b9',
        alignItems: 'center',
    },

    textContainer: {
        color: 'white',
        fontWeight: '900',
        fontSize: 40,
        textAlign : 'center',
        textAlignVertical : 'center',
        marginTop : 50,
        marginBottom : 50,
    },

    buttonContainer: {
        backgroundColor: 'white',
        // color: '#2980b9',
        marginBottom : 15,
        alignItems : 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#3498db',
        fontWeight: '700',
        fontSize : 20,        
    }
})