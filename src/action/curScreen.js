import * as C from '~/constants/action'

/**
 * 更新Dashboard的 curScreen的action
 * */
export const curScreen = (data) => ({
    type: C.CUR_SCREEN,
    data: data
});