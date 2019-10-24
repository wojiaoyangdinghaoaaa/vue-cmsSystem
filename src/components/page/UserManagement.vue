<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-people"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- 头部导航栏 -->
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" :disabled="btnDisabled" @click="batchDele">删除</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr11" :disabled="btnDisabled" @click="batchCheck">审核</el-button>
            </div> 

             

            <!-- 表格数据 -->
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  border @selection-change="selectChange"  @select="checked" @select-all="allChecked">

                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="ID" width="100" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="注册日期"  width="230" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">{{scope.row.createTime | datefmt('YYYY-MM-DD HH:mm:ss')}}</template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" width="230" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column prop="phone" label="手机号"   width="230" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column   label="详情" width="230" align="center" :show-overflow-tooltip="true">
                     <template slot-scope="scope">
                      <el-button type="text" @click="handleDetail(scope.row)">详细信息</el-button>
                    </template>
                </el-table-column>
                <el-table-column   label="操作" width="230" align="center" :show-overflow-tooltip="true">
                     <template slot-scope="scope">
                      <el-button type="text" @click="handleEdit(scope.$index, scope.row)">确认信息</el-button>
                    </template>
                </el-table-column>
                 <el-table-column label="状态" align="center"   :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-button  type="warning" plain disabled  v-if="scope.row.status==0">未审核</el-button>
                         <el-button type="success" plain disabled v-else-if="scope.row.status==1">审核通过</el-button>
                        <el-button type="danger"  disabled v-else-if="scope.row.status==2">审核未通过</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <!-- 分页 -->
            <div class="pagination">
                <el-pagination background 
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[20,50,100, 200, 400,1000]" 
                layout="total, sizes, prev, pager, next, jumper" 
                :total="data.total">
                </el-pagination>
            </div>

        </div>

       
       <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form :label-position="labelPosition" ref="form" :model="form" label-width="90px" >
                 <el-form-item label="ID">
                    <el-input v-model="form.id" readonly></el-input>
                </el-form-item>
                <el-form-item label="注册日期" >
                    <el-input v-model="form.createTime" readonly></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 审核提示框 -->
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
            <el-radio-group v-model="check">
                <el-radio  :label="1">审核通过</el-radio>
                <el-radio  :label="2">审核不通过</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cenclAllCheck">取 消</el-button>
                <el-button type="primary" @click="allCheck">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import {getUserList , changeUserInfo , deleteUser , checkeUser , getUserLoginState} from '../../api/getData';
import moment from 'moment' 

export default {
  data() {
    return {
      tableData: [],
      btnDisabled:true,
      selectLists:[],
      check:1,
      editVisible:false,
      dialogVisible: false,
      labelPosition:'left',
      form: {
        username: '',
        createTime: '' ,
        phone: '',
        id:'',
        status:''
            },
       userStatus:'',
       changePhone:'',
       changeUserName:'',
       limit:{},
       data:[],
       checkedLists:[],
       ids:[],
       page:1,
       size:20,
       pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        
      
    };
  },
   

  methods: {
    //每页条数
    handleSizeChange(val) {
        this.size=val;
        this.limit={
          page:this.page,
          size:this.size,
        }
        this.getPages(this.limit);
    },
    //页数
    handleCurrentChange(val) {
        this.page=val;
        this.limit={
          page:this.page,
          size:this.size,
        }
        this.getPages(this.limit);
    },
    // 点击获取详情事件
    handleDetail(row){
        this.$router.push({path:'/UserDetail',query:{userId:row.id}});
    },
    // 点击获取值
     handleEdit(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    createTime: moment(item.createTime).format("YYYY-MM-DD HH:mm:ss"),
                    phone: item.phone,
                    username: item.username,
                    id: item.id,
                }
                this.changeUserName=item.username;
                this.changePhone=item.phone;
                this.editVisible = true;
              
            },
    // 保存编辑
    saveEdit() {
        this.$set(this.tableData, this.idx, this.form);
             var id =this.tableData[this.idx].id;
                var ids={
                    id:id,
                    username:this.form.username!=this.changeUserName ? this.form.username : this.changeUserName,
                    phone:this.form.phone!=this.changePhone ? this.form.phone : this.changePhone,
                }
                changeUserInfo(ids).then(res=>{
                    if (res.data.success==true) {
                        this.$message({
                            message: '修改成功!',
                            type: 'success'
                        });
                        this.editVisible = false;
                        this.limit={
                            page:this.page,
                            size:this.size
                        }
                        this.getPages(this.limit);
                    }else{
                        this.$message('修改未成功，请刷新后重新修改!');
                    }
                });
        },
    // 单选事件
    checked(e){
        this.checkedLists=e;
    },
    // 全选事件
    allChecked(e){
        this.checkedLists=e;
    },
    // change事件
    selectChange(e){
        this.selectLists=e;
        if (this.selectLists!='') {
            this.btnDisabled=false;
        }else{
            this.btnDisabled=true;
        }
    },
    // 审核事件
    batchCheck(){
        this.dialogVisible=true;
        this.ids=[];
        var checkedLists=this.checkedLists;
        for(let i=0;i<checkedLists.length;i++){
            this.ids.push(checkedLists[i].id);
        }
    },
    // 审核确定事件
    allCheck(){
        if(this.check==1){
            var id=this.ids;
            var ids={
                ids:id,
                status:1
            };
            checkeUser(ids).then(res=>{
                if (res.data.success==true) {
                    this.$message({
                        message: '审核成功!',
                        type: 'success'
                    });
                    this.dialogVisible=false;
                    this.limit={
                        page:this.page,
                        size:this.size
                    }
                    this.getPages(this.limit);
                }else{
                    this.$message('审核未成功，请刷新后重新提交审核!');
                }
            });
        }else if(this.check==2){
            var id=this.ids;
            var ids={
                ids:id,
                status:2
            };
            checkeUser(ids).then(res=>{
                if (res.data.success==true) {
                    this.$message({
                        message: '审核成功!',
                        type: 'success'
                    });
                    this.dialogVisible=false;
                    this.limit={
                        page:this.page,
                        size:this.size
                    }
                    this.getPages(this.limit);
                }else{
                    this.$message('审核未成功，请刷新后重新提交审核!');
                }
            });
        }

    },
    // 取消审核事件
    cenclAllCheck(){
        this.dialogVisible=false;
        this.$message('取消审核!');
    },
    // 取消审核事件
    handleClose() {
        this.dialogVisible=false;
        this.$message('取消审核!');
    },
    // 删除事件
    batchDele(){
        this.ids=[];
        var checkedLists=this.checkedLists;
        for(let i=0;i<checkedLists.length;i++){
            this.ids.push(checkedLists[i].id);
        }
        var id={
            ids:this.ids
        }
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            deleteUser(id).then(res=>{
                if (res.data.success==true) {
                    this.$message({
                        message: '删除成功!',
                        type: 'success'
                    });
                    this.limit={
                        page:this.page,
                        size:this.size
                    }
                    this.getPages(this.limit);
                }else{
                    this.$message('删除未成功，请刷新后重新删除!');
                }
            });
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });          
        });
    },
    // 获取分页请求
    getPages(limit){
        getUserList (limit).then(res=>{
            this.tableData=res.data.data.content;
            this.data=res.data.data;
        })
    },
            
  },
  mounted () {
      this.limit={
          page:this.page,
          size:this.size
      }
    this.getPages(this.limit);
  },
  created () {
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
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
</style>
