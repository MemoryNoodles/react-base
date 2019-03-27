import * as Actions from '~/constants/action';
/**
 * @method spinLoadingTrue
 * 显示loading的action
 * */
export const spinLoadingTrue = dispatch => {
    dispatch({
        type: Actions.SPIN_LOADING_TRUE,
        data: true
    });
};
/**
 * @method spinLoadingFalse
 * 关闭loading的action
 * */
export const spinLoadingFalse = dispatch => {
    dispatch({
        type: Actions.SPIN_LOADING_FALSE,
        data: false
    });
};
