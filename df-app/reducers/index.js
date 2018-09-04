import { combineReducers } from "redux";
import mapData from "../features/map/reducers";
import homeData from "../features/home/reducers";
import navigationData from "../navigation/reducers";

export default combineReducers({
  mapData,
  homeData,
  navigationData
});
