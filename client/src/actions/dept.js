import axios from 'axios';
import { GET_DEPTS, GET_DEPT, SET_DEPT} from "./types";

export const getDepts = () => async dispatch => {
    try {
        const res = await axios.get("/dept");
        dispatch({
            type: GET_DEPTS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const getDept = (dept) => async dispatch => {
    try {
        // const res = await axios.get("/dept");
        dispatch({
            type: GET_DEPT,
            payload: dept
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const setDept = (dept) => async dispatch => {
    try {
        
        dispatch({
            type: SET_DEPT,
            payload: dept
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}