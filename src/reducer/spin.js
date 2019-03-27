/**
 * @module  spin
 * 处理spin的reducer函数
 * */
import * as C from '~/constants/action'

const spinState = false;
const spin = (state = spinState, action) => {
    switch (action.type) {
        case C.SPIN_LOADING_TRUE:
            state = action.data;
            return state;
        case C.SPIN_LOADING_FALSE:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default spin