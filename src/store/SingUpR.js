
const defaultState = {
    Name:"noName",
    email:"",
    password:"",
    Users:[],
    loginSuccessful:false,
    LastGames:[],
}

const ADD_DATA = "ADD_DATA";
const GET_USERS = "GET_USERS";
const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
const LAST_GAMES = "LAST_GAMES";


export const SingUpReducer = (state = defaultState,action) => {
    switch(action.type){
        case ADD_DATA:
            return {...state,Name:action.payload.name,email:action.payload.email,password:action.payload.password};
        case GET_USERS:
            return {...state,Users:action.payload};
        case LOGIN_SUCCESSFUL:
            return {...state,loginSuccessful:!state.loginSuccessful};
        case LAST_GAMES:
            return {...state,LastGames:[...state.LastGames,action.payload]};
        default:
            return state;
    }
}

export const AddDataAction = (payload) => ({type:ADD_DATA,payload})
export const GetUsersAction = (payload) => ({type:GET_USERS,payload})
export const ChangeLoginSuccessful = () => ({type:LOGIN_SUCCESSFUL})
export const LastGamesAction = (payload) => ({type:LAST_GAMES,payload})