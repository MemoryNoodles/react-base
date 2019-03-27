import React, {Component} from 'react';
import SpinLoading from '~/components/common/Spin';
import Routes from './router';

class App extends Component {
    render() {
        return (
            <div style={{width:"100%",height:"100%"}}>
                <SpinLoading/>
                <Routes/>
            </div>
        );
    }
}

export default App;
