/**
 * @module  BreadcrumbTopText
 * 处理BreadcrumbTop的reducer函数
 * */
import * as C from '~/constants/action'

const arr = sessionStorage.getItem("breadcrumbTopTextArray")?JSON.parse(sessionStorage.getItem("breadcrumbTopTextArray")):[];
const breadcrumbTopTextArray = (state = arr, action) => {
    let newState=[...state]
    if(action.data){
        newState=action.data
    }
    switch (action.type) {
        case C.BREADCRUMB_TOP:
            sessionStorage.setItem("breadcrumbTopTextArray",JSON.stringify(newState));
            return newState;
        default:
            return state;
    }
};
export default breadcrumbTopTextArray;