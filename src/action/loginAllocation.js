import * as C from '~/constants/action';
/**
 * @method loginAllocation
 * 显示loading的action
 * */
export const loginAllocation = (json) => dispatch => {
    dispatch({
        type: C.LOGIN_ALLOCATION,
        json
    });
};