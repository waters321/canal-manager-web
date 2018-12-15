<template>
  <div class="delay-content">
    <div class="table">
      <el-table :data="instanceConfigureList" highlight-current-row border stripe>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="slaveId" label="slaveId" align="center" sortable>
        </el-table-column>
        <el-table-column prop="instanceName" label="名称" align="center" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址和端口" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name" label="日志binlog" align="center" sortable>
        </el-table-column>
        <el-table-column prop="position" label="日志position" align="center" sortable>
        </el-table-column>
        <el-table-column prop="timestamp" label="日志timestamp" align="center" sortable>
        </el-table-column>
        <el-table-column prop="dbUsername" label="dbUsername" align="center" sortable>
        </el-table-column>
        <el-table-column prop="dbPassword" label="dbPassword" align="center" sortable>
        </el-table-column>
        <el-table-column prop="whiteregex" label="白名单" align="center" sortable>
        </el-table-column>
        <el-table-column prop="blackregex" label="黑名单" align="center" sortable>
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
    <el-dialog
      title="修改信息"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
        <el-form-item label="saveId" prop="saveId">
          <el-input v-model="editForm.saveId" auto-complete="off" :disabled="true"></el-input>
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
  export default {
    data(){
      return{
        instanceConfigureList:[],
        totalCount:10,
        pagesize:10,
        currentPage:1,
        editDialogVisible:false,
        addDialogVisible:false,
        editFormRules:{

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
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      //获取列表
      getList(){
        axios.get('../../../static/instanceList.json').then((response) => {
          let list = response.data.list;
          this.instanceConfigureList = list
          //console.log(list)
        })
      },
      //删除列表
      handleDel(row) {
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
              //console.log(para.userPassword)
            })
          }
        })
      },
      handleSizeChange(val){

      },
      handleCurrentChange(val){

      }
    }
  }
</script>
<style>
  .el-table td, .el-table th{
    padding:5px 0;
  }
  .el-pagination{
    text-align: right;
    margin-top:15px;
  }
</style>
