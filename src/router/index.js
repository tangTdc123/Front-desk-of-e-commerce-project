import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


import Search from '../pages/Search'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import Login from '../pages/Login'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart';
import Trade from '../pages/Trade';
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess';
import Center from '../pages/Center';
import Myoder from '../pages/Center/myOder';
import GroupOder from '../pages/Center/gropOder'
import store from '../store'
let orginPush = VueRouter.prototype.push;
let orginreplace = VueRouter.prototype.replace;
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        orginPush.call(this,location)
    }
    else{
        orginPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        orginreplace.call(this,location)
    }
    else{
        orginreplace.call(this,location,()=>{},()=>{})
    }
}



let router = new VueRouter({
    routes:[
        {
            path:"/home",
            component:()=> import('../pages/Home'),
            meta:{
                show:true
            }
        },
        {
            path:"/pay",
            component:Pay,
            meta:{
                show:false
            },
            beforeEnter:(to,from,next)=>{
                if( from.path == '/trade'){
                  next()
                }else{
                  next(false)
                }
              }
        },
        {
            path:"/center",
            component:Center,
            meta:{
                show:false
            },
            children:[
                {
                    path:"/center/myoder",
                    component:Myoder,
                    meta:{
                        show:false
                    },
                },
                {
                    path:'/center',
                    redirect:'/center/myoder',
                    meta:{
                        show:false
                    },
                },
                {
                    path:"/center/groupOder",
                    component:GroupOder,
                    meta:{
                        show:false
                    },
                }
            ]
        },
        {
            path:"/paySuccess",
            component:PaySuccess,
            meta:{
                show:false
            }
        },
        {
            path:"/trade",
            component:Trade,
            meta:{
                show:false
            },
            beforeEnter:(to,from,next)=>{
                if( from.path == '/ShopCart'){
                  next()
                }else{
                  next(false)
                }
              }
        },
        {
            path:"/AddCartSuccess",
            component:AddCartSuccess,
            name:'AddCartSuccess',
            meta:{
                show:false
            }
        },
        {
            path:"/ShopCart",
            component:ShopCart,
            name:'ShopCart',
            meta:{
                show:false
            }
        },
        {
            path:"/detail",
            component:Detail,
            meta:{
                show:false
            }
        },
        {
            path:"/search/:keyword?",
            component:Search,
            name:'search',
            meta:{
                show:false
            },
        },
        {
            path:"/register",
            component:Register,
            meta:{
                show:false
            }
        },
        {
            path:"/login",
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/',
            redirect:'/home',
            meta:{
                show:true
            }
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})

router.beforeEach((to,from,next)=>{
    let token = store.state.user.token
    let name = store.state.user.userInfo.loginName
    if(token){
        if(to.path=='/login' || to.path=='/register'){
            next('/')
        }else{
            if(name){
                next()
            }else{
                store.dispatch("checkToken").then(()=>{
                    next()
                },()=>{
                    store.dispatch('leaveLogin')
                    next('/login')
                })
            }
        }

    }else{
        if(to.path.indexOf('/center') != -1 || to.path=='/trade' ||to.path.indexOf('/pay') != -1){
            next('/login/?redirect=' + to.path)
        }
         next()
    }

})

export default router