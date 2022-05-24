import { reqAdressInfo ,reqTradeInfo} from "@/api"


const state={
    adressInfo:[],
    tradeInfo:{}

}

const mutations={
    GETUSERADRESSINFO(state,value){
        state.adressInfo=value
    },
    GETUSERTRADEINFO(state,value){
        state.tradeInfo =value
    }
}

const actions={
    async getUserAdressInfo(context){
        let ruselt = await reqAdressInfo()
        if(ruselt.code == 200){
            context.commit('GETUSERADRESSINFO',ruselt.data)
            return ruselt.code
        }else{
            return Promise.reject(new Error('获取失败'))
        }
    },
    async getUserTradeInfo(context){
        let ruselt = await reqTradeInfo()
        if(ruselt.code == 200){
            context.commit('GETUSERTRADEINFO',ruselt.data)
            return ruselt.code
        }else{
            return Promise.reject(new Error('获取失败'))
        }
    }
}

const getters={}

export default ({
    state,
    mutations,
    actions,
    getters,
})

