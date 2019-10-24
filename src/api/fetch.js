
// http请求

import { baseUrl} from './env'
import axios from 'axios'
import qs from 'qs';
import router from '../router'



let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;


//设置axios全局配置
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 15000;


export default{
        post(url, param) {
            return new Promise((resolve, reject) => {
                if (!param) {
                    params = {};
                }
                axios({
                    method: 'post',
                    url,             
                    data: JSON.stringify(param)
                }).then(res => {
                    if (!res) {
                        resolve('http-error');
                        return;
                    }
                    // if (res.status == 200 && (res.data.ResultCode === '000012' || res.data.ResultCode === '000011')) {
                    //     router.replace({ 
                    //         path: '/'
                    //     })
                    //     return;
                    // }
                    // if (res.status == 200 && res.data.ResultCode != '000000') {
                    //     console.log(100)
                    // }
                    resolve(res);
                })
            })
        },

        get(url, param) {
            return new Promise((resolve, reject) => {
                if (!param) {
                    param = {};
                }
                axios({
                    method: 'get',
                    params: param,
                    url,
                }).then(res => {
                    // if (res.status == 200 && (res.data.ResultCode === '000012' || res.data.ResultCode === '000011')) {

                    //     return;
                    // }
                    // if (res.status == 200 && res.data.ResultCode && res.data.ResultCode != '000000') {

                    // }
                    resolve(res);
                }).catch(function (error) {
                    console.log(error);
                });
            })
        },

        postParam(url, param) {
            return new Promise((resolve, reject) => {
                if (!param) {
                    param = {};
                }
                axios({
                    method: 'post',
                    params: param,
                    url,
                }).then(res => {
                    // if (res.status == 200 && (res.data.ResultCode === '000012' || res.data.ResultCode === '000011')) {

                    //     return;
                    // }
                    // if (res.status == 200 && res.data.ResultCode && res.data.ResultCode != '000000') {

                    // }
                    resolve(res);
                }).catch(function (error) {
                    console.log(error);
                });
            })
        },



}






