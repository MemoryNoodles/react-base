import React from "react";
import { Breadcrumb} from "antd";

/*
* 内部面包屑
* 主要用于：目录管理、字典表管理
* */
let InternalBreadcrumb = (props) => {
    return (
        <Breadcrumb style={{paddingBottom: 12}}>
            <Breadcrumb.Item style={{color:"rgba(0,0,0,.45)"}}>位置:</Breadcrumb.Item>
            {
                props.breadcrumbsData.map((item, index) => {
                    if(index !== props.breadcrumbsData.length-1){
                        return (
                            <Breadcrumb.Item key={index}>
                                <a style={{padding:0,color:"rgba(0,0,0,.45)"}} href="javascript:;"
                                   onClick={() => {
                                       props.getPageData(item.id, item.name, true, item.status);
                                   }}>{item.name}</a>
                            </Breadcrumb.Item>
                        )
                    }else{
                        return <Breadcrumb.Item key={index} style={{color:"rgba(0,0,0,.45)"}}>{item.name}</Breadcrumb.Item>
                    }
                })
            }
        </Breadcrumb>
    )
};
export default InternalBreadcrumb