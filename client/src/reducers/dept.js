import {GET_DEPT, GET_DEPTS, SET_DEPT} from "../actions/types";

const initialState = {
    dept: null,
    depts: null,
    loading: true
};

export default function (state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case GET_DEPT:
            return{
                ...state,
                dept: payload,
                loading: false
            };
        
        case GET_DEPTS:
            return{
                ...state,
                depts: payload,
                loading: false
            };
        case SET_DEPT:
            return{
                ...state,
                dept: payload,
                loading: false
            }
        
        default:
            return state;
    }
}