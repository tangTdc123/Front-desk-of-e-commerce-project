import Vue from 'vue'
import App from './App.vue'
import store from './store'
import TypeNav from './components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from './components/Pagination';
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/images/1.gif';
import { Button, MessageBox } from 'element-ui';
Vue.use(Button)
Vue.use(VueLazyload,{
  loading:loading
})
Vue.component('TypeNav',TypeNav)
Vue.component('carousel',Carousel)
Vue.component('Pagination',Pagination)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import router from './router'
Vue.config.productionTip = false
import "@/mock/mockServe"
import "swiper/css/swiper.css"
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus=this
  },
  router,
  store
}).$mount('#app')
