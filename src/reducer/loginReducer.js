/**
 * @module  loginReducer
 * 处理login的reducer函数
 * */
import * as C from '~/constants/action'

let loginSession = sessionStorage.getItem('loginSession');
let loginState = {};
loginSession ? loginState = JSON.parse(loginSession) : loginState = {};
const loginReducer = (state = loginState, action) => {
    switch (action.type) {
        case C.LOGIN_INFORMATION:
            sessionStorage.setItem('loginSession', JSON.stringify(action.data));
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

export default loginReducer;