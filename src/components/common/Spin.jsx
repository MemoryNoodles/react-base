/**
 * @component  SpinLoadingContainer
 * @param  {Boolean} spin spin,显示还是关闭SpinLoading组件
 * */
import {Spin} from 'antd';
import React from 'react';
import Style from  './spin.module.less';
import {connect} from 'react-redux';

const SpinLoading = (spinning) => {
    return (
        <div className={Style.spinContainer}>
            <Spin size="large" spinning={spinning.spinning}/>
        </div>
    )
};

class SpinLoadingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinning: this.props.spin
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            spinning: nextProps.spin
        });
    }

    render() {
        return (
            <div>
                {this.state.spinning ? <SpinLoading spinning={this.state.spinning}/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {spin} = state;
    return {spin}
};
export default connect(mapStateToProps)(SpinLoadingContainer)