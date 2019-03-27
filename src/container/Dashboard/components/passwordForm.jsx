import React from "react";
import MyForm from "~/components/PopForm/form";
import {isEmpty} from "../../../until/common";
import indexDB from "~/until/sessionStorage";
import {Button} from "antd";

export  default class PasswordForm extends  React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentWillMount(){
        this.getInitialPasswordForm()
    }


    // 初始化修改密码表单
    getInitialPasswordForm() {
        //初始化基本信息表单
        let loginRegistWay = sessionStorage.getItem("loginAllocation")?JSON.parse(sessionStorage.getItem("loginAllocation")):{}
        //const pwdRegularOrdinary = /^(?=.*\d)(?=.*[a-z])[^ \t/\\\n\r]{6,18}$/;/*6-18位字母或者数字或者除去空格换行\/tab键的特殊字符，至少包含字母和数字普通的密码校验规则*/
        //const pwdRegularComplex1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){6,18}$/;/*6-18位字母或者数字或者除去空格换行\/tab键的特殊字符，至少包含大小写字母和数字普通的密码校验规则*/
        //const pwdRegularComplex2 = /^(?=.*\d)(?=.*[a-z])(?=.*[^ \t/\\\n\r]){6,18}$/;/*6-18位字母或者数字或者除去空格换行\/tab键的特殊字符，至少包含字母和数字和特殊字符普通的密码校验规则*/
        // let pwdRegular = "";
        // let pwdRegular2 = "";
        // let message = "";
        // if(loginRegistWay.passwordRegularType==2){
        //     pwdRegular = pwdRegularComplex1;
        //     pwdRegular2 = pwdRegularComplex2;

        //     message = "6-18位至少包含大小写字母和数字或者包含字母和数字和特殊字符的密码"
        //     // message = "密码格式不正确"
        // }else{
        //     pwdRegular = pwdRegularOrdinary;
        //     pwdRegular2 = pwdRegularOrdinary;
        //     message = "6-18位至少包含字母和数字的密码"
        //     // message = "密码格式不正确"
        // }
        let passwordRules = new RegExp(loginRegistWay.passwordRules)
        let message = loginRegistWay.codeRules
        this.passwordFormInitData=[
            {
                name:"原始密码",
                keyName:"oldPwd",
                type:"password",
                placeholder:"请输入原始密码",
                rules: [
                    { required: true, message: "请填写原始密码" , whitespace: true },
                    // { validator: (rule, value, callback)=> {
                    //         if (value) {
                    //             if (!pwdRegular.test(value)) {
                    //                 callback(message)
                    //             } else {
                    //                 callback();
                    //             }
                    //         } else {
                    //             callback()
                    //         }
                    //     }
                    // }
                ],
                itemInputStyle:{width:350}
            },
            {
                name:"新密码",
                keyName:"newPwd",
                type:"password",
                placeholder:`请输入新密码`,
                rules: [
                    { required: true, message: "请填写新密码" , whitespace: true },
                    { validator: (rule, value, callback)=> {
                            const form = this.formInstance.props.form;
                            if (value) {
                                if (!passwordRules.test(value)) {
                                    callback(message)
                                } else {
                                    if (value && !isEmpty(form.getFieldValue("reNewPwd"))) {
                                        form.validateFields(["reNewPwd"], { force: true });
                                    }
                                    callback();
                                }
                            } else {
                                callback()
                            }
                        }
                    }
                ],
                itemInputStyle:{width:350}
            },
            {
                name:"确认新密码",
                keyName:"reNewPwd",
                type:"password",
                placeholder:"请再次输入新密码",
                rules: [
                    { required: true, message: "两次密码不一致" , whitespace: true },
                    {
                        validator: (rule, value, callback) => {
                            const form = this.formInstance.props.form;
                            if (value && value !== form.getFieldValue("newPwd")) {
                                callback("两次密码不一致！");
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                itemInputStyle:{width:350}
            }
        ]
    }

    render(){
        const formItemLayout={
            labelCol: { span: 6},//label 标签布局
            wrapperCol: { span: 11 }
        }

        let loginMessage = sessionStorage.getItem(indexDB.loginSession)?JSON.parse(sessionStorage.getItem(indexDB.loginSession)):{}

        return (
            <MyForm
                onOk={(json)=>{return this.props.onOk(json)}} hasFeedback={true}
                formItemLayout={formItemLayout} itemList={this.passwordFormInitData}
                buttonItemLayout={{textAlign:"center"}} okText="保存"
                wrappedComponentRef={(form) => {return this.formInstance = form}}
            >
                {
                    loginMessage.modifyPassword==="yes"?'':
                        <Button onClick={this.props.onCancel} style={{marginRight:10}}>取消</Button>
                }
            </MyForm>
        )
    }
}
