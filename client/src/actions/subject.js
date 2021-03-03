import axios from 'axios';
import { GET_SUBJECTS, GET_ALL_SUBJECTS} from "./types";

export const getSubs = (subject) => async dispatch => {
    try {
        const res = await axios.get("/Subjects/" + subject);
        dispatch({
            type: GET_SUBJECTS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}

export const getAllSubs = () => async dispatch => {
    try {
        const res = await axios.get("/Subjects");
        dispatch({
            type: GET_ALL_SUBJECTS,
            payload: res.data
        })
    } catch (error) {
        console.log("SERVER ERRORRRRRRRRRR");
    }
}