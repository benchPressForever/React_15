import { GetRatingAction } from "../store/RatingR"


export function ratingFetch(){
    return function(dispatch){
        fetch("https://6488dbfb0e2469c038fe741d.mockapi.io/Rating")
        .then(res => res.json())
        .then(json => json.length > 0 ? dispatch(GetRatingAction(json)) : console.log(json.length))
    }
}