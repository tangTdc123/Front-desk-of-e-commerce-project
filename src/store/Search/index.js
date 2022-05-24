import {reqGetSearchList } from "@/api"
const state={
    seachList:{}
}

const mutations={
    GETSEARCHLIST(state,seachList){
        state.seachList=seachList
    }
}

const actions={
    async getSearchList(context,parms){
        let result = await reqGetSearchList(parms)
        if(result.code==200){
            context.commit('GETSEARCHLIST',result.data)
        }
        
    }
}

const getters={
    attrsList(state){
        return state.seachList.attrsList
    },
    goodsList(state){
        return state.seachList.goodsList
    },
    trademarkList(state){
        return state.seachList.trademarkList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}