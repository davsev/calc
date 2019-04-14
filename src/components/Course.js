import React, { Component } from "react";
import { Button } from "react-bootstrap";

class Course extends Component {
    
  updatedGrade = e => {
    this.props.updateCourseGrade(
      Number(e.currentTarget.value),
      Number(e.target.id)
    );
  };
  render() {
    const { id, courseName, courseGrade, courseType } = this.props.course;
    return (
      <tr id={id} key={id} >
        <td>
          {courseType == 0 ? "מכינה" : "אקדמי"} - {courseName}
        </td>
        <td>{courseGrade}</td>
        <td>
          <Button
            onClick={this.props.removeCourse.bind(this, id)}
           
            variant="danger"
          >
            הסר
          </Button>
        </td>
      </tr>
    );
  }
}

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  padding: "5px 20 px",
  border: "0px"
};

export default Course;
