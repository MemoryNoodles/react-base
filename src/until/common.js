import CryptoJS from "crypto-js"
/**
 * 判断JS变量是否空值
 * 如果是 undefined， null， ""， NaN，false，0，[]，{} ，含有空格的空白字符串，都返回true，否则返回false
 * @param v(变量v)
 * @returns {boolean}
 */
export function isEmpty(v) {
    switch (typeof v) {
        case "undefined":
            return true;
        case "string":
            // 去掉空格、换行
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length === 0) {return true;}
            break;
        case "boolean":
            if (!v) {return true;}
            break;
        case "number":
            if (v === 0 || isNaN(v)) {return true;}
            break;
        case "object":
            if (v === null || v.length === 0) {return true;}
            for (const i in v) {
                return false;
            }
            return true;
    }
    return false;
}

/**
 * 文件下载（通过接口）(get)
 * url：下载地址
 * paramsObj：请求参数
 */
export function loadFileByGet(url,paramsObj) {
    let str = ""
    if (paramsObj === null) {
        str = "";
    } else {
        for (let key in paramsObj) {
            str+=`${key}=${paramsObj[key]}&`
        }
        //去掉最后一个&
        str=str.slice(0,-1)
    }

    // console.log(`${url}?${str}`,"url")
    const w = window.open("about:blank")
    w.window.location.href = `${url}?${str}`

    //3s后关闭窗口
    setTimeout(function () {
        w.close()
    },3000)
}

/**
 * 保留两位小数
 * 功能：将浮点数四舍五入，取小数点后2位
 * @returns {number}
 */
export function toDecimal(x) {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return;
    }
    // f = Math.round(x*100)/100;
    f = f.toFixed(1);
    return f;
}
// 检查被禁用的权限
export function isForbidden(url) {
    if(sessionStorage.getItem('forbiddenPath')!=="undefined") {
        if(JSON.parse(sessionStorage.getItem('forbiddenPath'))
            && JSON.parse(sessionStorage.getItem('forbiddenPath')).indexOf(url) != -1){
            return true;
        }
        return false
    }
    return false;
}

/**
 * 获取当前时间
 * v: year,month,date,datetime
 */
export function getNowTime(v) {
    // 获取当前日期
    const obj = new Date();
    const year = obj.getFullYear();
    let month; let day;

    if (obj.getMonth() < 10) {
        month = `0${obj.getMonth() + 1}`;
    }
    if (obj.getDate() < 10) {
        day = `0${obj.getDate()}`;
    }
    switch (v) {
    case "year":
        return year;
        break;
    case "month":
        return `${year}/${month}`;
        break;
    case "date":
        return `${year}/${month}/${day}`;
        break;
    case "datetime":
        return `${year}/${month}/${day}`;
        break;
    default:
        return null;
    }
}

