import {
    LOGGED_IN,
    LOGGED_OUT,
    FETCH_COURSES,
    ADD_COURSE,
    DELETE_COURSE
} from '../consts';
import mysql from '../apis/mysql';
export const userLogedIn = () => {
    const action = {
        type: LOGGED_IN
    }
    return action
}

export const logOut = () => {
    const action = {
        type: LOGGED_OUT
    }
    return action
}

export const addCourse = (data) => {

    return (dispatch) => {
        return fetch("https://forms.achva.ac.il/calc/api/courses/Courses.php", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: ADD_COURSE,
                    value: json
                });
            })
            .catch(error =>
                console.log('parsing faild', error)
            )
    };
};




export const fetchCourses = () => {
    return async (dispatch) => {
        const response = await mysql.get('courses/Courses.php');

        dispatch({
            type: FETCH_COURSES,
            payload: response
        })

    }

}

export const deleteCourse = (id) => {
    return async (dispatch) => {
        const response = await mysql.delete('courses/Courses.php?id= ' + id);
        dispatch({
            type: DELETE_COURSE,
            id,
            response
        })
    }
}