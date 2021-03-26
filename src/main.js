import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element.less'
import './assets/css/main.less'
import axios from './assets/js/axios'
import './assets/js/element.js'
// import echarts from "echarts";

let echarts = require('echarts');

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

// 登录判断跳转
router.beforeEach((to,from,next) =>{
    document.title = `${to.meta.title} | manage-system`;
    const isLogin = sessionStorage.getItem('isLogin');
    const menu = JSON.parse(localStorage.getItem('usermenu')) 
    if(isLogin){
        if(!deepQuery(menu,to.path)){
            next('/404')
        }else{
            next()
        }
    }else{
        if(to.path === '/login'){
            next()
        }else{
            next('/login')
        }
    }
})

function deepQuery(tree, path) {
    let isLeft = false;
    if(path === '/' || path === '/404' || path === '/login') return true
    for(var i=0;i<tree.length;i++){
        if(tree[i].children&&tree[i].children.length>0){
            for(var j=0;j<tree[i].children.length;j++){
                if(tree[i].children[j].page_url == path){
                    isLeft =  true;
                    return isLeft
                }
            }
        }
    }
    if(!isLeft){
        return false
    }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
