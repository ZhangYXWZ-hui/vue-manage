<template>
    <div id="authority">
        <div class="chooseRole" style="margin-bottom:30px">
            <div class="choose">
                <label for="">选择账号名称：</label>
                <el-select v-model="user.username" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.username"
                    :value="item.username">
                    </el-option>
                </el-select>
            </div>
            <div class="choose">
                <p>根据角色分配：</p>
                <ul> 
                    <li id="superAdmin" :class="[user.role == 'superAdmin'? 'active': '']" @click='getRole(superAdmin,$event)'>超级管理员</li>
                    <li id="admin" :class="[user.role == 'admin'? 'active': '']" @click='getRole(admin,$event)'>管理员</li>
                    <li id="general" :class="[user.role == 'general'? 'active': '']" @click='getRole(general,$event)'>普通用户</li>
                </ul>
            </div>
        </div>
        <div class="checkd">
                <div class="checkbox-table" v-for="(item, indexkey) in allMenu" :key="item.id">
                    <template>
                        <el-checkbox
                        class="check1"
                        style="font-weight: 600; margin-bottom: 15px"
                        v-model="user.menusIds"
                        :label="item.id"
                        @change="handleCheck(1, indexkey)"
                        >
                        {{ item.displayName }}
                        </el-checkbox>
                        <div style="margin-bottom: 20px">
                            <div
                                v-for="list in item.children"
                                class="line-check"
                                :key="list.id"
                                style=" 
                                display: inline-block;
                                margin-left: 20px;
                                margin-bottom: 20px;
                                ">
                                <el-checkbox
                                class="check2"
                                @change="handleCheck(2, indexkey)"
                                v-model="user.menusIds"
                                :label="list.id"
                                >
                                {{ list.displayName }}
                                </el-checkbox>
                            </div>
                        </div>
                    </template>
                </div>
                <el-button type="primary" @click="putAuth">提交</el-button>
        </div>
    </div>
</template>
<style lang="less" scoped>
    #authority{
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        height: 100%;
        .chooseRole{
            width: 370px;
            .choose{
                margin-bottom: 30px;
            }
        }
        .checkd{
            width: calc(100% - 400px);
            height: 100%;
            overflow-y: auto;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            padding: 10px;
        }
    }
    .choose ul{
        margin-top: 20px;
        li{
            cursor: pointer;
            line-height: 30px;
            padding-left: 20px;
        }
        li.active{
            color:#409EFF
        }
    } 
    .auth-part{
        margin-top: 30px;
        margin-bottom: 30px;
        label{
            line-height: 30px;
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                user:{
                    username:'',
                    role:'',
                    menusIds:[1,2,3,6,7,10,13,14,15],//已选的菜单id数组
                },
                options: [],
                superAdmin:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],//超级管理员权限
                admin:[1,2,3,6,7,8,9,10,11,12,13,14,15,16,17,18],//管理员权限
                general:[1,2,3,6,7,10,13,14,15],//普通用户权限
            }
        },
        methods: {
            getRole(val,e){
                this.user.menusIds = val;
                this.user.role = e.currentTarget.id
            },
            putAuth(){
                this.$axios.put('/api/changePromise',this.user,
                result=>{
                    if(result.data.code === 200){
                        this.$message.success(result.data.msg)
                    }else{
                        this.$message.error(result.data.msg)
                    }
                })
            },
            handleCheck(type, a = 0) {
                // 多选框
                let self = this;
                if (type == 2) {
                    // 二级菜单点击
                    let index = 0;
                    self.allMenu[a].children.map((item) => {
                    if (self.menusIds.indexOf(item.index) > -1) {
                        index += 1;
                    }
                    });
                    if (index > 0) {
                    if (self.menusIds.indexOf(self.allMenu[a].index) < 0) {
                        self.menusIds.push(self.allMenu[a].index);
                    }
                    } else {
                    if (self.menusIds.indexOf(self.allMenu[a].index) > 0) {
                        self.menusIds.splice(self.menusIds.indexOf(self.allMenu[a].index), 1);
                    }
                    }
                } else {
                    if (self.menusIds.indexOf(self.allMenu[a].index) > -1) {
                    self.allMenu[a].children.map((item) => {
                        if (self.menusIds.findIndex((n) => n == item.index) < 0) {
                        self.menusIds.push(item.index);
                        }
                    });
                    } else {
                    self.allMenu[a].children.map((item) => {
                        if (self.menusIds.findIndex((n) => n == item.index) > -1) {
                        self.menusIds.splice(
                            self.menusIds.findIndex((n) => n == item.index),
                            1
                        );
                        }
                    });
                    }
                }
            },
        },
        computed: {
            allMenu() {
                return this.$store.state.menuList;
            },
        },
        created(){
            this.$axios.get('/api/getAllUser',{},
                result => {
                    // console.log(result)
                if(result.data.code === 200){
                    this.options = result.data.data;
                    // console.log(options)
                }else{
                    this.$message.error(result.data.msg)
                }
            })
        }
    }
</script>