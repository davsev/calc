import React, { Component } from 'react';
import { Form, Button, Col, Row, Alert } from 'react-bootstrap';


class AddCourse extends Component {
    
    state = {
        courseName: '',
        courseNameError: '',
        courseType: '',
        courseGrade: '',
        courseGradeError: '',
        courseHours: '',
        coursePassGrade: '',
        courseData: 'x'
    }

    onChange(e) {
        this.setState({
             [e.target.name]: e.target.value });

        if(e.target.name === 'courseData'){
            this.setState({courseNameError: ''})
        }
        if(e.target.name === 'courseGrade'){
            this.setState({courseGradeError: ''})
        }
    }

    validate = () => {
        let isError = false;
        const errors = {};
        
        if(this.state.courseGrade == '' || this.state.courseGrade == NaN){
            isError = true;
            errors.courseGradeError = 'חובה לציין מה הציון שקיבלת בקורס';
        }
        if(this.state.courseData == 'x' || this.state.courseData == null ){
            isError = true;
            errors.courseNameError = 'חובה לבחור בקורס';
        }

        if(isError){
            this.setState({
                ...this.state,
                ...errors
            });
        }
        return isError;

    }

    onSubmit = (e) => {
        e.preventDefault();
        const err = this.validate();
        if(!err){
            this.props.addCourse(this.state);
            // document.getElementById('courseselect').selected = true;
            // document.getElementById('typeselect').selected = true;
            // document.getElementById('coursegrade').value = '';
            this.setState({
                courseData: 'x',
                courseType: '',
                courseGrade: '',
                courseNameError: '',
                courseGradeError: ''
            });
        }



    }
    render() {
        const courses = this.props.courses.map(course =>
            <option 
                key={course.id} 
                value={course.coursename+'-'+course.courseweeklyhours+'-'+course.coursepassgrade+'-'+course.coursetype} 
                coursehours={course.courseHours} 
                coursepassgrade={course.coursePassGrade}  
            >
            {course.coursetype == 1 ? 'אקדמי' : 'מכינה' } - {course.coursename} 
            </option>
        )

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col xs={12} sm={5}>
                            <Form.Group controlId="courseSelect">

                                <Form.Control
                                    as="select"
                                    name="courseData"
                                    value={this.state.courseData}
                                    onChange={this.onChange.bind(this)}

                                    
                                    
                                >
                                <option id="courseselect" value="x">בחירת קורס</option>
                                    {courses}

                                </Form.Control>
                                

                                {this.state.courseNameError &&
                                    <Alert variant="danger">
                                        {this.state.courseNameError}
                                    </Alert>
                                }
                            </Form.Group>
                        </Col>

                        <Col  xs={12} sm={5}>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    placeholder="ציון בקורס"
                                    name="courseGrade"
                                    id="coursegrade"
                                    value={this.state.courseGrade}
                                    onChange={this.onChange.bind(this)}
                                
                                />
                                {this.state.courseGradeError &&
                                    <Alert variant="danger">
                                        {this.state.courseGradeError}
                                    </Alert>
                                }
                            </Form.Group>

                         
                        </Col>
                    
                        <Col  xs={12} sm={2}>
                            <Form.Group controlId="submit" >
                                <Button variant="primary" type="submit" style={addCourseBtn} block>
                                    הזן
                        </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
const addCourseBtn = {
'background': '#00b0ba',
'border': '#00b0ba'
}


export default AddCourse
