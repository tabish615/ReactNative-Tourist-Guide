import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Button, Header } from 'native-base';
import * as firebase from 'firebase';

export default class SideBar extends Component {
    render() {
        return (
            <Container>
                <Header style={styles.headerContainer}>

                </Header>
                <Content style={styles.contentContainer}>
                <Button block>
                    <Text>
                        Logout
                    </Text>
                </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

    headerContainer : {
        height : 100,
    },

    contentContainer : {
        backgroundColor : 'white',
    }
});