import FetchUtil from "./fetch";
import * as Message from "~/components/common/message";

/**
 * Post请求函数
 * @param url 请求路径
 * @param params 请求参数
 * @param mode 是否跨域
 * @returns {Promise<any>}
 * @constructor
 */
export const PostMethod = (url,params,mode=false,returnType="json") => {
    let fetchUtil = new FetchUtil();
    if (process.env.NODE_ENV !== 'production'&&!mode){
        url = "/api" + url;
    }
    return new Promise((resolve,reject)=>{
        fetchUtil.init()
            .setUrl(url)
            .setBody({...params})
            .setMode(mode?"cors":"no-cors")
            .setReturnType(returnType)
            .thenStart((response)=>{
                // console.log(response,"response");
                let messageText = "";
                switch (response.status){
                    case 500:
                        messageText = "服务器异常";
                        break;
                    case 400:
                        messageText = "参数异常";
                        break;
                    case 404:
                        messageText = "接口路径异常";
                        break;
                    case 502:
                        messageText = "请求响应无效";
                        break;
                    case 504:
                        messageText = "网关超时";
                        break;
                    default:
                        messageText = "未知错误";
                }
                return response;
            })
            .dofetch()
            .then((data)=>{
                //判断返回的数据为一个blob对象  即文件流
                if(data.__proto__.constructor.name==="Blob"){
                    resolve(data)
                }else if(data.__proto__.constructor.name === "Object"){ //返回的数据为正常的json数据
                    //状态为1，正常数据
                    if(data&&`${data.status}`==="1"){
                        resolve(data)
                    }
                    else if(data&&`${data.flag}`=== '1'){
                        resolve(data)
                    }
                    /*状态为0  请求状态值不是200*/
                    else if(data&&`${data.status}`==="0"){
                        Message.error(data.message||"失败");
                        reject(data);
                    }
                    else if(data&&`${data.status}`==="3"){
                        Message.error(data.message||"失败");
                        window.location.hash = "";
                    }
                    /*状态为2，异常数据*/
                    else if(data&&`${data.status}`==="2"){
                        Message.error(data.message||"失败");
                        reject(data);
                    }
                }

            })
            .catch((error)=>{
                console.log(error,"error")
                reject(error)
            })
    })

}

/**
 * Post请求函数
 * @param url 请求路径
 * @param params 请求参数
 * @param mode 是否跨域
 * @returns {Promise<any>}
 * @constructor
 */
export const PostMethodNoMessage = (url,params,mode=false,returnType="json") => {
    let fetchUtil = new FetchUtil();
    if (process.env.NODE_ENV !== 'production'&&!mode){
        url = "/api" + url;
    }
    return new Promise((resolve,reject)=>{
        fetchUtil.init()
            .setUrl(url)
            .setBody({...params})
            .setMode(mode?"cors":"no-cors")
            .setReturnType(returnType)
            .thenStart((response)=>{
                let messageText = "";
                switch (response.status){
                    case 500:
                        messageText = "服务器异常";
                        break;
                    case 400:
                        messageText = "参数异常";
                        break;
                    case 404:
                        messageText = "接口路径异常";
                        break;
                    case 502:
                        messageText = "请求响应无效";
                        break;
                    case 504:
                        messageText = "网关超时";
                        break;
                    default:
                        messageText = "未知错误";
                }
                return response;
            })
            .dofetch()
            .then((data)=>{
                //判断返回的数据为一个blob对象  即文件流
                if(data.__proto__.constructor.name==="Blob"){
                    resolve(data)
                }else if(data.__proto__.constructor.name === "Object"){ //返回的数据为正常的json数据
                    console.log(data, 1212121212)
                    //状态为1，正常数据
                    if(data&&`${data.status}`==="1"){
                        resolve(data)
                    }
                    else if(data&&`${data.flag}`=== '1'){
                        resolve(data)
                    }
                    /*状态为0  请求状态值不是200*/
                    else if(data&&`${data.status}`==="0"){
                        reject(data);
                    }
                    /*状态为2，异常数据*/
                    else if(data&&`${data.status}`==="2"){
                        reject(data);
                    }
                }
            })
            .catch((error)=>{
                reject(error)
            })
    })
}