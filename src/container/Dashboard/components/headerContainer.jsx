/**
 * Created with react_project.
 * User: 王洪瑞/3153981409@qq.com
 * Date: 2019/2/19
 * Time: 16:03
 *
 */
import React from "react";
import { connect } from "react-redux";
import Api from "~/until/api";
import { PopForm } from "cake-ui";
import { isEmpty } from "~/until/common";
import { QUERY } from "~/constants/const";
import { updateAdminFalse } from "~/action/updateAdminAction";
import { breadcrumbTopText } from "~/action/breadcrumbTopText";
import { curScreen } from "~/action/curScreen";
import BreadcrumbTop from "~/components/common/BreadcrumbTop";
import * as Message from "~/components/common/message";
import { ContainerQuery } from 'react-container-query';//容器媒体查询
import MessageBox from "./MessageBox";
import { Dropdown, Menu, Icon, Modal, Layout } from "antd";
import avatar from "~/layouts/image/avatar.png";
import "./headercontainter.less"

const { Header } = Layout;

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curScreen:'',
            updatePwdVisible: false,
            photoUrl: sessionStorage.getItem("loginSession")
                ? JSON.parse(sessionStorage.getItem("loginSession")).photoUrl
                : avatar,
            newMessage: {},
            messageNum: "",
        };
        this.initData = {};
        this.flag = true;
    }

    static getDerivedStateFromProps=(props,prevState)=>{
        const {curScreen} = props

        if(curScreen!==prevState.curScreen){
            return {
                curScreen
            }
        }
    }

    componentDidMount = () => {
        let modifyPassword = sessionStorage.getItem("modifyPassword");
        if (modifyPassword === "yes") {
            this.openUpdatePwd(false);
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.updateAdmin !== this.props.updateAdmin && this.props.updateAdmin) {
            Api.queryEntity().then(res => {
                const { admin = {} } = res.content;
                this.setState({
                    photoUrl: admin.photoUrl,
                    name: admin.realName
                });
                let obj = sessionStorage.getItem("loginSession")
                    ? JSON.parse(sessionStorage.getItem("loginSession"))
                    : {};
                obj.photoUrl = admin.photoUrl;
                sessionStorage.setItem("loginSession", JSON.stringify(obj));
                updateAdminFalse(this.props.dispatch);
                this.flag = false;
            });
        }
    }
    /**
     * 显示修改密码弹窗
     */
    openUpdatePwd = (canClose = true) => {
        // this.props.dispatch(breadcrumbTopText(["设置", "个人资料"]));
        let loginRegistWay = sessionStorage.getItem("loginAllocation")
            ? JSON.parse(sessionStorage.getItem("loginAllocation"))
            : {};
        let passwordRules = new RegExp(loginRegistWay.passwordRules);
        let messageText = loginRegistWay.codeRules;
        this.initData = {
            title: "修改密码",
            itemList: [
                {
                    name: "原始密码",
                    keyName: "oldPwd",
                    type: "password",
                    placeholder: "请输入原始密码",
                    rules: [
                        {
                            required: true,
                            message: "请填写原始密码",
                            whitespace: true
                        }
                    ]
                },
                {
                    name: "新密码",
                    keyName: "newPwd",
                    type: "password",
                    placeholder: `请输入新密码`,
                    rules: [
                        {
                            required: true,
                            message: "请填写新密码",
                            whitespace: true
                        },
                        {
                            validator: (rule, value, callback, form) => {
                                if (value) {
                                    if (!passwordRules.test(value)) {
                                        callback(messageText);
                                    } else {
                                        if (
                                            value &&
                                            !isEmpty(
                                                form.getFieldValue("reNewPwd")
                                            )
                                        ) {
                                            form.validateFields(["reNewPwd"], {
                                                force: true
                                            });
                                        }
                                        callback();
                                    }
                                } else {
                                    callback();
                                }
                            }
                        }
                    ]
                },
                {
                    name: "确认新密码",
                    keyName: "reNewPwd",
                    type: "password",
                    placeholder: "请再次输入新密码",
                    rules: [
                        {
                            required: true,
                            message: "请再次输入新密码",
                            whitespace: true
                        },
                        {
                            validator: (rule, value, callback, form) => {
                                if (
                                    value &&
                                    value !== form.getFieldValue("newPwd")
                                ) {
                                    callback("两次密码不一致！");
                                } else {
                                    callback();
                                }
                            }
                        }
                    ]
                }
            ],
            onCancel: () => {
                this.setState({ updatePwdVisible: false });
            },
            canClose,
            closable: false,
            maskClosable: false,
            onOk: json => {
                Api.modifyPassword(json)
                    .then(res => {
                        Message.success(res.message + ",一秒后将跳转至登录页");
                        setTimeout(() => {
                            // 跳转到登录页面
                            window.location.hash = "#/";
                        }, 1000);
                    })
                    .catch(res => {
                        Message.error(res.message);
                    });
            },
            modalWidth: 600
        };
        this.setState({ updatePwdVisible: true });
    };
    /*跳转至个人资料页面*/
    toPersonInfo = () => {
        this.props.dispatch(breadcrumbTopText(["设置", "个人资料"]));
        this.props.history.push("/Dashboard/PersonManagement/personInfo");
    };
    logout = () => {
        Modal.confirm({
            title: `您确定退出登录吗？`,
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                Api.logout().then(res => {
                    // 手动清空session
                    sessionStorage.clear();
                    this.props.history.push("/login");
                });
            }
        });
    };

    render() {
        const {curScreen } = this.state;
        const menu = (
            <Menu selectable>
                <Menu.Item key="0">
                    <a href="javascript:;" onClick={this.toPersonInfo}>
                        个人资料
                    </a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="javascript:;" onClick={this.openUpdatePwd}>
                        修改密码
                    </a>
                </Menu.Item>
                {/*退出*/}
                <Menu.Item>
                        <a
                            
                            href="javascript:;"
                            onClick={this.logout}
                        >
                           
                            {curScreen==='mobile' ? "" : "退出"}
                        </a>
                 </Menu.Item>
            </Menu>
        );
        const loginInfo = sessionStorage.getItem("loginSession")
            ? JSON.parse(sessionStorage.getItem("loginSession"))
            : {};

        return (
            <Header className="header-container"
                    style={{paddingLeft:curScreen==='big-screen'? 180 : 30}}>
                {/*收缩菜单（仅手机屏显示）*/}
                {
                    curScreen==='mobile'?
                        <Icon
                            className="collapsed-btn"
                            type={"menu-unfold"}
                            onClick={() => {this.props.changeMenuCollapse()}}
                        /> : ""
                }
                
                {/* 面包屑（仅大屏显示） */}
                {
                    curScreen==='big-screen' ?
                        <BreadcrumbTop style={{ margin: "16px 0", flex: 1 }} /> : ""
                }

                <div className={curScreen==='mobile'? "logout-mobile logout" : "logout"}>
                    {/*消息*/}
                    {/*<MessageBox
                        newMessage={this.state.newMessage}
                        messageNum={this.state.messageNum}
                        dispatch={this.props.dispatch}
                        curScreen={curScreen}
                        broadQue={this.props.broadScroll}
                    />*/}
                    {/*个人操作*/}
                    <div id="settingBox">
                        {
                            curScreen==='mobile'?
                                <Dropdown
                                    overlay={menu}
                                    placement="bottomCenter"
                                    getPopupContainer={() =>
                                        document.getElementById("settingBox")
                                    }
                                >
                                    <img
                                        style={{
                                            width: 20,
                                            height: 20,
                                            display: "inline-block",
                                            borderRadius: "50%",
                                            background: "#fff"
                                        }}
                                        alt=""
                                        key={this.state.photoUrl}
                                        src={this.state.photoUrl || avatar}
                                        onError={e => (e.target.src = avatar)}
                                    />
                                </Dropdown>:
                                <div>
                                    <img
                                        style={{
                                            width: 35,
                                            height: 35,
                                            display: "inline-block",
                                            borderRadius: "50%",
                                            background: "#fff"
                                        }}
                                        alt=""
                                        key={this.state.photoUrl}
                                        src={this.state.photoUrl || avatar}
                                        onError={e => (e.target.src = avatar)}
                                    />
                                    <Dropdown
                                        overlay={menu}
                                        placement="bottomCenter"
                                        getPopupContainer={() =>
                                            document.getElementById("settingBox")
                                        }
                                    >
                                        <a
                                            className="ant-dropdown-link icon-container"
                                            href="javascript:;"
                                        >
                                            {loginInfo.userName}
                                        </a>
                                    </Dropdown>
                                </div>
                        }

                    </div>
                    
                </div>

                {/*修改密码弹框*/}
                <PopForm
                    initData={this.initData}
                    modalVisible={this.state.updatePwdVisible}
                />
            </Header>
        );
    }
}

const mapStateToProps = state => {
    const {loginAllocation, updateAdmin} = state;
    return { loginAllocation, updateAdmin };
};
const HeaderContainerWrap=(props)=>{
    return (
        <ContainerQuery query={QUERY}>
            {params => {
                let data=''
                for (let key in params) {
                    if(params[key]){
                        switch (`${key}`) {
                            //若当前窗口是手机
                            case "screen-xs" :
                                data='mobile';
                                break;
                            //若当前窗口是小屏
                            case "screen-md" :
                                data='sm-screen';
                                break;
                            //若当前窗口是大屏
                            case "screen-lg" :
                                data='big-screen';
                                break;
                            default :
                                data=''
                        }
                    }
                }
                const {dispatch} = props
                //存入当前屏幕尺寸至reducer
                dispatch(curScreen(data))
                return (
                    <HeaderContainer {...props} curScreen={data}/>
                )
            }}
        </ContainerQuery>
    )
}
export default connect(mapStateToProps)(HeaderContainerWrap);
