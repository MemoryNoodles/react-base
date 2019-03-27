import React from "react";
import Api from "~/until/api";
import { Icon, Popover, message, Badge } from "antd";
import { breadcrumbTopText } from "~/action/breadcrumbTopText";
import { setNoReadNewsList } from "~/action/setNoReadNewsList";
import { createWebSocket } from "~/until/webSocket";
import moment from "moment";
import Style from "./messageBox.module.less";

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noReadNewsList: [],
            listLength: 0,
            visible: false,
            curScreen: "",
            messageNum: this.props.messageNum
        };
    }
    static getDerivedStateFromProps=(props,prevState)=>{
        const {curScreen,messageNum} = props
        let state = {}

        if(curScreen!==prevState.curScreen){
            state = {curScreen}
        }
        if(messageNum!==prevState.messageNum){
            state = {messageNum}
        }
        if(curScreen!==prevState.curScreen && messageNum!==prevState.messageNum){
            state = {curScreen,messageNum}
        }

        return state
    }

    componentDidMount() {
        Api.queryMessageCount().then(res => {
            this.setState({
                noReadNewsList: res.content,
                messageNum: res.content.length
            });
        });
        this.socket = new createWebSocket(data => {
            let news = JSON.parse(data);
            // console.log("接收到推送消息:", news);
            const { content = {} } = news;

            if (`${news.status}` === "1") {
                this.setState({ messageNum: this.state.messageNum + 1 });
            } else if (`${news.status}` === "2") {
                this.props.broadQue(content);
            } else {
                this.setState({ messageNum: news });
            }
        }, "/webSocketServer");
    }

    // 设为已读：id :"" 全部设为已读
    markToRead = () => {
        Api.setRead({ id: "" }).then(res => {
            if (res.status === "1") {
                // 显示设为已读成功Alert
                message.success(res.message);
            } else {
                // 显示设为已读失败Alert
                message.error(res.message);
            }
        });
    };
    getMessageCount = visible => {
        Api.queryMessageCount().then(res => {
            this.setState({
                noReadNewsList: res.content,
                messageNum: res.content.length,
                visible
            });
        });
    };
    render() {
        const content = (
            <div className={Style.msgContent}>
                <ul className={Style.itemList}>
                    {this.state.noReadNewsList.map((item, index) => {
                        return index < 5 ? (
                            <li
                                className={Style.itemUnread}
                                key={`${index}-${item.id}`}
                            >
                                <h3 className={Style.theme}>
                                    <a
                                        className={Style.title}
                                        onClick={() => {
                                            this.props.dispatch(
                                                breadcrumbTopText([
                                                    "消息管理",
                                                    "我的消息"
                                                ])
                                            );
                                            sessionStorage.setItem(
                                                "openMessage",
                                                JSON.stringify(item.id)
                                            );
                                            window.location.hash =
                                                "#/Dashboard/MessageManagement/MessageRecord";
                                        }}
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <p className={Style.content}>
                                    {moment(item.createTime).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )}
                                </p>
                            </li>
                        ) : (
                            ""
                        );
                    })}
                </ul>
                <div className={Style.seeAll}>
                    {this.state.noReadNewsList.length > 0 ? (
                        <a
                            href="javascript:;"
                            className={Style.signAllReaded}
                            onClick={() => {
                                this.props.dispatch(
                                    breadcrumbTopText(["消息管理", "我的消息"])
                                );
                                window.location.hash =
                                    "#/Dashboard/MessageManagement/MessageRecord";
                            }}
                        >
                            查看全部消息
                        </a>
                    ) : (
                        <span>暂无消息</span>
                    )}
                </div>
            </div>
        );
        const title = (
            <div className={Style.msgTipHeader}>
                <span>消息</span>
                <a
                    href="javascript:;"
                    className={Style.signAllReaded}
                    onClick={this.markToRead}
                >
                    标记全部为已读
                </a>
            </div>
        );
        return (
            <div className={Style.messageBox} id="messageBox">
                <Popover
                    content={content}
                    title={title}
                    getPopupContainer={() =>
                        document.getElementById("messageBox")
                    }
                    trigger="hover"
                    visible={this.state.visible}
                    onVisibleChange={this.getMessageCount}
                >
                    {this.state.curScreen === "mobile" ? (
                        <Badge count={this.state.messageNum} offset={[10, 0]}>
                            <Icon type="mail" style={{ fontSize: "16px" }} />
                        </Badge>
                    ) : (
                        <a href="javascript:;">
                            <Icon type="mail" style={{ fontSize: "14px" }} />
                            <Badge
                                count={this.state.messageNum}
                                offset={[10, 0]}
                            >
                                消息
                            </Badge>
                        </a>
                    )}
                </Popover>
            </div>
        );
    }
}

export default MessageBox;
