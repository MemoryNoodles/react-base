/**
 * @module  loginAllocation
 * 处理allocation的reducer函数
 * */
import * as C from '~/constants/action'

let loginState = {};
const loginAllocation = (state = loginState, action) => {

    switch (action.type) {
        case C.LOGIN_ALLOCATION:
            sessionStorage.setItem("loginAllocation",JSON.stringify(action.json));
            return Object.assign({}, state, action.json);
        default:
            return state;
    }
};

export default loginAllocation;