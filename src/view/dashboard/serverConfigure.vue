<template>
  <div class="server_configure">
    <div class="server_detail">
      <div class="server_form">
        <el-form :model="showForm" label-width="140px">
          <el-form-item  label="canal home目录:" prop="canalHome">
            <el-input v-model="showForm.canalHome" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item  label="canal server名字:" prop="canalServerName">
            <el-input v-model="showForm.canalServerName" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item  label="canal server地址:" prop="canalServerHost">
            <el-input v-model="showForm.canalServerHost" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item  label="canal server端口:" prop="canalServerPort">
            <el-input v-model="showForm.canalServerPort" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item  label="canal server 配置:" prop="canalServerConfiguration">
            <el-input v-model="showForm.canalServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 11}" disabled></el-input>
          </el-form-item>
          <el-form-item label="standby server地址" prop="standbyServerHost">
            <el-input v-model="showForm.standbyServerHost" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="standby server端口" prop="standbyServerPort">
            <el-input v-model="showForm.standbyServerPort" auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="standby server 配置" prop="standbyServerConfiguration">
            <el-input v-model="showForm.standbyServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 11}" disabled></el-input>
          </el-form-item>
        </el-form>
      </div>

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
       showForm:{
         canalHome: "",
         canalServerName: "",
         canalServerHost: "",
         canalServerPort: "",
         canalServerConfiguration: "",
         standbyServerHost: "",
         standbyServerPort: "",
         standbyServerConfiguration: ""
       }
     }
   },
   mounted(){
     this.getFormData()
   },
   methods:{
     getFormData(){
       let canalServerName = {
         canalServerName: sessionStorage.getItem('serverName')
       };
       axios.get(serverUrl + "/selectCanalServerOldConfig", {params: canalServerName}).then(response => {
         let result = response.data;
         if (result.code == 1) {
           this.updateDialogVisible = true;
           let newupdateForm = {
             canalHome: result.data.canal_home,
             canalServerName: result.data.canal_server_name,
             canalServerHost: result.data.canal_server_host,
             canalServerPort: result.data.canal_server_port,
             canalServerConfiguration: result.data.canal_server_configuration,
             standbyServerHost: result.data.standby_server_host,
             standbyServerPort: result.data.standby_server_port,
             standbyServerConfiguration: result.data.standby_server_configuration
           };
           this.showForm = Object.assign({}, newupdateForm);
         }
       })
     }
   }
 }
</script>
<style>
  .server_configure{
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding: 30px 30px 30px 30px;
    box-sizing: border-box;
  }
 .server_configure .server_detail{
   background: #f0f7ff;
   padding: 20px 0;
 }
  .server_configure .server_form{
    width:40%;
  }
</style>
