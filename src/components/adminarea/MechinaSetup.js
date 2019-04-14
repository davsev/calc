import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Container,
  Form,
  Button,
  Col,
  Row,
  Table,
  striped,
  bordered,
  hover
} from "react-bootstrap";

import { logOut, addCourse } from "../../actions";
import Courses from "./AdminCourses";
import Head from '../layout/Header';

class MechinaSetup extends Component {
  state = {
    id: Math.random(),
    courseName: '',
    courseWeeklyHours: '',
    courseType: false
  };

  redirectUser = auth => {
    if (auth === false) {
      this.props.history.push("/login");
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };




  render() {
    const headerTitle = 'מחשבון מכינה';
    const Logout = true;
    return (

      <div>
        <Head headerTitle={headerTitle} isLogOut={Logout}/>

        {/* if user is not logged in redirect him to login page */}
        {this.redirectUser(this.props.user.auth)} 

        <Courses />       
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  { logOut }
)(MechinaSetup);
