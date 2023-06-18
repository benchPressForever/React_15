
const defaultState = {
    Size:4,
    FieldArr:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,""],
    IndexNull:15,
}

const MOVE = "MOVE";
const SIZE_FIELD = "SIZE_FIELD";
const CHANGE_iNDEXNULL = "CHANGE_iNDEXNULL";

export const fieldReducer = (state = defaultState,action) => {
    switch(action.type){
        case MOVE:
            return {...state,FieldArr:action.payload};
        case SIZE_FIELD:
            return {...state,Size:action.payload};
        case CHANGE_iNDEXNULL:
            return {...state,IndexNull:action.payload};
        default:
            return state;
    }
}

export const FieldMoveAction = (payload) => ({type:MOVE,payload})
export const SizeFieldAction = (payload) => ({type:SIZE_FIELD,payload})
export const ChangeIndexNullAction = (payload) => ({type:CHANGE_iNDEXNULL,payload})