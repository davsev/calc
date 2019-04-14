import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import uuid from "uuid";

import Header from "./layout/Header";
import Courses from "./Courses";
import AddCourse from "./AddCourse";
import Sum from "./Sum";

import { fetchCourses } from "../actions";

class Calc extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }

  state = {
    courses: this.props.courses,
    newCourses: []
  };

 

  //delete Course
  removeCourse(id) {
    this.setState({
      newCourses: [...this.state.newCourses.filter(course => course.id !== id)]
    });
  }

  updateCourseGrade(courseGrade, id) {

    this.setState(prevState => ({
      courses: prevState.courses.map(course =>
        course.id === id ? { ...course, courseGrade } : course
      )
    }));
  }
  addCourse = e => {
    const courseData = e.courseData.split("-");

    const newCourse = {
      id: uuid(4),
      courseName: courseData[0],
      courseGrade: Number(e.courseGrade),
      courseHours: Number(courseData[1]),
      coursePassGrade: Number(courseData[2]),
      courseType: courseData[3]
    };
    this.setState({ newCourses: [...this.state.newCourses, newCourse] });
  
  };

  render() {
  
    const headerTitle = 'מחשבון ממוצע ציונים לתלמידי המכינה';
    return (
      
      <div className="App">
       <Header headerTitle={headerTitle}/>
        <div className="container">
         

          <Table className="text-right">
            <thead>
              <tr>
                <th>שם הקורס</th>

                <th>ציון</th>
                <th>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              <Courses
                newCourses={this.state.newCourses}
                removeCourse={this.removeCourse.bind(this)}
                updateCourseGrade={this.updateCourseGrade.bind(this)}
              />
            </tbody>
          </Table>
          <hr />
          <Sum newCourses={this.state.newCourses} />
          <hr />
          <AddCourse courses={this.props.courses} addCourse={this.addCourse} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  { fetchCourses }
)(Calc);
