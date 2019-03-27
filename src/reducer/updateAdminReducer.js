/**
 * @module  spin
 * 处理spin的reducer函数
 * */
import * as C from '~/constants/action'

const updateState = false;
const updateAdmin = (state = updateState, action) => {
    switch (action.type) {
        case C.UPDATE_ADMIN_TRUE:
            state = action.data;
            return state;
        case C.UPDATE_ADMIN_FALSE:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default updateAdmin