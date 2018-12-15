<template>
  <div class="process-content">
    <div class="processState">
      <el-row :gutter="10">
        <template v-if="serverList.length == 2">
          <el-col :xs="24" :sm="12" :lg="12" class="serverCenter" v-for="item in serverList">
            <div v-if="item.color=='red'" style="display: inline-block">
              <span class="cserver process1">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='green'" style="display: inline-block">
              <span class="cserver process2">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='yellow'" style="display: inline-block">
              <span class="cserver process3">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else="item.color=='gray'" style="display: inline-block">
              <span class="cserver process4">
                {{item.addressPort}}
              </span>
            </div>
          </el-col>
        </template>
        <template v-else-if="serverList.length == 3">
          <el-col :xs="24" :sm="8" :lg="8" class="serverCenter" v-for="item in serverList">
            <div v-if="item.color=='red'" style="display: inline-block">
              <span class="cserver process1">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='green'" style="display: inline-block">
              <span class="cserver process2">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='yellow'" style="display: inline-block">
              <span class="cserver process3">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else="item.color=='gray'" style="display: inline-block">
              <span class="cserver process4">
                {{item.addressPort}}
              </span>
            </div>
          </el-col>
        </template>
        <template v-else-if="serverList.length == 4">
          <el-col :xs="24" :sm="12" :lg="6" class="serverCenter" v-for="item in serverList">
            <div v-if="item.color=='red'" style="display: inline-block">
              <span class="cserver process1">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='green'" style="display: inline-block">
              <span class="cserver process2">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else-if="item.color=='yellow'" style="display: inline-block">
              <span class="cserver process3">
                {{item.addressPort}}
              </span>
            </div>
            <div v-else="item.color=='gray'" style="display: inline-block">
              <span class="cserver process4">
                {{item.addressPort}}
              </span>
            </div>
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="processList">
      <el-table :data="processList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row border
                stripe v-loading="listLoading"  :element-loading-text="textTip" element-loading-background="rgba(0, 0, 0, 0.5)">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="clientAddressPort" label="canal_client地址" align="center" width="200" sortable>
        </el-table-column>
        <el-table-column prop="destinationName" label="destination名字" align="center" width="180" sortable>
        </el-table-column>
        <el-table-column prop="clientName" label="client名字" align="center" width="180" sortable>
        </el-table-column>
        <el-table-column prop="mysqlAddress" label="mysql地址" align="center" sortable>
        </el-table-column>
        <el-table-column prop="comment" label="状态描述" align="center" width="550" sortable>
        </el-table-column>
        <el-table-column prop="color" label="状态" fixed="right" align="center" width="100">
          <template slot-scope="scope">
            <span class="states" style="background:#f56c6c" v-if="scope.row.color=='red'"></span>
            <span class="states" style="background:#67c23a" v-else-if="scope.row.color=='green'"></span>
            <span class="states" style="background:#fea500" v-else-if="scope.row.color=='yellow'"></span>
            <span class="states" style="background:#808080" v-else="scope.row.color=='gray'"></span>
          </template>
        </el-table-column>
        <el-table-column prop="canalClientStatusCode" label="操作" v-if="showOperateBtn" fixed="right" align="center" width="100">
          <template scope="scope">
            <el-button type="success" icon="el-icon-caret-right" circle v-if="scope.row.canalClientStatusCode=='0'"
                       @click="handleRestart(scope.row,'master')"></el-button>
            <el-button type="danger" v-else-if="scope.row.canalClientStatusCode=='1'"
                       @click="handleStop(scope.row,'master')">&nbsp;
            </el-button>
            <el-button type="info" icon="el-icon-close" circle v-else-if="scope.row.canalClientStatusCode==''"></el-button>
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
  </div>
</template>
<script>
  import axios from "axios"
  import serverUrl from '../../api/api'
  import {qsData} from '../../filter/switchPost.js'

  export default {
    data() {
      return {
        processList: [],
        totalCount: 0,
        stateType: "",
        currentPage: 1,
        pagesize: 10,
        listLoading:false,
        textTip:"",
        serverList: [],
        showOperateBtn:false
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
    mounted() {
      this.getServerList();
    },
    methods: {
      //获取进程列表
      getServerList() {
        let id = {id: sessionStorage.getItem('serverId')};
        //console.log(id)
        axios.get(serverUrl + '/processMonitor/canalServerstatus/list', {params: id}).then((response) => {
          let result = response.data;
          this.serverList = result.data.canalServerStatusList;
          this.processList = result.data.canalClientStatusList;
          this.totalCount = result.data.canalClientStatusList.length
        })
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleRestart(row,type) {
        this.$confirm('确认启动吗？', '提示', {}).then(() => {
          let clientName = {
            clientName: row.clientName,
            type:type
          };
          axios.get(serverUrl + '/startClient', {params: clientName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.textTip = "正在启动中......";
              this.listLoading = true;
              setTimeout(() => {
                this.getServerList();
                this.$message({
                  message: '启动成功',
                  type: 'success'
                });
                this.listLoading = false;
              },5000)
            } else {
              this.$message.error(result.msg);
            }
          })
        })
      },
      handleStop(row,type) {
        this.$confirm('确认停止吗？', '提示', {}).then(() => {
          let clientName = {
            clientName: row.clientName,
            type:type
          };
          axios.get(serverUrl + '/stopClient', {params: clientName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.listLoading = true;
              this.textTip = "正在停止中......"
              setTimeout(() => {
                this.getServerList();
                this.$message({
                  message: '停止成功',
                  type: 'success'
                });
                this.listLoading = false;
              },5000)

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
  .process-content {
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding: 30px 30px 65px 30px;
    box-sizing: border-box;
  }

  .processState {
    padding: 15px;
    margin-bottom: 15px;
    background: #f0f7ff;
  }

  .cserver {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    color: #fff;
    font-size: 15px;
    word-break: break-all;
    display: table-cell;
    vertical-align: middle;
    padding: 5px;
    box-sizing: border-box;
  }

  .serverCenter {
    text-align: center;
  }

  .process1 {
    background: #f56c6c;
  }

  .process2 {
    background: #67c23a;
  }

  .process3 {
    background: #fea500;
  }

  .process4 {
    background: #808080;
  }

  .process-content .el-table td, .el-table th {
    padding: 5px 0;
  }

  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }

  .processList .states {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  .process-content .el-icon-caret-right {
    font-weight: 600;
    font-size: 15px;
  }

  .process-content .el-icon-close {
    font-weight: 700;
    font-size: 15px;
  }

  .process-content .el-button.is-circle {
    padding: 1px;
  }

  .process-content .el-button {
    padding: 0 5px 0 5px;
    font-size: 15px;
  }
</style>
