import * as Actions from '~/constants/action';
/**
 * @method spinLoadingTrue
 * 显示loading的action
 * */
export const updateAdminTrue = dispatch => {
    dispatch({
        type: Actions.UPDATE_ADMIN_TRUE,
        data: true
    });
};
/**
 * @method spinLoadingFalse
 * 关闭loading的action
 * */
export const updateAdminFalse = dispatch => {
    dispatch({
        type: Actions.UPDATE_ADMIN_FALSE,
        data: false
    });
};
