import {message} from "antd";
let domain = require('domain');

/**
 * 创建websocket请求
 * @param cb 回调函数
 * @param api 请求路径
 */
export function createWebSocket (cb,api){
    this.websocket=null;
    this.lockReconnect = true;//避免ws重复连接
    this.customClose=false;//是否手动关闭socket
    let reconnectCount=0;//重连计数

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = ()=> {
        this.closeWebSocket();
    }
    //手动关闭WebSocket连接
    this.closeWebSocket= ()=> {
        this.customClose = true;
        this.lockReconnect = false;//关闭下一次重连
        this.websocket&&this.websocket.close();
    }
    // 初始化
    this.doEvent= (cb) =>{
        this.websocket.onopen = function(evnt) {
            console.log("打开websocket连接");
        };
        this.websocket.onmessage = (evnt)=> {
            cb(evnt.data)
        };

        this.websocket.onerror = (evnt)=> {
            console.log("websocket连接失败");
        };
        this.websocket.onclose = (evnt)=> {
            console.log("websocket连接关闭",this.lockReconnect);
            // 创建域d
            let d = domain.create();
            d.run(this.reconnect)
            d.on('error',(err)=>{
                console.log("d手动捕捉webSocket reconnect异常：",err);
            });
        }
    }

    //重连WebSocket连接
    this.reconnect= ()=> {
        //若this.lockReconnect 为false 或 手动关闭, 则返回
        if(!this.lockReconnect||this.customClose) {return;}
        this.lockReconnect = true;//打开下一次重连
        reconnectCount++;

        if(reconnectCount<=5){ //重连超过5次则关闭重连
            // 创建域d
            let d = domain.create();
            //创建socket
            d.run(()=>{
                //3s后：请求一次重连
                setTimeout(() => {
                    console.log("重连" + reconnectCount + "中...")
                    this.open()
                    this.lockReconnect = true;//打开下一次重连
                }, 3000);
            })
            d.on('error',(err)=>{
                console.log("d手动捕捉webSocket reconnect：",err);
            });
        }else{
            this.closeWebSocket()
            this.websocket=null
            /*message.error("服务器出小差啦! 即将跳转登录页...",3)
            setTimeout(()=>{
                window.location.hash="#/"
            },3000)*/
        }
    }


    //打开WebSocket连接
    this.open= ()=>{
        try {
            if(api) {
                if ('WebSocket' in window) {
                    this.websocket = new WebSocket(window.location.origin.replace(/^http/, 'ws') + api);
                }else {
                    console.log("该浏览器不支持 WebSocket！")
                }
                // 初始化
                this.doEvent(cb);
            }else{
                console.log("WebSocket Api 未定义！")
            }
        } catch (e) {
            console.log("打开WebSocket连接异常：",e);
        }
    }
    //发送消息
    this.doSend= ()=> {
        if (this.websocket.readyState === this.websocket.OPEN) {
            let msg="hello  world"
            //调用后台handleTextMessage方法
            this.websocket.send(msg);
        } else {
            // console.log("websocket连接失败!");
            this.lockReconnect = true;
        }
    }


    // 创建域d
    let d2 = domain.create();
    //创建socket
    d2.run(this.open)
    d2.on('error',(err)=>{
        console.log("d2手动捕捉webSocket open异常：",err);
    });
}

