/**
 * antd组件的validator调用
 */
export function validator(value, callback, checkMethod, message, extraParams) {
    if (value && !checkMethod(value, extraParams)) {
        callback(message)
    } else {
        // 注意: 必须总是返回一个 callback，否则submit的validateFieldsAndScroll 无法响应
        callback()
    }
}
/**
 * 判断登录名
 * value：校验值
 * return boolean
 */
export function checkLoginName(value) {
    const exp = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
    return value && exp.test(value)
}
/**
 * 判断密码
 * value：校验值
 * return boolean
 */
export function checkPassword(value) {
    const exp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_~!@#$]{6,16}$/;
    return value && exp.test(value)
}
/**
 * 判断手机号
 * value：校验值
 * return boolean
 */
export function checkPhone(value) {
    const exp = /^1[345789]\d{9}$/;
    return value && exp.test(value)
}
/**
 * 判断固定电话
 * value：校验值(0821-2567113)
 * return boolean
 */
export function checkFixPhone(value) {
    const exp = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
    return value && exp.test(value)
}
/*
* 判断正整数（含0）
* value：校验值
* return boolean
* */
function trim(str){//去除掉字符串前后空格
    return `${str}`.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}
export function checkPositiveNum(value) {
    let newValue=trim(value)
    const exp = /^[0-9]+$/;
    console.log("判断正整数:",newValue,exp.test(newValue))
    return value && exp.test(newValue)
}
/**
 * 判断QQ号
 * value：校验值
 * return boolean
 */
export function checkQQ(value) {
    const exp = /^\d{5,13}$/;
    return value && exp.test(value)
}
/**
 * 判断数字
 * value：校验值
 * return boolean
 */
export function checkNumber(value) {
    const exp = /^[0-9]*$/;
    if(value == "0"){
        return exp.test(value)
    }
    return value && exp.test(value)
}
/**
 * 判断小数位数不超过两位
 * value：校验值
 * return boolean
 */
export function checkFloatNumberFix2(value) {
    const exp = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
    return value && exp.test(value)
}
export function checkFloatNumberFix1(value,extraParams={}) {
    const exp = /^\d{0,8}\.{0,1}(\d{0,1})$/;
    const {
        min,
        max
    } = extraParams
    if (min && max) {
        return parseFloat(value) >= min && parseFloat(value) <= max
    }
    if (min) {
        return parseFloat(value) >= min
    }
    if (max) {
        return parseFloat(value) <= max
    }
    return value && exp.test(value)
}
/**
 * 判断数字范围
 * value：校验值
 * extraParams:{min:0,max:100}
 * return boolean
 */
export function checkNumberRange(value, extraParams) {
    const {
        min,
        max
    } = extraParams
    if (value) {
        //验证是否为数字(小数位数不超过两位)
        if (!checkFloatNumberFix1(value)) {
            return false
        }
        if (min && max) {
            return parseFloat(value) >= min && parseFloat(value) <= max
        }
        if (min) {
            return parseFloat(value) >= min
        }
        if (max) {
            return parseFloat(value) <= max
        }
    } else {
        return false
    }
}
/**
 * 判断数字范围
 * value：校验值
 * extraParams:{min:1,max:99}
 * return boolean
 */
export function checkPassStandard(value) {
    const exp = /^([1-9][0-9]{0,1})$/;
    return value && exp.test(value)
}


/*
* IP地址验证
* value: 校验值
* return boolean
* */
export function checkIPaddress(value) {
    const exp = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
    return value && exp.test(value)
}


/**
 * 判断身份证
 * value：校验值
 * return boolean
 */
export function checkIDcard(value) {
    let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
    //号码规则校验
    if(!format.test(value)){
        // return {'status':0,'msg':'身份证号码不合规'};
        return false
    }
    //区位码校验
    //出生年月日校验   前正则限制起始年份为1900;
    let year = value.substr(6,4),//身份证年
        month = value.substr(10,2),//身份证月
        date = value.substr(12,2),//身份证日
        time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
        now_time = Date.parse(new Date()),//当前时间戳
        dates = (new Date(year,month,0)).getDate();//身份证当月天数
    if(time>now_time||date>dates){
        // return {'status':0,'msg':'出生日期不合规'}
        return false
    }
    //校验码判断
    let c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
    let b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
    let value_array = value.split("");
    let sum = 0;
    for(let k=0;k<17;k++){
        sum+=parseInt(value_array[k])*parseInt(c[k]);
    }
    return value[17].toUpperCase() == b[sum%11].toUpperCase()
}
/**
 * 判断银行卡号
 * value：校验值
 * return boolean
 */
export function checkBankID(value) {
    console.log(value,"value")

    let lastNum = value.substr(value.length - 1, 1); //取出最后一位（与luhn进行比较）
    let first15Num = value.substr(0, value.length - 1); //前15或18位
    let newArr = new Array();
    for (let i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i, 1));
    }
    let arrJiShu = new Array(); //奇数位*2的积 <9
    let arrJiShu2 = new Array(); //奇数位*2的积 >9
    let arrOuShu = new Array(); //偶数位数组
    for (let j = 0; j < newArr.length; j++) {
        if ((j + 1) % 2 == 1) { //奇数位
            if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
            else arrJiShu2.push(parseInt(newArr[j]) * 2);
        } else //偶数位
            arrOuShu.push(newArr[j]);
    }

    let jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
    let jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
    for (let h = 0; h < arrJiShu2.length; h++) {
        jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
        jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
    }

    let sumJiShu = 0; //奇数位*2 < 9 的数组之和
    let sumOuShu = 0; //偶数位数组之和
    let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
    let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
    let sumTotal = 0;
    for (let m = 0; m < arrJiShu.length; m++) {
        sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
    }

    for (let n = 0; n < arrOuShu.length; n++) {
        sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
    }

    for (let p = 0; p < jishu_child1.length; p++) {
        sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
        sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
    }
    //计算总和
    sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

    //计算luhn值
    let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
    let luhn = 10 - k;

    return lastNum == luhn
}