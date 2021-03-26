<template>
  <div id="tabmenu">
    <el-col :span="24">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2e363f"
        text-color="#a7b1c2"
        active-text-color="#fff"
        :unique-opened='true'
        :router="true"
      >
      <el-menu-item v-for='(item,index) in menus' v-if='!item.children' :index='item.page_url' :key="index" @click="selecttab(item)">
          <i :class='item.icon'></i>
          {{item.displayName}}
      </el-menu-item>
      <el-submenu v-for='(item,index) in menus' v-if='item.children' :index='item.page_url' :key="index">
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.displayName}}</span>
            </template>
            <el-menu-item v-for='(tab,index) in item.children' :index='tab.page_url' v-if='tab.is_btn == 0' :key="index" @click="selecttab(tab)">
                {{tab.displayName}}
            </el-menu-item>
      </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
    export default {
        name:'tabmenu',
        data() {
            return {
                menus:this.$store.state.menuList,
                // allMenu:this.$store.getters.allMenu
            }
        },
        methods: {
            handleOpen(){
                
            },
            handleClose(){
                
            },
            selecttab(tab){
              this.$store.commit('putTabs',tab)
            },
            // setMenu(menu){
            //   this.$store.dispatch('userMenu',menu)
            // }
        },
        computed: {
              
        },
        created(){
          // this.$axios.post('/api/getMenu',{id:sessionStorage.getItem('userId')},
          //       result => {
          //         // console.log(result)
          //       if(result.data.code === 200){
          //           this.menus = result.data.data;
          //       }else{
          //           this.$message.error(result.data.msg)
          //       }
          //   })
          //   // console.log()
        },
        mounted() {
          // console.log(this.$store.state.menuList)
        },
    };
</script>
<style lang="less">
#tabmenu {
  width: 220px;
  height: 100%;
  background-color:#2e363f;
  text-align: left;
  i{
      color: #fff;
  }
  .el-submenu{
      width: 220px;
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-item.is-active {
    border-left: 5px solid #a7b1c2;
    background-color: #262e37 !important;
  }
  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: #262e37 !important;
  }
}
</style>