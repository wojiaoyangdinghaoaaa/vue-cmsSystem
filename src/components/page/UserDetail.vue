<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-people"></i> 用户详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <!-- 表格数据 -->
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border >

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="displayName" label="姓名"   width="300" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                 <el-table-column prop="phoneNumbers[0].value" label="手机号" align="center"   :show-overflow-tooltip="true">
                </el-table-column>

            </el-table>

        </div>
    </div>
</template>

<script>
import {userDetail , getUserLoginState} from '../../api/getData';

export default {
  data() {
    return {
      tableData: [],
      userId:'',
      list:[],
      limit:{},   
      
    };
  },
   

  methods: {
    // 获取用户详情请求
    getPages(limit){
        userDetail(limit).then(res=>{
           if (res.data.success==true) {
               this.list=JSON.parse((res.data.data.other));
               this.tableData=this.list;
           }else{
               this.$message('数据加载失败,请重新刷新加载!');
           }
        });
    },
            
  },
  mounted () {
      this.limit={
          id:this.userId,
      }
    this.getPages(this.limit);
  },
  created () {
      this.userId=this.$route.query.userId;
            var limit={
                token:this.$cookie.get('userId')
            }
            getUserLoginState(limit).then(res=>{
                if (res.data.success==false) {
                    this.$router.push({path:'/login'});
                    this.$message.error('登录过期，请重新登录！');
                }

            })
        }
};
</script>

<style scoped>

.table {
  width: 100%;
  font-size: 14px;
}

</style>
