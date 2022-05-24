import { reqAddShopCart, reqGetGoodInfo, reqgetShopCart, reqremoveShop, requpdateShopIsChecked, } from "@/api"
import { getUuid } from "@/utils"
const state = {
    goodInfo: {},
    shopCartInfo: {},
    uuid: getUuid()

}
const mutations = {
    GETGOODINFO(state, value) {
        state.goodInfo = value
    },
    GETSHOPCART(state, value) {
        state.shopCartInfo = value
    },
}
const actions = {
    deleteCheckedShop(context) {
        context.getters.shopCartInfo.cartInfoList.forEach(element => {
            element.isChecked == 1 ? context.dispatch('removeShop', element.skuId) : '';

        });
    },
    async GetGoodInfo(context, id) {
        let result = await reqGetGoodInfo(id)
        if (result.code == 200) {
            context.commit("GETGOODINFO", result.data)
        }
    },
    async addShopCart(context, { skuId, skuNum }) {
        let result = await reqAddShopCart(skuId, skuNum)
        if (result.code == 200) {
            return result.code
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    async getShopCart(context) {
        let result = await reqgetShopCart()
        if (result.code == 200) {
            context.commit('GETSHOPCART', result.data)
        }
    },
    async removeShop(context, skuId) {
        let result = await reqremoveShop(skuId)
        if (result.code == 200) {
            return result.code
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    async updateShopIsChecked(context, { skuID, isChecked }) {
        let result = await requpdateShopIsChecked(skuID, isChecked)
        if (result.code == 200) {
            return result.code
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    price(state) {
        return state.goodInfo.price
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList
    },
    valuesSkuJson(state) {
        return state.goodInfo.valuesSkuJson || {}
    },
    shopCartInfo(state) {
        return state.shopCartInfo[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}