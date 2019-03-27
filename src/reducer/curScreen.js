/**
 * @module  curScreen
 * 处理curScreen的reducer函数
 * */
import * as C from '~/constants/action'
/**
 * 更新Dashboard的 curScreen的action
 * */
const screenState = '';
const curScreen = (state = screenState, action) => {
    switch (action.type) {
        case C.CUR_SCREEN:
            state = action.data;
            return state;
        default:
            return state;
    }
};
export default curScreen