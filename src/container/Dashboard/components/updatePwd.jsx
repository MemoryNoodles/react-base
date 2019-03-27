import React from "react";
import {Modal,message} from "antd";
import PasswordForm from "./passwordForm"
import Api from '~/until/api'


class UpdatePwd extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            modalVisible:false
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.modalVisible!==nextProps.modalVisible){
            this.setState({modalVisible:nextProps.modalVisible})
        }
    }

    // 修改密码
    handleUpdatePwd = (json) => {
        Api.modifyPassword(json).then((res) => {
            message.success(res.message);
            setTimeout(()=>{
                // 跳转到登录页面
                window.location.hash="#/"
            },1000)
        }).catch((res)=>{
            message.error(res.message)
        })
    }

    render() {
        return (
            <Modal
                title="修改密码"
                centered
                width={600}
                visible={this.state.modalVisible}
                footer={null}
                closable={false}
                keyboard={false}
                maskClosable={false}
                destroyOnClose={true}
                onCancel={this.props.onCancel}
                className="update-password-modal"
            >
                <PasswordForm onOk={this.handleUpdatePwd}
                              onCancel={this.props.onCancel}/>
            </Modal>
        )
    }
}

export default UpdatePwd