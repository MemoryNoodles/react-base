import * as C from '~/constants/action'

/**
 * @method setNoReadNewsList
 * 更新未读消息
 * */
export const setNoReadNewsList = (obj) => dispatch => {
    dispatch({
        type: C.SET_NO_READ_NEWS_LIST,
        data:obj
    });
};