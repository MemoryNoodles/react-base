import React from "react";
import "./AvatarContainer.less"
import avatar from '~/layouts/image/avatar-3.png';
import { connect } from "react-redux";
import api from "~/until/api";
import {updateAdminFalse} from "../../../action/updateAdminAction";
import Avater from "~/layouts/image/avatar.png"

class  AvatarContainer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loginTypeName:"通用",
            photoUrl:avatar,
            name:""
        }
    }
    componentWillReceiveProps(nextProps){
        /*if(nextProps.updateAdmin){
            api.queryEntity()
                .then(res => {
                    const { admin={} } = res.content
                    this.setState({
                        photoUrl:admin.photoUrl,
                        name:admin.realName
                    })
                })
            updateAdminFalse(nextProps.dispatch)
        }*/
    }
    componentWillMount = async () =>{
        const {loginType="1"} = sessionStorage.getItem("loginSession")?JSON.parse(sessionStorage.getItem("loginSession")):{};
        await  api.queryDict({ type: "admin_type" }).then((res)=>{
            const loginTypeName = res.content.dictDtos.filter((item,index)=>{
                return item.code == loginType
            })[0]?res.content.dictDtos.filter((item,index)=>{
                return item.code == loginType
            })[0].name:"通用";
            this.setState({
                loginTypeName
            })
            api.queryEntity()
                .then(res => {
                    const { admin={} } = res.content
                    this.setState({
                        photoUrl:admin.photoUrl?admin.photoUrl:Avater,
                        name:admin.realName
                    })
                })
        })
    };
    render(){
       const {userName="未知用户"} = sessionStorage.getItem("loginSession")?JSON.parse(sessionStorage.getItem("loginSession")):{};
       const {loginTypeName,photoUrl,name} = this.state;
        return(
            <div className='avatar-container'>
                <div className='avatar-box'>
                    <img src={photoUrl}/>
                </div>
                <p className='avatar-name'>{name?name:userName} <span className='avatar-department'>{loginTypeName}</span></p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    const { loginReducer,loginAllocation} = state;
    return { loginReducer,loginAllocation };
};
export default connect(mapStateToProps)(AvatarContainer)