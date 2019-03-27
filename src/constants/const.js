/**
 * @module  const
 * 常用的静态常量
 * */

// 全局分页条数
export const PAGE_SIZE_OPTIONS = ["10","20","30"]

// 全局Table滚动高度
export const TABLE_SCROLL_Y = 550

// 加载组件延迟时间（毫秒）
export const DELAY_TIME = 1000

// 容器媒体查询
export const QUERY = {
    'screen-xs': {
        maxWidth: 575, /*手机*/
    },
    // 'screen-sm': {
    //     minWidth: 576,
    //     maxWidth: 767,
    // },
    'screen-md': { /*ipad*/
        minWidth: 576,
        maxWidth: 991,
    },
    'screen-lg': { /*大屏电脑*/
        minWidth: 992,
        // maxWidth: 1199,
    },
    // 'screen-xl': {
    //     minWidth: 1200,
    //     maxWidth: 1599,
    // },
    // 'screen-xxl': {
    //     minWidth: 1600,
    // },
};




