
const defaultState = {
    Time:'00:00:00',
    Steps:0,
    StartTime:0,
    StartGame:false,
}

const CHANGE_TIME = 'CHANGE_TIME';
const CHANGE_STARTTIME = "CHANGE_STARTTIME";
const PLUS_STEP = 'PLUS_STEP';
const REMOVE = "REMOVE";
const CHANGE_STARTGAME = "CHANGE_STARTGAME";

export const countReducer = (state = defaultState,action) =>{
    switch(action.type){
        case CHANGE_TIME:
            return {...state,Time:action.payload};
        case CHANGE_STARTTIME:
            return {...state,StartTime:action.payload};
        case PLUS_STEP:
            return {...state,Steps:state.Steps+1};
        case REMOVE:
            return {...state,Time:'00:00:00',Steps:0,StartTime:0};
        case CHANGE_STARTGAME:
                return {...state,StartGame:action.payload};
        default:
            return state;
    }
}

export const ChangeTimeAction = (payload) => ({type:CHANGE_TIME,payload});
export const ChangeStartTimeAction = (payload) => ({type:CHANGE_STARTTIME,payload});
export const PlusStepAction = () => ({type:PLUS_STEP});
export const RemoveAction = () => ({type:REMOVE});
export const ChangeStartGameAction = (payload) => ({type:CHANGE_STARTGAME,payload});