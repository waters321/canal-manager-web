<template>
  <div class="user_content">
    <div class="queryBox">
      <el-col :span="24" style="display: flex;justify-content: space-between;flex-flow: row wrap;">
        <div class="formbox">
          <el-form :inline="true" :model="queryForm" ref="queryForm">
            <el-form-item style="margin: 0">
              <el-input placeholder="请输入主键" v-model="queryForm.pkUserId"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-input placeholder="请输入用户编号" v-model="queryForm.userCode"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-input placeholder="请输入用户名称" v-model="queryForm.userName"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-select v-model="queryForm.isActive" clearable placeholder="请选择逻辑删除">
                <el-option
                  v-for="item in queryOptions"
                  :key="item.key"
                  :label="item.label"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item style="margin: 0">
              <el-button type="primary" @click="queryData">查询</el-button>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-button type="primary" @click="handleReset"><i class="fa fa-undo" aria-hidden="true"></i></el-button>
            </el-form-item>
          </el-form>
        </div>
        <!--<div class="right">
          <el-button type="danger">批量关闭</el-button>
          <el-button type="success">批量打开</el-button>
        </div>-->
      </el-col>
    </div>
    <div class="table">
      <el-table :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row border stripe>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="pkUserId" label="主键" align="center" width="80" sortable>
        </el-table-column>
        <el-table-column prop="userCode" label="用户编号" align="center" width="130" sortable>
        </el-table-column>
        <el-table-column prop="userName" label="用户名称" align="center" width="130" sortable>
        </el-table-column>
        <el-table-column prop="userMobile" label="用户手机" align="center" width="130" sortable>
        </el-table-column>
        <el-table-column prop="userEmail" label="用户邮箱" align="center" width="190" sortable>
        </el-table-column>
        <el-table-column prop="createUser" label="登记人" align="center" width="100" sortable>
        </el-table-column>
        <el-table-column prop="updateUser" label="更新人" align="center" width="100" sortable>
        </el-table-column>
        <el-table-column prop="insertTime" label="登记日期" align="center" width="170" sortable>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新日期" align="center" width="170" sortable>
        </el-table-column>
        <el-table-column prop="isActive" label="逻辑删除" align="center" :formatter="formatter" width="130" sortable>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template scope="scope">
            <el-button size="small" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 45, 60]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </el-col>
    </div>
    <!--新增页面-->
    <el-dialog
      title="新增用户信息"
      :visible.sync="addDialogVisible"
      width="30%"
      center
      :before-close="callOf">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="用户编号" prop="userCode">
          <el-input v-model="addForm.userCode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">
          <el-input v-model="addForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="userPassword">
          <el-input type="password" v-model="addForm.userPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="userMobile">
          <el-input v-model="addForm.userMobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="addForm.userEmail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户权限" prop="roleCode">
          <el-select v-model="addForm.roleCode">
            <el-option
              v-for="item in userAuthOption"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="上级编号" prop="superior">
          <el-input v-model="addForm.superior" auto-complete="off"></el-input>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="callOf()">取 消</el-button>
         <el-button type="primary" @click.native="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改界面-->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      center
      :before-close="resetUtForm">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户密码" prop="userPassword">
          <el-input type="password" v-model="editForm.userPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="userMobile">
          <el-input v-model="editForm.userMobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="editForm.userEmail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="逻辑删除" prop="isActive">
          <el-select v-model="editForm.isActive">
            <el-option
              v-for="item in isActiveOptions"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户权限" prop="roleCode">
          <el-select v-model="editForm.roleCode">
            <el-option
              v-for="item in userAuthOption"
              :key="item.key"
              :label="item.label"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="resetUtForm">取 消</el-button>
         <el-button type="primary" @click.native="updateSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from "axios"
  import serverUrl from '../../api/api'
  import {qsData }from '../../filter/switchPost.js'
  export default {
    data(){
      let checkPhone = (rule, value, callback) => {
        let regExp = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (regExp.test(value) === false) {
          callback(new Error('请输入正确的手机号！'));
        } else {
          callback();
        }
      };
      let checkEmail = (rule, value, callback) => {
        let regExp = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (regExp.test(value) === false) {
          callback(new Error('邮箱格式不正确，请重新输入！'));
        } else {
          callback();
        }
      };
      return{
        userList:[],
        totalCount:0,
        pagesize:15,
        currentPage:1,
        editDialogVisible:false,
        addDialogVisible:false,
        isShow:false,
        isActiveOptions: [
          {
            key: 1,
            label: "有效"
          }, {
            key: 0,
            label: "无效"
          }
        ],
        queryOptions: [
          {
            key: 1,
            label: "有效"
          }, {
            key: 0,
            label: "无效"
          }
        ],
        userAuthOption: [
          {
            key: 1,
            label: "管理员"
          }, {
            key: 2,
            label: "普通用户"
          }
        ],
        editFormRules:{
          userMobile: [
            {required: true, message: '用户手机不能为空', trigger: 'blur'},
            { validator: checkPhone, trigger: 'blur' }
          ],
          userEmail: [
            {required: true, message: '用户邮箱不能为空', trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur' }
          ],
        },
        //新增界面
        addForm: {
          userCode: "",
          userName: "",
          userPassword: "",
          userMobile: "",
          userEmail: "",
          superior: "",
          roleCode:""
        },
        addFormRules:{//新增条件限制
          userCode: [
            {required: true, message: '用户编号不能为空', trigger: 'blur'}
          ],
          userName: [
            {required: true, message: '用户名称不能为空', trigger: 'blur'}
          ],
          userPassword: [
            {required: true, message: '用户密码不能为空', trigger: 'blur'}
          ],
          roleCode: [
            {required: true, message: '用户权限不能为空', trigger: 'blur'}
          ]
        },
        //修改界面
        editForm: {
          userPassword: "",
          userMobile: "",
          userEmail: "",
          superior: "",
          isActive: "",
          roleCode:""
        },
        //查询
        queryForm: {
          pkUserId: "",
          userCode:"",
          userName:"",
          isActive:""
        },
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      //获取列表
      getList(param){
        axios.get(serverUrl+'/user/selectUserByParam',{params:param}).then((response) => {
          let result = response.data;
          this.userList = result.data;
          this.totalCount = result.data.length
        })
      },
      formatter(row){
        return row.isActive == 1 ? '有效' : row.isActive == 0 ? '无效' : '未知';
      },
      //显示新增页面
      handleAdd() {
        this.addDialogVisible = true;
      },
      callOf(){//重置表单验证
        this.addDialogVisible = false;
        this.$refs.addForm.resetFields();
      },
      resetUtForm() {//重置更新表单验证
        this.editDialogVisible = false;
        this.$refs.editForm.resetFields();
      },
      submitAddForm(){//提交新增用户
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.addForm);
              axios.post(serverUrl+"/user/insert",qsData(param)).then(response => {
                let result = response.data;
                if(result.reCode == 1){
                  this.addDialogVisible = false;
                  this.$refs.addForm.resetFields();
                  this.getList();
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                }else {
                  this.$message.error(result.rsMsg);
                }
              })
            })
          }
        })
      },
      //删除用户
      handleDel(row){
        this.$confirm('确认删除该条记录吗?', '提示', {
          //confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = {
            pkUserId:row.pkUserId
          };
          axios.post(serverUrl + '/user/delete', qsData(id)).then(response => {
            let result = response.data;
            if (result.reCode == 1) {
              this.getList();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error(result.rsMsg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //显示修改界面
      handleUpdate(row) {
        this.editDialogVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //修改提交
      updateSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.editForm);
              axios.post(serverUrl + "/user/update",qsData(param)).then(response => {
                let result = response.data;
                if (result.reCode == 1) {
                  this.editDialogVisible = false;
                  this.$refs.editForm.resetFields();
                  this.getList();
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error(result.rsMsg);
                }
              })
            })
          }
        })
      },
      //查询
      queryData() {
        let param = Object.assign({}, this.queryForm);
        this.currentPage = 1;
        this.getList(param);
        this.userList = []
      },
      handleSizeChange(val){
        this.pagesize = val;
      },
      handleCurrentChange(val){
        this.currentPage = val;
      },
      handleReset(){
        this.queryForm.pkUserId = "";
        this.queryForm.userCode = "";
        this.queryForm.userName = "";
        this.queryForm.isActive = ""
      }
    }
  }
</script>
<style>
  @import '../../style/table.css';
  .user_content{
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding:30px 30px 75px 30px;
    box-sizing: border-box;
  }

  .iscollapsebtn span{
    color:#225488;
  }
  .user_content .el-dialog__header {
    background: #225488;
    color: #fff;
  }

  .user_content .el-dialog__title {
    color: #fff;
  }
  .user_content .el-table td, .user_content .el-table th{
    padding:5px 0;
  }
</style>
