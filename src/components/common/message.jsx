
import {message} from 'antd';
message.config({
    maxCount:1,
    top:50
});

export const success = (mes = '成功',time=1) => {
    message.destroy();
    message.success(mes,time);
};

export const error = (mes = '失败',time=2) => {
    message.destroy();
    message.error(mes,time);
};

export const warning = (mes = '警告',time=3) => {
    message.destroy();
    message.warning(mes,time);
};
export const info = (mes = '信息',time=3) => {
    message.destroy();
    message.info(mes,time);
};
