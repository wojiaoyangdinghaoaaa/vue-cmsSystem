webpackJsonp([6],{kgZK:function(e,t){},kqXC:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("1h8J"),a=i("PJh5"),l=i.n(a),n={data:function(){return{tableData:[],btnDisabled:!0,selectLists:[],check:1,editVisible:!1,dialogVisible:!1,labelPosition:"left",form:{username:"",createTime:"",phone:"",id:"",status:""},userStatus:"",changePhone:"",changeUserName:"",limit:{},data:[],checkedLists:[],ids:[],page:1,size:20,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]}}},methods:{handleSizeChange:function(e){this.size=e,this.limit={page:this.page,size:this.size},this.getPages(this.limit)},handleCurrentChange:function(e){this.page=e,this.limit={page:this.page,size:this.size},this.getPages(this.limit)},handleDetail:function(e){this.$router.push({path:"/UserDetail",query:{userId:e.id}})},handleEdit:function(e,t){this.idx=e;var i=this.tableData[e];this.form={createTime:l()(i.createTime).format("YYYY-MM-DD HH:mm:ss"),phone:i.phone,username:i.username,id:i.id},this.changeUserName=i.username,this.changePhone=i.phone,this.editVisible=!0},saveEdit:function(){var e=this;this.$set(this.tableData,this.idx,this.form);var t={id:this.tableData[this.idx].id,username:this.form.username!=this.changeUserName?this.form.username:this.changeUserName,phone:this.form.phone!=this.changePhone?this.form.phone:this.changePhone};Object(s.a)(t).then(function(t){1==t.data.success?(e.$message({message:"修改成功!",type:"success"}),e.editVisible=!1,e.limit={page:e.page,size:e.size},e.getPages(e.limit)):e.$message("修改未成功，请刷新后重新修改!")})},checked:function(e){this.checkedLists=e},allChecked:function(e){this.checkedLists=e},selectChange:function(e){this.selectLists=e,""!=this.selectLists?this.btnDisabled=!1:this.btnDisabled=!0},batchCheck:function(){this.dialogVisible=!0,this.ids=[];for(var e=this.checkedLists,t=0;t<e.length;t++)this.ids.push(e[t].id)},allCheck:function(){var e=this;if(1==this.check){var t={ids:this.ids,status:1};Object(s.b)(t).then(function(t){1==t.data.success?(e.$message({message:"审核成功!",type:"success"}),e.dialogVisible=!1,e.limit={page:e.page,size:e.size},e.getPages(e.limit)):e.$message("审核未成功，请刷新后重新提交审核!")})}else if(2==this.check){t={ids:this.ids,status:2};Object(s.b)(t).then(function(t){1==t.data.success?(e.$message({message:"审核成功!",type:"success"}),e.dialogVisible=!1,e.limit={page:e.page,size:e.size},e.getPages(e.limit)):e.$message("审核未成功，请刷新后重新提交审核!")})}},cenclAllCheck:function(){this.dialogVisible=!1,this.$message("取消审核!")},handleClose:function(){this.dialogVisible=!1,this.$message("取消审核!")},batchDele:function(){var e=this;this.ids=[];for(var t=this.checkedLists,i=0;i<t.length;i++)this.ids.push(t[i].id);var a={ids:this.ids};this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.c)(a).then(function(t){1==t.data.success?(e.$message({message:"删除成功!",type:"success"}),e.limit={page:e.page,size:e.size},e.getPages(e.limit)):e.$message("删除未成功，请刷新后重新删除!")})}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},getPages:function(e){var t=this;Object(s.e)(e).then(function(e){t.tableData=e.data.data.content,t.data=e.data.data})}},mounted:function(){this.limit={page:this.page,size:this.size},this.getPages(this.limit)},created:function(){var e=this,t={token:this.$cookie.get("userId")};Object(s.f)(t).then(function(t){0==t.data.success&&(e.$router.push({path:"/login"}),e.$message.error("登录过期，请重新登录！"))})}},o={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table"},[i("div",{staticClass:"crumbs"},[i("el-breadcrumb",{attrs:{separator:"/"}},[i("el-breadcrumb-item",[i("i",{staticClass:"el-icon-lx-people"}),e._v(" 用户管理")])],1)],1),e._v(" "),i("div",{staticClass:"container"},[i("div",{staticClass:"handle-box"},[i("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"delete",disabled:e.btnDisabled},on:{click:e.batchDele}},[e._v("删除")]),e._v(" "),i("el-button",{staticClass:"handle-del mr11",attrs:{type:"primary",icon:"delete",disabled:e.btnDisabled},on:{click:e.batchCheck}},[e._v("审核")])],1),e._v(" "),i("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,"tooltip-effect":"dark",border:""},on:{"selection-change":e.selectChange,select:e.checked,"select-all":e.allChecked}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{prop:"id",label:"ID",width:"100",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"注册日期",width:"230",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._f("datefmt")(t.row.createTime,"YYYY-MM-DD HH:mm:ss")))]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"username",label:"用户名",width:"230",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{prop:"phone",label:"手机号",width:"230",align:"center","show-overflow-tooltip":!0}}),e._v(" "),i("el-table-column",{attrs:{label:"详情",width:"230",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return e.handleDetail(t.row)}}},[e._v("详细信息")])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"操作",width:"230",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text"},on:{click:function(i){return e.handleEdit(t.$index,t.row)}}},[e._v("确认信息")])]}}])}),e._v(" "),i("el-table-column",{attrs:{label:"状态",align:"center","show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?i("el-button",{attrs:{type:"warning",plain:"",disabled:""}},[e._v("未审核")]):1==t.row.status?i("el-button",{attrs:{type:"success",plain:"",disabled:""}},[e._v("审核通过")]):2==t.row.status?i("el-button",{attrs:{type:"danger",disabled:""}},[e._v("审核未通过")]):e._e()]}}])})],1),e._v(" "),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{background:"","current-page":e.page,"page-sizes":[20,50,100,200,400,1e3],layout:"total, sizes, prev, pager, next, jumper",total:e.data.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"编辑",visible:e.editVisible,width:"30%"},on:{"update:visible":function(t){e.editVisible=t}}},[i("el-form",{ref:"form",attrs:{"label-position":e.labelPosition,model:e.form,"label-width":"90px"}},[i("el-form-item",{attrs:{label:"ID"}},[i("el-input",{attrs:{readonly:""},model:{value:e.form.id,callback:function(t){e.$set(e.form,"id",t)},expression:"form.id"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"注册日期"}},[i("el-input",{attrs:{readonly:""},model:{value:e.form.createTime,callback:function(t){e.$set(e.form,"createTime",t)},expression:"form.createTime"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"用户名"}},[i("el-input",{model:{value:e.form.username,callback:function(t){e.$set(e.form,"username",t)},expression:"form.username"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"手机号"}},[i("el-input",{model:{value:e.form.phone,callback:function(t){e.$set(e.form,"phone",t)},expression:"form.phone"}})],1)],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.editVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.saveEdit()}}},[e._v("确 定")])],1)],1),e._v(" "),i("el-dialog",{attrs:{title:"提示",visible:e.dialogVisible,width:"30%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-radio-group",{model:{value:e.check,callback:function(t){e.check=t},expression:"check"}},[i("el-radio",{attrs:{label:1}},[e._v("审核通过")]),e._v(" "),i("el-radio",{attrs:{label:2}},[e._v("审核不通过")])],1),e._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:e.cenclAllCheck}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.allCheck}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var c=i("VU/8")(n,o,!1,function(e){i("kgZK")},"data-v-60f35c1f",null);t.default=c.exports}});
//# sourceMappingURL=6.c068c742540aebed763f.js.map