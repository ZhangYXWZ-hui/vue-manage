<template>
    <div id="routerList">
        <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="name"
            label="路由名称"
            width="180">
            </el-table-column>
            <el-table-column
            prop="displayName"
            label="标题"
            width="180">
            </el-table-column>
            <el-table-column
            prop="page_url"
            label="路由地址">
            </el-table-column>
            <el-table-column
            prop="icon"
            label="图标">
            <template slot-scope="scope">
                    <i :class="scope.row.icon" style="margin-right:5px"></i>{{scope.row.icon}}
                </template>
            </el-table-column>
            <el-table-column
            prop="level"
            label="菜单层级"
            width="100"
            align="center">
            </el-table-column>
            <el-table-column
            prop="is_enable"
            label="是否启用"
            width="100"
            align="center">
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
            <el-table-column
            label="操作"
            width="120"
            align="center">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less" scoped>

</style>
<script>
export default {
    data() {
        return {
            tableData:[],
        };
    },
    methods: {
        query(){
            this.$axios.post('/api/getMenu',{id:sessionStorage.getItem('userId')},
                result => {
                if(result.data.code === 200){
                    this.tableData = result.data.data;
                }else{
                    this.$message.error(result.data.msg)
                }
            })
        },
    },
    created(){
        this.query();
    },
};
</script>