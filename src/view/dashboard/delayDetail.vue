<template>
  <div class="delay-content">
    <div class="queryBox">
      <el-col :span="24" style="display: flex;justify-content: space-between;flex-flow: row wrap;">
        <div class="formbox">
          <el-form :inline="true" :model="queryForm" ref="queryForm">
            <el-form-item style="margin: 0">
              <el-input placeholder="请输入名称" v-model="queryForm.master_address"></el-input>
            </el-form-item>
            <el-form-item style="margin: 0">
              <el-button type="primary" @click="queryData">查询</el-button>
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
      <el-table :data="delayList.slice((currentPage-1)*pagesize,currentPage*pagesize)" highlight-current-row border stripe>
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column prop="destnation_name" label="destination名称" align="center" width="160" sortable>
        </el-table-column>
        <el-table-column prop="master_address" label="mysql_地址和端口" align="center" width="180" sortable>
        </el-table-column>
        <el-table-column prop="master_position" label="mysql_position" align="center" width="150" sortable>
        </el-table-column>
        <el-table-column prop="master_journal_name" label="mysql_binlog" align="center" width="150" sortable>
        </el-table-column>
        <el-table-column prop="instance_journal_name" label="canal_binlog" align="center" width="150" sortable>
        </el-table-column>
        <el-table-column prop="instance_position" label="canal_position" align="center" width="150" sortable>
        </el-table-column>
        <el-table-column prop="instance_timestamp_str" label="canal_时间戳" align="center" width="160" sortable>
        </el-table-column>
        <el-table-column prop="position_gap" label="position延迟" align="center" width="150" sortable>
        </el-table-column>
        <el-table-column prop="comment" label="备注" align="center" width="300" sortable>
        </el-table-column>
        <el-table-column prop="colour" label="状态" fixed="right" align="center" width="100" sortable>
          <template slot-scope="scope">
            <span class="states" style="background:#f56c6c" v-if="scope.row.colour=='red'"></span>
            <span class="states" style="background:#67c23a" v-else-if="scope.row.colour=='green'"></span>
            <span class="states" style="background:#fea500" v-else-if="scope.row.colour=='yellow'"></span>
            <span class="states" style="background:#808080" v-else="scope.row.colour=='gray'"></span>
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
  import {qsData }from '../../filter/switchPost.js'
  export default {
    data(){
      return{
        delayList:[],
        totalCount:0,
        currentPage:1,
        pagesize:10,
        queryForm:{
          master_address:''
        }
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      //获取列表
      getList(){
        let param = {
          pageNum:this.currentPage,
          numberPerPage:this.pagesize
        };
        let canal_id = {canal_id:sessionStorage.getItem('serverId')};
        axios.get(serverUrl+'/canalgap/list',{params:canal_id}).then((response) => {
          let result = response.data;
          this.delayList = result.data;
          this.totalCount = result.data.length
        })
      },
      handleSizeChange(val){
        this.pagesize = val
      },
      handleCurrentChange(val){
        this.currentPage = val
      },
      queryData(){
        let para = Object.assign({}, this.queryForm);
      },
      handleReset(){

      }

    }
  }
</script>
<style>
  @import '../../style/table.css';
  .delay-content{
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding:30px 30px 75px 30px;
    box-sizing: border-box;
  }
  .delay-content .el-table td, .el-table th{
    padding:5px 0;
  }
  .el-pagination{
    text-align: right;
    margin-top:15px;
  }
  .delay-content .states{
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
</style>
