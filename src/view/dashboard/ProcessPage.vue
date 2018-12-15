<template>
  <div class="server-content" v-loading="listLoading" :element-loading-text="taxtTip" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="table">
      <el-table :data="serverList" highlight-current-row border stripe>
        <el-table-column prop="canalServerName" label="canal 名称" align="center" sortable>
          <template slot-scope="scope">
            <router-link to="/process/server">
              <span class="linkFont" @click="handleclickId(scope.row)">{{scope.row.canalServerName}}
              </span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="canalServerType" label="canal 类型" align="center" sortable>
          <template slot-scope="scope">
            <router-link to="/serverconfigure">
                <span class="linkFont" @click="handleclickName(scope.row)">
                  {{scope.row.canalServerType}}
                </span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="canalServerHostPort" label="canal master地址" align="center" sortable>
        </el-table-column>
        <el-table-column prop="standbyServerHostPort" label="canal standby地址" align="center" sortable>
        </el-table-column>
        <el-table-column prop="updatetimeStr" label="更新时间" align="center" sortable>
        </el-table-column>
        <el-table-column prop="serverStatusCode" label="master操作" v-if="showOperateBtn" fixed="right" align="center" width="100">
          <template scope="scope">
            <el-button type="success" icon="el-icon-caret-right" circle  v-if="scope.row.serverStatusCode=='0'" @click="handleRestart(scope.row,'master')"></el-button>
            <el-button type="danger" v-else-if="scope.row.serverStatusCode=='1'" @click="handleStop(scope.row,'master')">&nbsp;</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="standbyStatusCode" label="standby操作" v-if="showOperateBtn" fixed="right" align="center" width="110">
          <template scope="scope">
            <el-button type="success" icon="el-icon-caret-right" circle  v-if="scope.row.standbyStatusCode=='0'" @click="handleRestart(scope.row,'standby')"></el-button>
            <el-button type="danger" v-else-if="scope.row.standbyStatusCode=='1'" @click="handleStop(scope.row,'standby')">&nbsp;</el-button>
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

  </div>
</template>
<script>
  import axios from "axios"
  import serverUrl from '../../api/api'
  import {qsData }from '../../filter/switchPost.js'
  export default {
    data(){
      return{
        serverList:[],
        totalCount:0,
        currentPage:1,
        pagesize:15,
        listLoading:false,
        showOperateBtn:false,
        taxtTip:"",
        queryForm:{
          master_address:''
        }
      }
    },
    created(){
      let userAuth = JSON.parse(sessionStorage.getItem('userauth'));
      if(userAuth == '1'){
         this.showOperateBtn = true
      }else{
         this.showOperateBtn = false
      }
    },
    mounted(){
      this.getList();

    },
    methods:{
      //获取列表
      getList(){
        let param = {
          pageNum:this.currentPage,
          numberPerPage:this.pagesize
        };
        axios.get(serverUrl+'/processMonitor/canalServerConfig/list',{params:param}).then((response) => {
          let result = response.data;
          this.serverList = result.data;
          this.totalCount = parseInt(result.totalNum);
        })
      },
      handleSizeChange(val){
          this.pagesize = val;
          this.getList()
      },
      handleCurrentChange(val){
         this.currentPage = val;
         this.getList()
      },
      queryData(){
        let para = Object.assign({}, this.queryForm);
      },

      handleclickId(row){
        let serverId = row.id;
        sessionStorage.setItem('serverId', serverId);
      },
      handleclickName(row){
        let serverName = row.canalServerName;
        sessionStorage.setItem('serverName', serverName);
      },
      handleRestart(row,type){
        this.$confirm('确认启动吗？', '提示', {}).then(() => {
          let canalServerName = {
            canalServerName:row.canalServerName,
            type:type
          };
          axios.get(serverUrl + '/startCanalServer', {params: canalServerName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              //this.getList();
              this.listLoading = true;
              this.taxtTip = "正在启动中......";
              setTimeout(() => {
                this.getList();
                this.$message({
                  message: '启动成功',
                  type: 'success'
                });
                this.listLoading = false;
              },1000)
            } else {
              this.$message.error(result.msg);
            }
          })
        })
      },
      handleStop(row,type){
        this.$confirm('确认停止吗？', '提示', {}).then(() => {
          let canalServerName = {
            canalServerName:row.canalServerName,
            type:type
          };
          axios.get(serverUrl + '/stopCanalServer', {params: canalServerName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.listLoading = true;
              this.taxtTip = "正在停止中......";
              setTimeout(() => {
                this.getList();
                this.$message({
                  message: '停止成功',
                  type: 'success'
                });
                this.listLoading = false;
              },1000);
            } else {
              this.$message.error(result.msg);
            }
          })
        })
      }
    }
  }
</script>
<style>
  @import '../../style/table.css';
  .server-content{
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding:30px 30px 65px 30px;
    box-sizing: border-box;
  }
  .server-content a{
    text-decoration: none;
  }
  .server-content .el-table td, .el-table th{
    padding:5px 0;
  }
  .el-pagination{
    text-align: right;
    margin-top:15px;
  }
  .server-content .linkFont{
    color: #3f88bf;
    padding:7px 15px;
    box-sizing: border-box;
  }
  .server-content .el-icon-caret-right{
    font-weight:600;
    font-size: 15px;
  }
  .server-content .el-icon-close{
    font-weight:700;
    font-size: 15px;
  }
  .server-content .el-button.is-circle{
    padding: 1px;
  }
  .server-content .el-button{
    padding: 0 5px 0 5px;
    font-size: 15px;
  }
</style>