/* set cookie */
export function setCookie(name, value, Days) {
    if (Days == null || Days == "") {
        Days = 300;
    }
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)}; path=/;expires=${exp.toGMTString()}`;
    // document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/* get cookie */
export function getCookie(name) {
    let result = null;
    // 对cookie信息进行相应的处理，方便搜索
    const myCookie = `${document.cookie};`;
    const searchName = `${name}=`;
    let startOfCookie; let endOfCookie = 0;
    startOfCookie = myCookie.indexOf(searchName);
    if (startOfCookie != -1) {
        startOfCookie += searchName.length;
        endOfCookie = myCookie.indexOf(";", startOfCookie);
        result = (myCookie.substring(startOfCookie, endOfCookie));
    }
    return result;
}
/* get all cookie */
export function getAllCookie() {
    return document.cookie;
}

/* clear cookie */
export function clearCookie(name) {
    setCookie(name, "", -1);
}
/* del cookie */
export function delCookie(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) { document.cookie = `${name}=${cval}; path=/;expires=${exp.toGMTString()}`; }
}


/**
 * 判断数字 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNumber(inp, message) {
    const number = /^[0-9]*$/;

    const idVal = inp.value;
    if (idVal) {
        if (number.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "必须为数字！";
        return false;
    }
    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断数字 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 * */
export function cNullNumber(inp, message) {
    const idVal = inp.value;
    const number = /^[0-9]*$/;
    if (idVal) {
        if (number.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "必须为数字！";
        return false;
    }
    message.innerHTML = "";
    return true;
}

/* 字母加下划线验证 */
export function aOrUnder(inp, message, num) {
    const idVal = inp.value;
    let reg = new RegExp();
    if (num == "25") {
        reg = /^([a-zA-Z_]){1,25}$/;
    }
    if (idVal) {
        if (reg.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = `请输入${num}个字以内的字母或者下划线！`;
        return false;
    }
    message.innerHTML = "";
    return true;
}

/**
 * 判断手机号或者公司座机号 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cPhone(inp, message) {
    const tel = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
    // const tel= /^(1[34578]\d{9})|((0\d{2,3}-)?\d{7,8}(-\d{1,6})?)$/;
    const idVal = inp.value;

    if (idVal) {
        if (tel.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "请填写正确的电话号码！";
        return false;
    }

    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断手机号 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullPhone(inp, message) {
    const idVal = inp.value;
    const tel = /^1[345789]\d{9}$/;
    if (idVal) {
        if (tel.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "请填写正确的电话号码！";
        return false;
    }
    message.innerHTML = "";
    return true;
}

/**
 * 判断座机号 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cFixPhone(inp, message) {
    const idVal = inp.value;
    const telPhon = /^(0\d{2,3}-)?\d{7,8}(-\d{1,6})?$/;
    if (idVal) {
        if (telPhon.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "座机号码有误！";
        return false;
    }

    message.innerHTML = "！不能为空";
    return false;
}
/**
 * 判断座机号 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullFixPhone(inp, message) {
    const idVal = inp.value;
    const telPhon = /^(0\d{2,3}-)?\d{7,8}(-\d{1,6})?$/;
    if (idVal) {
        if (telPhon.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "座机号码有误！";
        return false;
    }
    message.innerHTML = "";
    return true;
}
/**
 * 判断密码 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cPassword(inp, message) {
    const idVal = inp.value;
    const passWord = /^\b[a-zA-Z0-9]{1,1}[a-zA-Z0-9_!~@#$]{5,17}\b$/;
    if (idVal) {
        if (passWord.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "密码为6-18位字符包含_!~@#$！";
        return false;
    }

    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断密码 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullPassword(inp, message) {
    const idVal = inp.value;
    const passWord = /^\b[a-zA-Z0-9]{1,1}[a-zA-Z0-9_!~@#$]{5,17}\b$/;
    if (idVal) {
        if (passWord.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "密码为6-18位字符包含_!~@#$！";
        return false;
    }
    message.innerHTML = "";
    return true;
}

/**
 * 判断确认密码 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cPasswordJudge(inp, inp1, message) {
    const inpValue = inp.value;
    const idVal = inp.value;
    const passWord = /^\b[a-zA-Z0-9]{1,1}[a-zA-Z0-9_!~@#$]{5,17}\b$/;
    if (passWord.test(idVal) && passWord.test(inpValue)) {
        if (idVal != inpValue) {
            message.innerHTML = "两次密码不一致！";
            return false;
        }

        message.innerHTML = "";
        return true;
    }

    message.innerHTML = "密码为6-18位字符包含_!~@#$！";
    return false;
}
/**
 * 判断QQ号 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cQQ(inp, message) {
    const idVal = inp.value;
    const qq = /^\d{5,13}$/;
    if (idVal) {
        if (qq.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "QQ输入有误！";
        return false;
    }
    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断QQ号 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullQQ(inp, message) {
    const idVal = inp.value;
    const qq = /^\d{5,13}$/;
    if (idVal) {
        if (qq.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "QQ输入有误！";
        return false;
    }
    message.innerHTML = "";
    return true;
}
/**
 * 判断地址 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cAddress(inp, message) {
    const idVal = inp.value;
    const address = /^([\u4e00-\u9fa5]|[A-Za-z0-9_#-]){0,60}$/;
    if (idVal) {
        if (address.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "地址有误！";
        return false;
    }

    message.innerHTML = "！不能为空";
    return false;
}
/**
 * 判断邮箱 必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cEmail(inp, message) {
    const idVal = inp.value;
    const email = /^\w+\@\w+\.[a-z]+$/;
    if (idVal) {
        if (email.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "邮箱有误！";
        return false;
    }

    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断邮箱 非必填
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullEmail(inp, message) {
    const idVal = inp.value;
    const email = /^\w+\@\w+\.[a-z]+$/;
    if (idVal) {
        if (email.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "邮箱有误！";
        return false;
    }

    message.innerHTML = "";
    return true;
}
/**
 * 判断时间 必填  格式为(yyyy-MM-dd)
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cDate(inp, message) {
    const idVal = inp.value;
    const time = /^\d{4}\-\d{2}\-\d{2}$/;
    if (idVal) {
        if (time.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "时间格式有误(yyyy-MM-dd)！";
        return false;
    }

    message.innerHTML = "不能为空！";
    return false;
}
/**
 * 判断时间 非必填  格式为(yyyy-MM-dd)
 * inp：输入框的内容
 * message:错误提示的Dom对象
 */
export function cNullDate(inp, message) {
    const idVal = inp.value;
    const time = /^\d{4}\-\d{2}\-\d{2}$/;
    if (idVal) {
        if (time.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "时间格式有误(yyyy-MM-dd)！";
        return false;
    }

    message.innerHTML = "";
    return true;
}
/**
 * 判断试题答案用分号隔开
 * inp：输入框的内容
 * message:错误提示的Dom对象
 * */
/* 判断试题答案用逗号隔开  必填 */
export function cTest(inp, message) {
    const idVal = inp.value;
    const judge = /^[\dA-Z\u4e00-\u9fa5]+(,[\dA-Z\u4e00-\u9fa5]+)*$/;
    if (idVal) {
        if (judge.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "答案请用,隔开！";
        return false;
    }
    message.innerHTML = "不能为空！";
    return false;
}
/* 判断试题答案用逗号隔开  非必填 */
export function cNullTest(inp, message) {
    const idVal = inp.value;
    const judge = /^[^,]+(,[^,]+)*$/;
    if (idVal) {
        if (judge.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "答案请用,隔开！";
        return false;
    }
    message.innerHTML = "";
    return true;
}
/*
 * 试题选项内容   必填 */
export function cTestValue(inp, message) {
    const idVal = inp.value;
    const judge = /^(A.[^.]+)(;B.[^.]+)(;C.[^.]+)(;D.[^.]+)?$/;
    if (idVal) {
        if (judge.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "选项内容之间请用;隔开！";
        return false;
    }

    message.innerHTML = "不能为空！";
    return false;
}
/*
 * 试题选项内容   非必填 */
export function cNullTestValue(inp, message) {
    const idVal = inp.value;
    const judge = /^(A.[^.]+)(;B.[^.]+)(;C.[^.]+)(;D.[^.]+)?$/;
    if (idVal) {
        if (judge.test(idVal)) {
            message.innerHTML = "";
            return true;
        }

        message.innerHTML = "选项内容之间请用;隔开！";
        return false;
    }

    message.innerHTML = "";
    return true;
}
/**
 * 将毫秒数转换格式(xx年xx月xx日)   可以自定义格式
 * time：显示的毫秒数
 * */
export function ConvertMilliToDate(time) {
    date = new Date(time);
    const year = `${date.getFullYear()}-`;
    const month = `${date.getMonth() + 1}-`;// 月数需要+1
    let date = date.getDate();
    return [year, month, date];// 返回已转换的日期格式
}
/**
 * 将毫秒数 转换为yyy-MM-dd
 *time：毫秒数
 * */
export function toDate(time, str) {
    const date = new Date(parseInt(time));
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    const datestr = date.getFullYear() + str + month + str + day;
    return datestr;
}

/**
 *判断是否存在该类名
 *obj：Dom对象
 *className:类名
 * */
export function hasClass(obj, className) {
    const arr = obj.className.split(" ");
    if (arr.indexOf(className) != -1) {return true}
    return false;
}
/**
 * 添加类名
 * obj:Dom对象
 * className:要添加的类名
 * */
export function addClass(obj, className) {
    if (obj.className == "") {
        // 如果原来没有class
        obj.className = className;
    } else {
        const arrClassName = obj.className.split(" ");
        const _index = arrClassName.indexOf(className);
        if (_index == -1) {
            // 如果要添加的class在原来的class中不存在
            obj.className += ` ${className}`;
        }
        // 如果要添加的class在原来的class中存在,则不需要做任何事
    }
}

/**
 * 移除类名
 * obj:Dom对象
 * className:要添加的类名
 * */
export function removeClass(obj, className) {
    // 如果原来有class{
    if (obj.className != "") {
        const arrClassName = obj.className.split(" ");
        const _index = arrClassName.indexOf(className);
        if (_index != -1) {
            arrClassName.splice(_index, 1); // 删除需要删除的calss
            obj.className = arrClassName.join(" "); // 然后将arrClassName数组拼接起来
        }
    }
}
/**
 * 获取对象属性值（兼容IE）
 * obj:Dom对象
 * attr:要获取的属性名
 */
export function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    return getComputedStyle(obj, null)[attr];
}

/**
 * 阻止冒泡(兼容IE)
 * event:传的事件e
 * */
export function stopPropagation(event) {
    if (event.stopPropagation()) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}
/**
 * 阻止默认(兼容IE)
 * event:传的事件e
 * */
export function preventDefault(event) {
    if (event.preventDefault()) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

/*
* aes加密函数
*  传回来的是字符串  如果为对象就先JSON.stringfy一下；
* */
export function Encrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("!LeCai_kefu@#$++");

    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

/**
 * 解密函数
 * 传回来的是加密过后的字符串  注意要和加密的密钥要一致
 */
export function Decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("!LeCai_kefu@#$++");

    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

/**
 * 页面中tab切换的设置sessionStorage
 * @param key  在这个对象的key值，value:
 */
export function tabChangeSetSession(key,value){
    const tabChangeSaveObject = sessionStorage.getItem("tabChangeSaveObject")?JSON.parse(Decrypt(sessionStorage.getItem("tabChangeSaveObject"))):{};
    tabChangeSaveObject[key] = value;
    sessionStorage.setItem("tabChangeSaveObject",Encrypt(JSON.stringify(tabChangeSaveObject)))
}
/**
 * 页面中tab切换的获取sessionStorage
 * @param key  在这个对象的key值，value:
 */
export function tabChangeGetSession(key){
    const tabChangeSaveObject = sessionStorage.getItem("tabChangeSaveObject")?JSON.parse(Decrypt(sessionStorage.getItem("tabChangeSaveObject"))):{};
    return tabChangeSaveObject[key];
}

/*
* session加密设置
* */
export function encryptionSetSession(key,value){
    switch(typeof value){
        case "object":
        case "string":
    }
}






