<template>
  <div class="delay-content">
    <div class="table">
      <el-table :data="configureList" highlight-current-row border stripe>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="id" label="主键" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name1" label="字段一" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name2" label="字段二" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name3" label="字段三" align="center" sortable>
        </el-table-column>
        <el-table-column prop="name4" label="字段四" align="center" sortable>
        </el-table-column>
        <el-table-column label="状态" fixed="right" align="center" width="150">
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
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="30%"
      center>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户密码" prop="userPassword">
          <el-input v-model="editForm.userPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机" prop="userMobile">
          <el-input v-model="editForm.userMobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userEmail">
          <el-input v-model="editForm.userEmail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级编号" prop="superior">
          <el-input v-model="editForm.superior" auto-complete="off"></el-input>
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
        configureList:[],
        totalCount:14,
        editDialogVisible:false,
        addDialogVisible:false,
        //修改界面
        editForm: {
          pkUserId: 0,
          userCode: "",
          userName: "",
          superior: "",
          userMobile: "",
          userEmail: "",
          createUser: "",
          insertTime: "",
          userPassword: "",
          updateTime: "",
          updateUser: ""
        },
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      //获取列表
      getList(){
        axios.get('../../../static/clientList.json').then((response) => {
          let list = response.data.list
          this.configureList = list
          console.log(list)
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
      }
    }
  }
</script>
