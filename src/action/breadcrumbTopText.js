import * as C from '~/constants/action'

/**
 * @method BreadcrumbTopText
 * 更新BreadcrumbTopText的action
 * */
export const breadcrumbTopText = (data) => ({
    type: C.BREADCRUMB_TOP,
    data: data
});