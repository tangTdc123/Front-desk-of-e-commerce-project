import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'
import store from '../store';
import {getToken} from '../utils/user'
const request =axios.create({
    baseURL:'/api',
    timeout:5000,
})


request.interceptors.request.use((config)=>{
    nprogress.start()
    config.headers.userTempId=store.state.detail.uuid
    if(getToken()){
        config.headers.token = getToken()
    }
    return config
})

request.interceptors.response.use((res)=>{
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})

export default request