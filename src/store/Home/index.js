import { reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api"
const state ={
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList

    },
    GETBANNERLIST(state,bannerList){
         state.bannerList=bannerList
    },
    GETFLOORLIST(STATE,florList){
        state.floorList=florList
    }
}
const actions ={
       async category(context){
           let result = await reqCategoryList()
           if(result.code==200){
            context.commit("CATEGORYLIST",result.data)
           }
       },
       async getBannerList(context){
        let result = await  reqGetBannerList();
        if(result.code===200){
            context.commit('GETBANNERLIST',result.data)
        }
       },
       async getFloorList(context){
        let result = await  reqGetFloorList();
        if(result.code===200){
            context.commit('GETFLOORLIST',result.data)
        }
    }
   
}

const getters={}

export default {
    state,
    mutations,
    actions,
    getters
}