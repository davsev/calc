import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from 'react-router-dom';
import {connect} from 'react-redux';

import { userLogedIn } from '../../actions'; 
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Col,
    Checkbox,
    ControlLabel,
    HelpBlock,
    Container,
    Row
} from 'react-bootstrap';

class LoginForm extends Component {
   
    state={
        username: '',
        password: '',
        data: [],
        auth: false
    }

    componentWillMount(){
       const auth = localStorage.getItem('auth');
       
       localStorage.getItem('auth') === 'true' ? 
       this.props.userLogedIn(this.props): console.log('xxx');

        //    this.props.userLogedIn(this.props)
        //     this.redirectUser(this.props.user.auth);
      
      
    }
    
    componentDidUpdate(){
        this.redirectUser(this.props.user.auth);
     }
    
    onSubmitLogin = (event) => {
        // let auth = this.state.auth;

        event.preventDefault();
        fetch('./calc/api/user_switch/' + this.state.username + 
        '/'+ this.state.password )
        .then(response => response.json())
        .then(json => {
            if(json.count > 0)
            {
                this.props.userLogedIn(this.props)
               
            }
        })
        .catch(error => console.log('parsing faild', error))

    }

    onChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    redirectUser = (auth) =>{
        if(auth === true){
            localStorage.setItem('auth', true);
            localStorage.setItem('username', this.state.username);
            localStorage.setItem('password', this.state.password);
            this.props.history.push("/mechinasetup");
        }
    }

    render() {
        return (
            <Container id="LoginForm" className="align-middle" style={loginForm}>
            <h1 className="text-center">כניסה לניהול מחשבון מכינה</h1>
                <Row className="show-grid justify-content-center">
                    <Col xs={8}>
                        <Form>
                            <FormGroup  controlId="formHorizontalusername">
                                    <Col xs={12} componentclass={'aa'} className="text-right">
                                        דואר אלקטרוני:
                                    </Col>

                                    <Col xs={12}>
                                    <FormControl 
                                        ref="username" 
                                        name="username" 
                                        type="text" 
                                        onChange={this.onChange.bind(this)} 
                                        placeholder="הקלד דואר אלקטרוני"/>
                                    
                                    </Col>
                                    
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword" >
                                    <Col xs={12} componentclass={'cc'} className="text-right">
                                        סיסמא:
                                    </Col>
                                    <Col xs={12}>
                                    <FormControl ref="password" name="password" type="password" onChange={this.onChange.bind(this)} placeholder="הקלד סיסמא"/>
                                    
                                    </Col>
                                
                                </FormGroup>
                                <FormGroup>
                                    <Col >
                                        
                                        <Button onClick={this.onSubmitLogin} type="submit" className="full-width-btn" id="loginSubmit" block>התחבר</Button>
                                    </Col>
                                </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const loginForm = {
    height: '100vh'
}
const mapStateToProps = (state) =>{
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        userLogedIn: (params) => dispatch(userLogedIn(params))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);