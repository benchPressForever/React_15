
const defaultState = {
    R3:[],
    R4:[],
    R5:[],
    R6:[],
    ratingOpen:false,
}

const GET_RATING = "GET_RATING";
const ADD_R3 = "ADD_R3";
const ADD_R4 = "ADD_R4";
const ADD_R5 = "ADD_R5";
const ADD_R6 = "ADD_R6";
const CHANGE_RATINGOPEN = "CHANGE_RATINGOPEN";

export const RatingReducer = (state = defaultState,action) => {
    switch(action.type){
        case GET_RATING:
            return {...state,
                R3:action.payload[0]?.r3,
                R4:action.payload[0]?.r4,
                R5:action.payload[0]?.r5,
                R6:action.payload[0]?.r6
            };
        case ADD_R3:
            return {...state,R3:action.payload}
        case ADD_R4:
            return {...state,R4:action.payload}
        case ADD_R5:
            return {...state,R5:action.payload}
        case ADD_R6:
            return {...state,R6:action.payload}
        case CHANGE_RATINGOPEN:
            return {...state,ratingOpen:!state.ratingOpen};
        default:
            return state;
    }
}

export const GetRatingAction = (payload) => ({type:GET_RATING,payload});
export const AddR3Action = (payload) => ({type:ADD_R3,payload})
export const AddR4Action = (payload) => ({type:ADD_R4,payload})
export const AddR5Action = (payload) => ({type:ADD_R5,payload})
export const AddR6Action = (payload) => ({type:ADD_R6,payload})
export const ChangeRatinOpengAction = () => ({type:CHANGE_RATINGOPEN})