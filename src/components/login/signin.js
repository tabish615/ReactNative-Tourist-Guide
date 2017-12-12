import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Container, Content, Form, Item, Label, Button, Text, Input, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { connect }  from 'react-redux';
import  {signin}  from '../../redux/reducer';
import * as firebase from 'firebase';

export class Signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    onSubmit (e) {
        e.preventDefault();
        let { email, password } = this.state;
        this.props.signin(email, password);
    }

    render () {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Icon active name = 'mail' />
                            <Label> Email </Label>
                            <Input onChange={e => this.setState({email: e.nativeEvent.text})}
                                keyboardType='email-address'
                                returnKeyType='next' />
                        </Item>
                        <Item floatingLabel>
                            <Icon active name = 'lock' />
                            <Label> Password </Label>
                            <Input onChange={e => this.setState({password: e.nativeEvent.text})}
                                secureTextEntry
                                returnKeyType='go' />
                        </Item>
                        <Button block onPress={()=> Actions.main()//this.onSubmit.bind(this)
                        } >
                            <Text>
                                Sign In
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
        user: state.user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        signin: (email, password) => dispatch(signin(email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);