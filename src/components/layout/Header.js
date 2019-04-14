import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { logOut } from '../../actions';
import logo from '../../images/logow.png';

class Header extends Component{
  render(){
    return(
      <header >
      <Container fluid>
        <Row style={header}>
          <Col>
            <img alt="Achva logo" src={logo}/>
          </Col>
          {this.props.isLogOut 
            && 
            <Button
            style={logoutButton}
            variant="warning"
            onClick={() => {
              const auth = localStorage.setItem('auth', false);
              this.props.logOut();
            }}
          >
            התנתקי
          </Button>
          }
        </Row>
        <Row>
          <Col><h1 className="text-center">{this.props.headerTitle}</h1></Col>
        </Row>
        </Container>
        
      </header>
    )
  }

}

const header={
  background: '#2A3F54',
  color: '#fff',
  padding: '10px 0',
  textAlign: 'right'
}

const logoutButton={
  marginLeft: '10px'
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(Header);