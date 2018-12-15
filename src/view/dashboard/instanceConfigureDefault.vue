<template>
  <div class="instance_content">
    <div class="queryBox">
      <el-col :span="24" style="display: flex;justify-content: space-between;flex-flow: row wrap;">
        <div class="formbox">
          <el-form :inline="true" :model="queryForm" ref="queryForm">
            <el-form-item style="margin: 0">
              <el-input placeholder="请输入名称" v-model="queryForm.instance_name"></el-input>
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
      <el-table :data="instanceConfigureList" highlight-current-row border stripe>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="mysql_slaveId" label="mysql_slaveId" align="center" sortable>
        </el-table-column>
        <el-table-column prop="instance_name" label="名称" align="center" sortable>
        </el-table-column>
        <el-table-column prop="master_address" label="地址和端口" align="center" sortable>
        </el-table-column>
        <el-table-column prop="master_position" label="日志position" align="center" sortable>
        </el-table-column>
        <el-table-column prop="master_timestamp" label="日志timestamp" align="center" sortable>
        </el-table-column>
        <el-table-column prop="dbUsername" label="canal用户名" align="center" sortable>
        </el-table-column>
        <el-table-column prop="dbPassword" label="canal用户密码" align="center" sortable>
        </el-table-column>
        <el-table-column prop="filter_regex" label="白名单" align="center" width="420" sortable>
        </el-table-column>
        <el-table-column prop="filter_black_regex" label="黑名单" align="center" sortable>
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
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </el-col>
    </div>
    <!--新增页面-->
    <el-dialog
      title="新增intance信息"
      :visible.sync="addDialogVisible"
      width="30%"
      center
      :before-close="callOf">
      <el-form :model="addForm" :label-width="iswidth" :rules="addFormRules" ref="addForm">
        <el-form-item label="instance名称" prop="instance_name">
          <el-input v-model="addForm.instance_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="mysql_slaveId" prop="mysql_slaveId">
          <el-input v-model="addForm.mysql_slaveId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="mysql源IP和端口" prop="master_address">
          <el-input v-model="addForm.master_address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal用户名" prop="dbUsername">
          <el-input v-model="addForm.dbUsername" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal用户密码" prop="dbPassword">
          <el-input v-model="addForm.dbPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="白名单" prop="filter_regex">
          <el-input v-model="addForm.filter_regex" auto-complete="off"></el-input>
        </el-form-item>
        <div class="isContent">
          <el-collapse-transition>
          <div class="hideCon" v-show="isShow">
            <el-form-item label="mysql_binlog名称" prop="master_journal_name">
              <el-input v-model="addForm.master_journal_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_binlog位置" prop="master_position">
            <el-input v-model="addForm.master_position" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_binlog时间戳" prop="master_timestamp">
              <el-input v-model="addForm.master_timestamp" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否启用tsdb" prop="tsdb_enable">
              <el-input v-model="addForm.tsdb_enable" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="tsdb_目录" prop="tsdb_dir">
              <el-input v-model="addForm.tsdb_dir" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="tsdb_url" prop="tsdb_url">
              <el-input v-model="addForm.tsdb_url" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="tsdb_dbUsername" prop="tsdb_dbUsername">
              <el-input v-model="addForm.tsdb_dbUsername" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="tsdb_dbPassword" prop="tsdb_dbPassword">
              <el-input v-model="addForm.tsdb_dbPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_standby源IP和端口" prop="standby_address">
              <el-input v-model="addForm.standby_address" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_standby_binlog名字" prop="standby_journal_name">
              <el-input v-model="addForm.standby_journal_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_standby_binlog位置" prop="standby_position">
              <el-input v-model="addForm.standby_position" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="mysql_standby_binlog时间戳" prop="standby_timestamp">
              <el-input v-model="addForm.standby_timestamp" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="缺省的数据库" prop="defaultDatabaseName">
              <el-input v-model="addForm.defaultDatabaseName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="连接字符集" prop="connectionCharset">
              <el-input v-model="addForm.connectionCharset" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="黑名单" prop="filter_black_regex">
              <el-input v-model="addForm.filter_black_regex" auto-complete="off"></el-input>
            </el-form-item>
          </div>
            </el-collapse-transition>
          <div class="iscollapsebtn" style="text-align: right;">
            <span @click="handleShow">高级选项</span>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="callOf()">取 消</el-button>
         <el-button type="primary" @click.native="submitAddForm">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改界面-->
    <el-dialog
      title="修改instance信息"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
        <el-form-item label="saveId" prop="mysql_slaveId">
          <el-input v-model="editForm.mysql_slaveId" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="instance_name">
          <el-input v-model="editForm.instance_name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址和端口" prop="address">
          <el-input v-model="editForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日志binlog" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日志position" prop="position">
          <el-input v-model="editForm.position" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="日志timestamp" prop="timestamp">
          <el-input v-model="editForm.timestamp" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="dbUsername" prop="dbUsername">
          <el-input v-model="editForm.dbUsername" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="dbPassword" prop="dbPassword">
          <el-input v-model="editForm.dbPassword" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="白名单" prop="whiteregex">
          <el-input v-model="editForm.whiteregex" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="黑名单" prop="blackregex">
          <el-input v-model="editForm.blackregex" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
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
      return{
        instanceConfigureList:[],
        totalCount:10,
        pagesize:10,
        currentPage:1,
        editDialogVisible:false,
        addDialogVisible:false,
        isShow:false,
        iswidth:"130px",
        editFormRules:{
        },
        //新增界面
        addForm: {
          instance_name: "",
          mysql_slaveId: "",
          master_address: "",
          dbUsername: "",
          dbPassword: "",
          filter_regex: "",
          master_journal_name:"",
          master_position:"",
          master_timestamp:"",
          tsdb_enable:"",
          tsdb_dir:"",
          tsdb_url:"",
          tsdb_dbUsername:"",
          tsdb_dbPassword:"",
          standby_address:"",
          standby_journal_name:"",
          standby_position:"",
          standby_timestamp:"",
          defaultDatabaseName:"",
          connectionCharset:"",
          filter_black_regex:""
        },
        addFormRules:{//新增条件限制
          instance_name: [
            {required: true, message: 'canal名称不能为空', trigger: 'blur'}
          ],
          mysql_slaveId: [
            {required: true, message: 'mysql_slaveId不能为空', trigger: 'blur'}
          ],
          master_address: [
            {required: true, message: 'mysql源IP和端口不能为空', trigger: 'blur'}
          ],
          dbUsername: [
            {required: true, message: 'canal用户名不能为空', trigger: 'blur'}
          ],
          dbPassword: [
            {required: true, message: 'canal用户密码不能为空', trigger: 'blur'}
          ],
          filter_regex: [
            {required: true, message: '白名单不能为空', trigger: 'blur'}
          ]
        },
        //修改界面
        editForm: {
          saveId: "",
          address: "",
          name: "",
          position: "",
          timestamp: "",
          dbUsername: "",
          dbPassword: "",
          whiteregex: "",
          blackregex: ""
        },
        //查询
        queryForm: {
          instance_name: ""
        },
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      //获取列表
      getList(name){
       let param = {
          instance_name:name
        };
        axios.get(serverUrl+'/instanceconfig/list',{params:param}).then((response) => {
          let result = response.data;
          this.instanceConfigureList = result.data;
        })
      },
      //显示新增页面
      handleAdd() {
        this.addDialogVisible = true;
        let param =  this.addForm;
      },
      callOf(){//重置表单验证
        this.addDialogVisible = false;
        this.$refs.addForm.resetFields();
      },
      submitAddForm(){//提交新增
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.addForm);
              console.log(param);
              axios.post(serverUrl+"/instanceconfig/add",qsData(param)).then(response => {
                let result = response.data;
                if(result.reCode == '000'){
                  this.addDialogVisible = false;
                  this.getList();
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                }else {
                  this.$message.error('新增失败');
                }
              })
            })
          }
        })
      },
      //删除列表
      handleDel(row){
        //console.log(row.pkUserId)
        this.$confirm('确认删除该条记录吗?', '提示', {
          //confirmButtonText: '确定',
          // cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
        this.editForm = Object.assign({}, row)
      },
      //修改提交
      updateSubmit(){
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let para = Object.assign({}, this.editForm);
              console.log(para)
            })
          }
        })
      },
      //查询instance
      queryData() {
        let para = Object.assign({}, this.queryForm);
        let param = {
          instance_name:para.instance_name
        };
        axios.get(serverUrl+'/instanceconfig/list',{params:param}).then((response) => {
          let result = response.data;
          if(result.code == '1'){
            this.instanceConfigureList = result.data;
            this.$message({
              message: '查询成功',
              type: 'success'
            });
          }else{
            this.$message.error('查询失败');
          }
        })
      },
      handleSizeChange(val){
        console.log(val)
      },
      handleCurrentChange(val){
        console.log(val)
      },
      handleReset(){
        this.queryForm.instance_name= "";
        console.log(this.queryForm)
      },
      handleShow(){
        this.isShow = !this.isShow;
        if(this.isShow){
          this.iswidth = "200px"
        }else{
          this.iswidth = "130px"
        }

      }
    }
  }
</script>
<style>
  @import '../../style/table.css';
  .instance_content{
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding:30px 30px 75px 30px;
    box-sizing: border-box;
  }
  .iscollapsebtn span{
    color:#225488;
  }
</style>
