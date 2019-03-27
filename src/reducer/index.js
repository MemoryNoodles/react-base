/**
 * @module  combineReducers
 * 合并reducer函数
 *@param {object} 需要合并的reducer
 * */
import {combineReducers} from 'redux'
import loginReducer from './loginReducer';
import loginAllocation from "./loginAllocation";
import breadcrumbTopTextArray from "./breadcrumbTopText"
import updateAdmin from "./updateAdminReducer";
import curScreen from "./curScreen";
import spin from "./spin";


export default combineReducers({loginReducer,loginAllocation,breadcrumbTopTextArray,updateAdmin,curScreen,spin});