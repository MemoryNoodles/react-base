import 'whatwg-fetch';

class FetchUtil {
    /*初始化*/
    init(){
        this.url           = '';
        this.method        = 'POST';
        this.headers       = {
            'Accept': 'application/json',
        };
        this.mode          = "no-cors";
        this.body_type     = 'form';
        this.bodys         = {};
        this.credentials   = 'include';
        this.return_type   = 'json';
        this.overtime      = 0;
        this.firstThen     = undefined;
        return this;
    }
    /*设置请求路径  不能为空*/
    /**
     *
     * @param url
     * @returns {FetchUtil}
     */
    setUrl(url){
        /*为了能够正确的代理请求 请求的时候会把/api去掉*/
        /*if (process.env.NODE_ENV !== 'production'){
            this.url = "/api" + url;
        }else{
            this.url = url;
        }*/
        this.url = url;
        return this;
    }
    /*设置跨域*/
    setMode(val){
        this.mode = val;
        return this;
    }
    /*设置请求方式  'GET'/'POST'/'PUT'/'DELETE'*/
    setMethod(val){
        this.method = val;
        return this;
    }
    /*设置设置请求body类型 'form'/'file'/'json'*/
    setBodyType(val){
        this.body_type = val;
        return this;
    }
    /*设置返回类型 设置返回data类型 'json'/'text'/'blob'/'formData'/'arrayBuffer'*/
    setReturnType(val){
        this.return_type = val;
        return this;
    }
    /*设置超时时间 设置超时时间，毫秒*/
    setOvertime(val){
        this.overtime = val;
        return this;
    }
    /*设置头部 设置Header，name若为字符串，则name和value为header键值对数据，若name为object，则name为header键值对对象*/
    setHeader(name, val=null){
        if(typeof name === 'string'){
            this.headers[name] = val;
        }else if(typeof name === 'object'){
            Object.keys(name).map((index)=>{
                this.headers[index] = name[index];
            });
        }
        return this;
    }
    /*设置请求参数 设置请求body，参数同上*/
    setBody(name, val=null){
        if(typeof name === 'string'){
            this.bodys[name] = val;
        }else if(typeof name === 'object'){
            Object.keys(name).map((index)=>{
                this.bodys[index] = name[index];
            });
        }
        return this;
    }
    /*设置是否携带cookie信息跨域*/
    setCookieOrigin(){
        this.credentials = 'same-origin';
        return this;
    }
    /*设置是否携带cookie信息*/
    setCookieCors(){
        this.credentials = 'include';
        return this;
    }
    /*设置请求成功后第一个回调方法then，通常用于处理网络返回的第一笔数据，需要将此对象return出去，交由后面的then处理*/
    thenStart(then) {
        this.firstThen = then;
        return this;
    }
    /*执行请求*/
    dofetch(){
        let options         = {};
        options.method      = this.method;
        options.credentials = this.credentials;
        options.mode        = this.mode;
        options.headers = this.headers;
        if(options.mode === "cors"){
            delete options.credentials
        }
        if({} !== this.bodys && this.method !== 'GET'){
            if('form' === this.body_type){
                /*请求数据为form表单对象*/
                let data = new FormData();
                for (let key in this.bodys){
                   /* (typeof this.bodys[key]) ==== 'object' && key !==== 'file' ? this.bodys[key] = JSON.stringify(this.bodys[key]) : this.bodys[key];*/
                    this.bodys[key] !== undefined && data.append(key, this.bodys[key]);
                }
                options.body = data;
            }else if('file' === this.body_type){
                /*请求数据为文件*/
                let data = new FormData();
                Object.keys(this.bodys).map((index) => {
                    data.append(index, this.bodys[index]);
                });
                options.body = data;
            }else if('json' === this.body_type){
                /*请求数据为json数据*/
                options.body = JSON.stringify(this.bodys);
            }
        }
        // console.log(options)
        return Promise.race([
            fetch(this.url,options),
            new Promise((resolve, reject) => {
                setTimeout(() => reject(new Error({message:'request timeout',status:"0"})), this.overtime ? this.overtime : 30 * 1000);
            })
        ]).then(
            (response) => {
                // console.log(response,"1")
                if (this.firstThen) {
                    let tempResponse = this.firstThen(response);
                    if (tempResponse) {
                        return tempResponse;
                    }
                }
                return response;
            }
        ).then(
            (response) => {
                // console.log(response,"2")
                if('json' === this.return_type){
                    let messageText = "";
                    if(response.status!==200){
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
                        return {status:"0",message:messageText||"失败",content:null};
                    }
                    else{
                        return response.json();
                    }

                }else if('text' === this.return_type){
                    return response.text();
                }else if('blob' === this.return_type){
                    return response.blob();
                }else if('formData' === this.return_type){
                    return response.formData();
                }else if('arrayBuffer' === this.return_type){
                    return response.arrayBuffer();
                }
            }
        );
    }

}

export  default FetchUtil;