import { combineReducers } from "redux";
import auth from "./auth";
import basket from "./basket";
import location from "./location";
import productsList from "./productsList";

const reducer = combineReducers({auth,location,productsList,basket});

export default reducer;