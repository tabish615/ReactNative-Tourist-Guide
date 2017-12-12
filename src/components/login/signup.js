import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Container, Content, Form, Item, Label, Button, Text, Input, Icon } from 'native-base';
import * as firebase from 'firebase';
import  {signup}  from '../../redux/reducer';
import { connect }  from 'react-redux';

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            email : '',
            password : ''
        };
    }
    onSubmit(e){
        e.preventDefault();
        let { name, email, password } = this.state;
        this.props.signup(name, email, password);
    }
    
    render () {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                        <Icon active name = 'person' />
                            <Label> Username </Label>
                            <Input onChange={e => this.setState({name: e.nativeEvent.text})} />
                        </Item>
                        <Item floatingLabel >
                            <Icon active name = 'mail' />
                            <Label> Email </Label>
                            <Input onChange={e => this.setState({email: e.nativeEvent.text})}
                                keyboardType='email-address'
                            />
                        </Item>
                        <Item floatingLabel>
                        <Icon active name = 'lock' />
                            <Label> Password </Label>
                            <Input onChange={e => this.setState({password: e.nativeEvent.text})}
                                secureTextEntry
                            />
                        </Item>
                        <Button block onPress={this.onSubmit.bind(this)}>
                            <Text>
                                Sign Up
                            </Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        state : state.user,
    };
} 

const mapDispatchToProps = (dispatch) => {
    return {
        signup : (name, email, password) => dispatch(signup(name, email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);