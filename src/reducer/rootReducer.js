import { combineReducers } from "redux";
import userReducer from "./module/userReducer";
import counterReducer from "./module/counterReducer";

const rootReducer = combineReducers({
    user : userReducer,
    counter : counterReducer
})

export default rootReducer;