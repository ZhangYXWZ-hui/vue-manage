<template>
    <div id='header'>
        <div class="title">
            <span>个人后台管理系统</span>
        </div>
        <div class="dropdown">
            <span>{{username}}</span>
            <el-dropdown trigger="click" @command="handleCommand">
                <i class="el-icon-setting"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command='logout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: sessionStorage.getItem('username') || "系统管理员"
            }
        },
        methods: {
            handleCommand(command) {
                if(command === 'logout'){
                    sessionStorage.clear();
                    sessionStorage.setItem('isLogin','false');
                    this.$router.replace('/login');
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    #header{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        font-size: 24px;
        padding: 0 40px;
        line-height: 60px;
        box-shadow: 3px 1px 4px 0 rgba(0,0,0,.2);
        .dropdown{
            span{
                font-size: 22px;
                padding-right: 20px;
            }
            i{
                font-size: 22px;
            }
        }
    }
</style>