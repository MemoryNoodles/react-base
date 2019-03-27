import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer'
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import './index.less';
import {createLogger} from 'redux-logger'
//全局国际化
import {LocaleProvider} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');//datePicker的国际化依赖于moment的国际化

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Provider store={store}>
            <App/>
        </Provider>
    </LocaleProvider>,
    document.getElementById('root')
);


// serviceWorker.unregister();
