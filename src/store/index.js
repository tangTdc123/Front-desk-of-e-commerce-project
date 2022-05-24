import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

const state={}

const mutations={}

const actions={}

const getters={}

import home from './Home'
import search from './Search'
import detail from './Detail'
import user from './User';
import trade from './Trade';

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        home,
        search,
        detail,
        user,
        trade
    }
})

