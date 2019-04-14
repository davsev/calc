import React, { Component } from 'react'
import Course from './Course';
class Courses extends Component {
    render() {
        return this.props.newCourses.map((course) => (
            <Course 
                
                course={course} 
                removeCourse={this.props.removeCourse}
                updateCourseGrade={this.props.updateCourseGrade}/>
        ));
    }
}

export default Courses
