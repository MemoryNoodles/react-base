/**
 * @component  unOpen
 * @param  {Boolean} 暂未开发组件
 * */
import React from 'react';
import Img from "~/layouts/image/un-open.jpg"

const UnOpen = () => {
    return (
        <div className="fmc">
            <img src={Img} alt="暂未开放"/>
        </div>
    )
};

export default UnOpen