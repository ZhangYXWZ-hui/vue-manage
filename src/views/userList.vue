<template>
  <div id="userList">
    <el-card shadow="hover">
      <el-row style="margin-top: 10px;margin-bottom:10px" justify="end" type="flex">
        <el-button type="primary" icon="el-icon-plus"  @click="dialogVisible = true">新增</el-button>
      </el-row>
      <el-table :data="userList" style="width: 100%" stripe border>
        <el-table-column label="id" prop="id" width="50" align="center"></el-table-column>
        <el-table-column label="用户名称" prop="username" width='auto'></el-table-column>
        <el-table-column label="用户角色" prop="role" width='150' align="center"></el-table-column>
        <el-table-column label="是否启用"  width="180" align="center">
          <template slot-scope="scope">
            <el-switch
              active-color="#2a8f57"
              active-value="1"
              inactive-color="#d80101"
              inactive-value="0"
              v-model="scope.row.is_enable" @change=changeRowStatus(scope.row.is_enable,scope.row.id)>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" width='250' label='操作'>
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </el-table-column>
      </el-table>
      <div class="block">
            <el-pagination
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-size="page.limit"
                background
                small
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
            </el-pagination>
        </div>
    </el-card>
    <el-dialog
                title="新增"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <el-form :model="registerData" status-icon :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="registerData.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerData.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="角色" prop="role">
                        <el-select v-model="registerData.role" placeholder="请选择">
                        <el-option
                          v-for="item in roles"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                </el-form> 
            </div>
            <el-row slot="footer" class="dialog-footer" justify="center" type="flex">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCreate">确 定</el-button>
            </el-row>
        </el-dialog>
  </div>
</template>
<style lang="less" scoped>


</style>
<script>
export default {
  data() {
    let validateUserName = (rule, value, callback) => {
		        if (value === '') {
			        callback(new Error('请输入账号'));
		        } else {
			        callback();
		        }
	        };
	        let validatePass = (rule, value, callback) => {
		        if (value === '') {
			        callback(new Error('请输入密码'));
		        } else {
			        callback();
		        }
	        };
    return {
      dialogVisible:false,
      userList:[],
      page:{
        limit:10,
        total:10,
        currentPage: 1,
        selectTitle:''
      },
      registerData:{
        username:'',
        password:'',
        role:'general',
        is_enable:'1',
        menu_id:[]
      },
      roles:[
        {
          label:'超级管理员',
          value:'superAdmin'
        },
        {
          label:'管理员',
          value:'admin'
        },
        {
          label:'普通员工',
          value:'general'
        }
      ],
      rules: {
					username: [
						{ required: true,validator: validateUserName, trigger: 'blur' }
					],
					password: [
						{ required: true, validator: validatePass, trigger: 'blur' }
					]
			},
    };
  },
  methods: {
    query(){
      this.$axios.get('/api/getUser',this.page,
        result => {
          if(result.data.code === 200){
            this.userList = result.data.data;
            this.page.total = result.data.total;
          }else{
            this.$message.error(result.data.msg)
          }
      })
    },
    handleSizeChange(val){
      this.page.limit = val;
      this.query()
    },
    handleCurrentChange(val){
      this.page.currentPage = val;
      this.query()
    },
    handleCreate(){

    },
  },
  created() {
    this.query()
    
  },
  computed:{
    
  },
  mounted() {
    // console.log(this.userList)
    // console.log(this.page)
  },
};
</script>