import {
    FETCH_COURSES,
    ADD_COURSE, 
    DELETE_COURSE
} from '../consts';

const courseAdaedd = (action) => {
    return {
        cid: action.course.id,
        courseName: action.course.courseName,
        courseType: action.course.courseType,
        courseWeeklyHours: action.course.courseWeeklyHours,
        coursePassGrade: action.course.coursePassGrade
    }
}


export default (state = [], action) => {
    switch (action.type) {
        case FETCH_COURSES:
            return action.payload.data;
            
        case ADD_COURSE:
            let courses = null;
            courses = {
                ...state,
                courses: courseAdaedd(action)
           }
           return courses;

        case DELETE_COURSE:{
            return state 
        }

        default:
            return state;
    }
}