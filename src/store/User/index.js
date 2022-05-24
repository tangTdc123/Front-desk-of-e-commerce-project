import { reqcode,reqregisterUser,reqLogin ,reqCheckToken,reqleaveLogin} from "@/api"
import {setToken,getToken,clearToken} from '../../utils/user.js';
const state={
    code:'',
    userInfo:{},
    token:getToken()
}

const mutations={
    GETCODE(state,value){
        state.code = value
    },
    USERLOGIN(state,value){
        setToken(value.token)
        state.token =value.token
    },
    CHECKTOKEN(state,value){
        state.userInfo=value
    },
    LEAVELOGIN(state){
        state.userInfo = {}
        state.token=''
        clearToken()
    }
    
}

const actions={
    async leaveLogin(context){
        let ruselt = await reqleaveLogin()
        if(ruselt.code == 200){
            context.commit('LEAVELOGIN')
            return ruselt.code
        }else{
            return new Promise.reject('退出登录失败')
        }
    },
    async checkToken(context) {
        let ruselt = await reqCheckToken()
        if (ruselt.code == 200) {
            context.commit('CHECKTOKEN',ruselt.data)
            return ruselt.code
        }
        else {
            return Promise.reject(new Error('你还未登录'))
        }
    },
    async registerUser(context,users){
        let ruselt =await reqregisterUser(users)
        if(ruselt.code ==200){
            return ruselt.code
        }
        else {
            return Promise.reject(new Error('注册失败'))
        }
    },
    async getCode(context,phone){
        let ruselt = await reqcode(phone)
        if(ruselt.code ==200){
            context.commit('GETCODE',ruselt.data)
        }
        else {
            return Promise.reject(new Error('获取验证码失败'))
        }

    },
    async userLogin(context,data){
        let ruselt = await reqLogin(data)
        if(ruselt.code == 200){
            context.commit('USERLOGIN',ruselt.data)
            return ruselt.code
        }else{
            return Promise.reject(new Error('登录失败'))
        }
    }

}

const getters={}


export default({
    state,
    mutations,
    actions,
    getters,
})

