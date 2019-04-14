import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  Table,
  Alert
} from "react-bootstrap";

import { fetchCourses, deleteCourse, addCourse } from "../../actions";

class Courses extends Component {
  state = {
    id: Math.random(),
    courseName: "",
    courseWeeklyHours: "",
    coursePassGrade: "",
    courseType: 'x'
  };

  componentDidMount() {
    this.props.fetchCourses();
  }

  handleDeleteCourse = async course => {
    await this.props.deleteCourse(course && course.id);
    this.props.fetchCourses();
  };

  handleCreateCourse = async (state, e) => { 
      await this.props.addCourse(state);
      this.props.fetchCourses();

    

     
  
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    if(e.target.name === 'courseName'){
      this.setState({courseNameError: ''})
    }

    // remove errors from fields onClick event
    switch(e.target.name){
      case 'courseName':
        this.setState({courseNameError: ''});
        break;
      case 'courseWeeklyHours':
        this.setState({courseWeeklyHoursError: ''});
        break;
      case 'courseType':
        this.setState({courseTypeError: ''});
        break;
      default:
        this.setState({coursePassGradeError: ''});
        break;

    }
  };

  validate = () => {
    let isError = false;
    const errors = {};
   
    if(this.state.courseName == '' || this.state.courseName == null){
      isError = true;
      errors.courseNameError = 'חובה לרשום שם קורס';
    }
    if(this.state.courseType === 'x' ){
      isError = true;
      errors.courseTypeError = 'חובה לבחור את סוג הקורס';
    }

    if(this.state.courseWeeklyHours == '' || this.state.courseWeeklyHours == null){
      isError = true;
      errors.courseWeeklyHoursError = 'חובה לרשום שם קורס';
    }

    if(this.state.coursePassGrade == '' || this.state.coursePassGrade == null){
      isError = true;
      errors.coursePassGradeError = 'חובה לרשום ציון עובר בקורס';
    }

    if(isError){
      this.setState({
          ...this.state,
          ...errors
      });
  }

  return isError;

  
  }


  validationCreateCourse = (state) => {
    const err = this.validate();
   
        if(!err){
          this.handleCreateCourse(state);
        
          // document.getElementById('courseType').selected = 'x';            
          // document.getElementById('courseName').value = '';
          // document.getElementById('courseWeeklyHours').value = '';
          // document.getElementById('coursePassGrade').value = '';

          this.setState  ({
            id: '',
            courseName: '',
            courseWeeklyHours: '',
            coursePassGrade: '',
            courseType: 'x'
          });
          
        }
  }
  render() {
   
    const courses = this.props.courses.map(course => {
      return (
        <tr key={course && course.id}>
          <td>
            {course.coursename}
          </td>

          <td>{course.coursetype == 1 ? "אקדמי" : "מכינה"}</td>

          <td>{course.courseweeklyhours}</td>

          <td>{course.coursepassgrade}</td>

          <td>
            <Button
              variant="outline-danger"
              onClick={() => this.handleDeleteCourse(course)}>הסר
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Container>
      

        {/* <Form onSubmit={this.onSubmit}> */}
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="courseName">
                <Form.Control
                  type="text"
                  name="courseName"
                  placeholder="שם הקורס"
                  value={this.state.courseName}
                  onChange={this.onChange.bind(this)}
                />
              </Form.Group>
              {this.state.courseNameError && 
                <Alert variant="danger" className="text-right">
                  {this.state.courseNameError}
                </Alert>
              }
            </Col>
            <Col>
              <Form.Group controlId="courseType">
                <Form.Control
                  as="select"
                  name="courseType"
                  value={this.state.courseType}
                  onChange={this.onChange.bind(this)}
                >
                  <option id="typeselect" value="x">
                    סוג הקורס
                  </option>
                  <option value="1">אקדמי</option>
                  <option value="0">מכינה</option>
                </Form.Control>
              </Form.Group>
              {this.state.courseTypeError && 
                <Alert variant="danger" className="text-right">
                  {this.state.courseTypeError}
                </Alert>
              }
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="שעות לימוד שבועיות"
                  name="courseWeeklyHours"
                  id="courseWeeklyHours"
                  value={this.state.courseWeeklyHours}
                  onChange={this.onChange.bind(this)}
                />
              </Form.Group>
              {this.state.courseWeeklyHoursError && 
                <Alert variant="danger" className="text-right">
                  {this.state.courseWeeklyHoursError}
                </Alert>
              }
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="number"
                  placeholder="ציון עובר בקורס"
                  name="coursePassGrade"
                  id="coursePassGrade"
                  value={this.state.coursePassGrade}
                  onChange={this.onChange.bind(this)}
                />
                </Form.Group>
                {this.state.coursePassGradeError && 
                  <Alert variant="danger" className="text-right">
                    {this.state.coursePassGradeError}
                  </Alert>
                }
              
            </Col>

            <Col>
              <Form.Group controlId="submit">
                {/* <Button
                  style={addCourseBtn}
                  variant="primary"
                  onClick={() => 
                    this.handleCreateCourse(this.state)}
                  block
                >
                  שלח
                </Button> */}
                <Button
                  style={addCourseBtn}
                  variant="primary"
                  onClick={() => 
                    this.validationCreateCourse(this.state)}
                  block
                >
                  הוספת קורס
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Table striped bordered hover className="text-right">
          <thead>
            <tr>
              <th>שם הקורס</th>
              <th>סוג הקורס</th>
              <th>שעות שבועיות</th>
              <th>ציון עובר בקורס</th>
              <th />
            </tr>
          </thead>
          <tbody>{courses}</tbody>
        </Table>
      </Container>
    );
  }
}

const addCourseBtn = {
  'background': '#00b0ba',
  'border': '#00b0ba'
  }

const mapStateToProps = state => {

  return {
    courses: state.courses
  };
};

export default connect(
  mapStateToProps,
  { fetchCourses, deleteCourse, addCourse }
)(Courses);
