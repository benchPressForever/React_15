import { applyMiddleware, createStore ,combineReducers} from "redux";
import thunk from "redux-thunk";
import { fieldReducer } from "./FieldReducer";
import { SingUpReducer } from "./SingUpR";
import { RatingReducer } from "./RatingR";
import { countReducer } from "./CountReducer";

const rootReducer = combineReducers({
    FieldR:fieldReducer,
    SingUpR:SingUpReducer,
    RatingR:RatingReducer,
    CountR:countReducer,
})


export const store  = createStore(rootReducer,applyMiddleware(thunk))