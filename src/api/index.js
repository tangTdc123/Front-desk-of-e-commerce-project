import request from "./request";
import mockRequest from "./mockAjax";

export const reqCategoryList = () => request({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

export const reqGetBannerList = () => mockRequest({
    url: '/banner',
    method: 'get'
})

export const reqGetFloorList = () => mockRequest.get('/floor')

export const reqGetSearchList = (parms) => request({
    url: '/list',
    method: 'post',
    data:parms
})


export const reqGetGoodInfo = (skuId) => request({
    url: `/item/${ skuId }`,
    method: 'get'
})


export const reqAddShopCart= (skuId,skuNum) => request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})


export const reqgetShopCart= () => request({
    url: '/cart/cartList',
    method: 'get'
})

export const reqremoveShop= (skuId) => request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

export const requpdateShopIsChecked= (skuID,isChecked) => request({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: 'get'
})

export const reqregisterUser= (data) => request({
    url: '/user/passport/register/',
    data,
    method: 'post'
})

export const reqcode= (Phone) => request({
    url: `/user/passport/sendCode/${Phone}`,
    method: 'get'
})

export const reqLogin= (user) => request({
    url: `/user/passport/login`,
    method: 'post',
    data:user
})

export const reqCheckToken = ()=>request({
    url: '/user/passport/auth/getUserInfo',
    method :'get'
})

export const reqleaveLogin = ()=>request({
    url: '/user/passport/logout',
    method :'get'
})

export const reqAdressInfo = ()=>request({
    url: '/user/userAddress/auth/findUserAddressList',
    method :'get'
})


export const reqTradeInfo = ()=>request({
    url: '/order/auth/trade',
    method :'get'
})

export const reqputOrder = (tradeNo,data)=>request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method :'post',
    data:data
})

export const reqgetOder = (orderId)=>request({
    url: `/payment/weixin/createNative/${orderId}`,
    method :'get',
})

export const reqcheckPayState = (orderId)=>request({
    url: `/payment/weixin/createNative/${orderId}`,
    method :'get',
})

export const reqgetOderInfo = (page,limit)=>request({
    url: `/order/auth/${page}/${limit}`,
    method :'get',
})