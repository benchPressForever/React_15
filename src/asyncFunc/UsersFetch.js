
import { GetUsersAction } from "../store/SingUpR"


export function usersFetch(){
    return function(dispatch){
        fetch("https://6488dbfb0e2469c038fe741d.mockapi.io/People")
        .then(res => res.json())
        .then(json => dispatch(GetUsersAction(json)))
    }
}