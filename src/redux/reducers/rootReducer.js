import { combineReducers } from "redux";
import red from "./reducers";
import { reducer as toastrReducer } from "react-redux-toastr";

const rootReducer = combineReducers({
  red,
  toastr: toastrReducer
});

export default rootReducer;
