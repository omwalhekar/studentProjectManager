import {GET_PROJECT , GET_PROJECTS, GET_DEPT_PROJS, GET_SUB_PROJS, DELETE_PROJ, FILTER_PROJ, CLEAR_FILTER} from "../actions/types";

const initialState = {
    project: null,
    projects: null,
    filtered: null,
    loading: true
};

export default function (state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case GET_PROJECT:
            return{
                ...state,
                project: payload,
                loading: false
            };
        
        case GET_PROJECTS:
            return{
                ...state,
                projects: payload,
                loading: false
            };
        case GET_DEPT_PROJS:
            return {
                ...state,
                projects: payload,
                loading: false
            }
        case GET_SUB_PROJS:
            return{
                ...state,
                projects: payload,
                loading: false
            }
        case DELETE_PROJ:
            return{
                ...state,
                projects: payload,
                loading: false
            }
        case FILTER_PROJ:
            return{
                ...state,
                filtered: payload,
                loading: false
            }
        case CLEAR_FILTER:
            return{
                ...state,
                filtered: null,
                loading: false
            }
        
        default:
            return state;
    }
}