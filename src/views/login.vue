<template>
    <div id="login">
        <div class="ms-wrap">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules"  ref="login" class="ms-form">
                <el-form-item prop='username'>
                    <el-input  prefix-icon="el-icon-user-solid" v-model="ruleForm.username" placeholder="username">
                    </el-input>
                </el-form-item>
                <el-form-item prop='password'>
                    <el-input type='password' placeholder="password" v-model="ruleForm.password" prefix-icon="el-icon-lock" @keyup.enter.native="submitForm()">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
    export default {
        name:'login',
        data:function(){
            return {
                ruleForm:{
                    username:'',
                    password:'',
                    // role:'general',
                    is_enable:'1',
                    // menu_id:[]
                },
                rules:{
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.login.validate(valid => {
                    if (valid) {
                        this.$axios.post('/login/userLogin',this.ruleForm,
                        result =>{
                            let data = result.data;
                            // console.log(result)
                            if(data.type === 'ok'){
                                this.$message.success('登录成功');
                                sessionStorage.setItem('username',data.data.username)
                                sessionStorage.setItem('userId',data.data.id);
                                sessionStorage.setItem('role',data.data.role);
                                sessionStorage.setItem('is_enable',data.data.is_enable);
                                sessionStorage.setItem('isLogin',true)
                                this.$axios.post('/api/getMenu',{id:sessionStorage.getItem('userId')},
                                    res =>{
                                        if(res.data.code === 200){
                                            // console.log(res.data.data)
                                            this.$store.dispatch('setMenu',res.data.data)
                                            localStorage.setItem('usermenu',JSON.stringify(res.data.data))
                                            this.$router.push('/');  
                                                
                                        }else{
                                            this.$message.error(res.data.msg) 
                                        }
                                    })
                                // this.$router.push('/'); 
                            }else{
                                this.$message.error(data.msg);
                                return false;
                            }
                        })
                        
                    } else {
                        this.$message.error('请输入账号和密码');
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
        },
    }
</script>
<style lang="less" scoped>
    #login{
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../assets/login-bg.jpg);
        background-size: 100%;
    }
    .ms-wrap{
        width: 400px;
        height: 300px;
        background: #fff;
        border-radius: 5px;
        position: absolute;
        top: calc(50% - 200px);
        left: calc(50% - 200px);
        padding-top: 20px;
        .ms-title{
            font-size: 26px;
            text-align: center;
        }
    }
    
</style>