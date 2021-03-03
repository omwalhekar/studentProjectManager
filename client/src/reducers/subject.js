import {GET_SUBJECTS,GET_ALL_SUBJECTS} from "../actions/types";

const initialState = {
    sub: null,
    subs: [],
    loading: true
};

export default function (state = initialState, action){
    const {type, payload} = action;

    switch (type) {
        case GET_SUBJECTS:
            return{
                ...state,
                subs: payload,
                loading: false
            };
        case GET_ALL_SUBJECTS:
            return{
                ...state,
                subs: payload,
                loading: false
            };
        
        default:
            return state;
    }
}