import Vue from 'vue'
import Vuex from 'vuex'
// import menuList from '../router/router'  

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList:[],
    tablist:JSON.parse(sessionStorage.getItem('tabs'))||[{name:'home',page_url:'/home',displayName:'首页'}],//tab列表
    activetab:sessionStorage.getItem('activetab')||'home',//当前激活tab
    editorData:'',
  },
  getter:{
    
  },
  mutations: {
    putTabs(state,tab){
      state.activetab = tab.name;
      sessionStorage.setItem('activetab',state.activetab);
      if(state.tablist.length > 0){
        if(state.tablist.filter((item) => item.name === tab.name).length === 0){
          state.tablist.push(tab)
        }
      }else{
        state.tablist.push(tab)
      }
      sessionStorage.setItem('tabs',JSON.stringify(state.tablist))
    },
    delTab(state,tab){
      state.tablist = state.tablist.filter((item) => {
        return item.page_url !=tab.page_url
      })
      sessionStorage.setItem('tabs',JSON.stringify(state.tablist))
    },
    activeTab(state,tab){
      state.activetab = tab;
      sessionStorage.setItem('activetab',state.activetab)
    },
    userMenu:(state,menu) => {
      state.menuList = menu;
    },
    setMsg(state,val){
			state.editorData = val
		}
  },
  actions: {
    setMenu:(context,menu) => {
      context.commit('userMenu',menu)
    },
    
  },
  modules: {
  }
})
