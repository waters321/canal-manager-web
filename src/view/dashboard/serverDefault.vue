<template>
  <div class="server_group">
    <el-button class="createBtn" type="success" @click="handleAdd">创建server</el-button>
    <div class="server_content">
      <p class='noServer' v-show="isServer">当前没有server存在</p>
      <div class="content">
        <div class="timeline" v-for="(item,index) in dataHtml">
          <div class="time_content">
            <span class="data"></span>
            <div class="title">
              {{item.text}}
            </div>
            <div class="serverContent">
              <el-menu
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                text-color="#000"
                unique-opened>
                <template>
                  <template v-if="item.children.length == 0">
                    <el-menu-item :index="item.path" style="padding: 0;margin: 0;">
                      <span slot="title" class="rightmene" @contextmenu="showMenu($event,'flMenu')"
                            :dataCon="item.text">
                        {{item.text}}
                        <vue-context-menu :contextMenuData="contextMenuData" @adddata="adddata" @updatedata="updatedata"
                                          @deldata="deldata" @deploydata="deploydata">
                        </vue-context-menu>
                      </span>
                    </el-menu-item>
                  </template>
                  <el-submenu v-else :index="item.path">
                    <template slot="title">
                      <span class="rightmene2" @contextmenu="showMenu($event,'flMenu')" :dataCon="item.text">
                        {{item.text}}
                        <vue-context-menu :contextMenuData="contextMenuData" @adddata="adddata" @updatedata="updatedata"
                                          @deldata="deldata" @deploydata="deploydata">
                        </vue-context-menu>
                      </span>
                    </template>
                    <template v-for="child in item.children">
                      <template v-if="child.children.length==0">
                        <el-menu-item :index="child.path" style="padding: 0;margin: 0;">
                            <span slot="title" class="rightmene" @contextmenu="showMenu($event,'tlMenu')"
                                  :dataCon="child.text">
                              {{child.text}}
                            <vue-context-menu :contextMenuData="contextMenuData" @adddata="adddata"
                                              @updatedata="updatedata"
                                              @deldata="deldata" @deploydata="deploydata">
                            </vue-context-menu>
                            </span>
                        </el-menu-item>
                      </template>
                      <el-submenu v-else :index="child.path">
                        <template slot="title">
                          <span class="rightmene2" @contextmenu="showMenu($event,'tlMenu')" :dataCon="child.text">
                            {{child.text}}
                            <vue-context-menu :contextMenuData="contextMenuData" @adddata="adddata"
                                              @updatedata="updatedata"
                                              @deldata="deldata" @deploydata="deploydata">
                          </vue-context-menu>
                          </span>
                        </template>
                        <template v-for="childs in child.children">
                          <!--<router-link to="/group2/client">-->
                            <el-menu-item :index="childs.path" style="padding: 0;margin: 0;">
                              <span slot="title" class="rightmene1" @contextmenu="showMenu($event,'slMenu')"
                                    :dataCon="childs.text">
                                {{childs.text}}
                              <vue-context-menu :contextMenuData="contextMenuData" @updatedata="updatedata"
                                                @deldata="deldata">
                              </vue-context-menu>
                              </span>
                            </el-menu-item>
                          <!--</router-link>-->
                        </template>
                      </el-submenu>

                    </template>
                  </el-submenu>
                </template>
              </el-menu>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--创建server-->
    <el-dialog
      title="创建server"
      :visible.sync="addDialogVisible"
      width="45%"
      center
      :before-close="resetserverAForm">
      <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="140px">
        <el-form-item label="canal server类型" prop="canalServerType">
          <el-input v-model="addForm.canalServerType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal home目录" prop="canalHome">
          <el-input v-model="addForm.canalHome" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server名字" prop="canalServerName">
          <el-input v-model="addForm.canalServerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server地址" prop="canalServerHost">
          <el-input v-model="addForm.canalServerHost" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server端口" prop="canalServerPort">
          <el-input v-model="addForm.canalServerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server 配置" prop="canalServerConfiguration">
          <el-input v-model="addForm.canalServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
        <el-form-item label="standby server地址" prop="standbyServerHost">
          <el-input v-model="addForm.standbyServerHost" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="standby server端口" prop="standbyServerPort">
          <el-input v-model="addForm.standbyServerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="standby server 配置" prop="standbyServerConfiguration">
          <el-input v-model="addForm.standbyServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetserverAForm">取 消</el-button>
          <el-button type="primary" @click="submitAddForm('addForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增destination-->
    <el-dialog
      title="创建destination"
      :visible.sync="addFirstDialogVisible"
      width="45%"
      center
      :before-close="resetdesAForm">
      <el-form :model="addFirstForm" :rules="addFirstFormRules" ref="addFirstForm" label-width="170px">
        <el-form-item label="destination名字" prop="destinationName">
          <el-input v-model="addFirstForm.destinationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="destination描述" prop="description">
          <el-input v-model="addFirstForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="destination 配置" prop="destinationConfiguration">
          <el-input v-model="addFirstForm.destinationConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
        <el-form-item label="standby destination配置" prop="standbyConfiguration">
          <el-input v-model="addFirstForm.standbyConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetdesAForm">取 消</el-button>
          <el-button type="primary" @click="submitAddFirstForm('addFirstForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--创建client-->
    <el-dialog
      title="创建client"
      :visible.sync="addClientDialogVisible"
      width="40%"
      center
      :before-close="resetcliAForm">
      <el-form :model="addClientForm" :rules="addClientFormRules" ref="addClientForm" label-width="130px">
        <el-form-item label="client文件地址" prop="path">
          <el-input v-model="addClientForm.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="client服务器地址" prop="host">
        <el-input v-model="addClientForm.host" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="client名字" prop="clientName">
          <el-input v-model="addClientForm.clientName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="zookeeper地址" prop="zkServers">
          <el-input v-model="addClientForm.zkServers" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过滤表达式" prop="filter">
          <el-input v-model="addClientForm.filter" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetcliAForm">取 消</el-button>
          <el-button type="primary" @click="submitAddClientForm('addClientForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改server-->
    <el-dialog
      title="修改server"
      :visible.sync="updateDialogVisible"
      width="45%"
      center
      :before-close="resetserverUtForm">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateForm" label-width="140px">
        <el-form-item label="canal home目录" prop="canalHome">
          <el-input v-model="updateForm.canalHome" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server名字" prop="canalServerName">
          <el-input v-model="updateForm.canalServerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server地址" prop="canalServerHost">
          <el-input v-model="updateForm.canalServerHost" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server端口" prop="canalServerPort">
          <el-input v-model="updateForm.canalServerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="canal server 配置" prop="canalServerConfiguration">
          <el-input v-model="updateForm.canalServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
        <el-form-item label="standby server地址" prop="standbyServerHost">
          <el-input v-model="updateForm.standbyServerHost" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="standby server端口" prop="standbyServerPort">
          <el-input v-model="updateForm.standbyServerPort" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="standby server 配置" prop="standbyServerConfiguration">
          <el-input v-model="updateForm.standbyServerConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetserverUtForm">取 消</el-button>
          <el-button type="primary" @click="submitUpdateForm('updateForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改destination-->
    <el-dialog
      title="修改destination"
      :visible.sync="updateDesDialogVisible"
      width="45%"
      center
      :before-close="resetdesUForm">
      <el-form :model="updateDesForm" :rules="updateDesFormRules" ref="updateDesForm" label-width="170px">
        <el-form-item label="destination名字" prop="destinationName">
          <el-input v-model="updateDesForm.destinationName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="destination描述" prop="description">
          <el-input v-model="updateDesForm.description" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="destination配置" prop="destinationConfiguration">
          <el-input v-model="updateDesForm.destinationConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
        <el-form-item label="standby destination配置" prop="standbyConfiguration">
          <el-input v-model="updateDesForm.standbyConfiguration" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetdesUForm">取 消</el-button>
          <el-button type="primary" @click="submitUpdateDesForm('updateDesForm')">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改client-->
    <el-dialog
      title="修改client"
      :visible.sync="updateClientDialogVisible"
      width="40%"
      center
      :before-close="resetcliUForm">
      <el-form :model="updateClientForm" :rules="updateClientFormRules" ref="updateClientForm" label-width="130px">
        <el-form-item label="client文件地址" prop="path">
          <el-input v-model="updateClientForm.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="client服务器地址" prop="host">
          <el-input v-model="updateClientForm.host" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="client名字" prop="clientName">
          <el-input v-model="updateClientForm.clientName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="zookeeper地址" prop="zkServers">
          <el-input v-model="updateClientForm.zkServers" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="过滤表达式" prop="filter">
          <el-input v-model="updateClientForm.filter" type="textarea" :autosize="{ minRows: 2, maxRows: 15}"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="resetcliUForm">取 消</el-button>
          <el-button type="primary" @click="submitUpdateClientForm('updateClientForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from "axios"
  import Vue from 'vue'
  import serverUrl from '../../api/api'
  import {qsData }from '../../filter/switchPost.js'
  import VueContextMenu from 'vue-contextmenu'
  import 'vue-contextmenu/style/css/font-awesome.min.css'

  Vue.use(VueContextMenu);
  export default {
    data() {
      return {
        addDialogVisible: false,
        addFirstDialogVisible: false,
        addClientDialogVisible: false,
        updateDialogVisible: false,
        updateDesDialogVisible: false,
        updateClientDialogVisible: false,
        dataHtml: '',
        isServer: false,
        isShow: -1,
        canalname: '',
        levelMune: '',
        contextMenuData: {
          menuName: 'demo',
          axis: {x: null, y: null},
          menulists: [
            {
              fnHandler: 'adddata', // Binding events(绑定事件)
              icoName: 'fa fa-plus-square-o', // icon (icon图标 )
              btnName: '新增' // The name of the menu option (菜单名称)
            },
            {
              fnHandler: 'updatedata',
              icoName: 'fa fa-pencil',
              btnName: '修改'
            }, {
              fnHandler: 'deldata',
              icoName: 'fa fa-times',
              btnName: '删除'
            }, {
              fnHandler: 'deploydata',
              icoName: 'fa fa-wrench',
              btnName: '部署'
            }
          ]
        },
        //新增server界面
        addForm: {
          canalServerType: "",
          canalHome: "",
          canalServerName: "",
          canalServerHost: "",
          canalServerPort: "",
          canalServerConfiguration: "",
          standbyServerHost: "",
          standbyServerPort: "",
          standbyServerConfiguration: ""
        },
        //新增destination
        addFirstForm: {
          destinationName: "",
          description: "",
          destinationConfiguration: "",
          standbyConfiguration: ""
        },
        /*新增client*/
        addClientForm: {
          path:"",
          host:"",
          clientName: "",
          zkServers: "",
          filter: ""
        },
        addFirstFormRules: {
          destinationName: [
            {required: true, message: 'destination名字不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: 'destination描述不能为空', trigger: 'blur'}
          ],
          destinationConfiguration: [
            {required: true, message: 'destination 配置不能为空', trigger: 'blur'}
          ],
        },
        addFormRules: {
          canalServerType: [
            {required: true, message: 'canal server类型不能为空', trigger: 'blur'}
          ],
          canalHome: [
            {required: true, message: 'anal home目录不能为空', trigger: 'blur'}
          ],
          canalServerName: [
            {required: true, message: 'canal server名字不能为空', trigger: 'blur'}
          ],
          canalServerHost: [
            {required: true, message: 'canal server地址不能为空', trigger: 'blur'}
          ],
          canalServerPort: [
            {required: true, message: 'canal server端口不能为空', trigger: 'blur'}
          ],
          canalServerConfiguration: [
            {required: true, message: 'canal server 配置不能为空', trigger: 'blur'}
          ]
        },
        addClientFormRules: {
          path: [
            {required: true, message: 'client文件地址不能为空', trigger: 'blur'}
          ],
          host: [
            {required: true, message: 'zookeepe服务器地址不能为空', trigger: 'blur'}
          ],
          clientName: [
            {required: true, message: 'client名字不能为空', trigger: 'blur'}
          ],
          zkServers: [
            {required: true, message: 'zookeeper地址不能为空', trigger: 'blur'}
          ],
        },
        //修改server
        updateForm: {
          canalHome: "",
          canalServerName: "",
          canalServerHost: "",
          canalServerPort: "",
          canalServerConfiguration: "",
          standbyServerHost: "",
          standbyServerPort: "",
          standbyServerConfiguration: ""
        },
        //修改destination
        updateDesForm: {
          destinationName: "",
          description: "",
          destinationConfiguration: "",
          standbyConfiguration: ""
        },
        updateClientForm: {
          path:"",
          host:"",
          clientName: "",
          zkServers: "",
          filter: ""
        },
        updateFormRules: {
          canalHome: [
            {required: true, message: 'anal home目录不能为空', trigger: 'blur'}
          ],
          canalServerName: [
            {required: true, message: 'canal server名字不能为空', trigger: 'blur'}
          ],
          canalServerHost: [
            {required: true, message: 'canal server地址不能为空', trigger: 'blur'}
          ],
          canalServerPort: [
            {required: true, message: 'canal server端口不能为空', trigger: 'blur'}
          ],
          canalServerConfiguration: [
            {required: true, message: 'canal server 配置不能为空', trigger: 'blur'}
          ]
        },
        updateDesFormRules: {
          destinationName: [
            {required: true, message: 'destination名字不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: 'destination描述不能为空', trigger: 'blur'}
          ],
          destinationConfiguration: [
            {required: true, message: 'destination配置不能为空', trigger: 'blur'}
          ]
        },
        updateClientFormRules: {
          path: [
            {required: true, message: 'client文件地址不能为空', trigger: 'blur'}
          ],
          host: [
            {required: true, message: 'zookeepe服务器地址不能为空', trigger: 'blur'}
          ],
          clientName: [
            {required: true, message: 'client名字不能为空', trigger: 'blur'}
          ],
          zkServers: [
            {required: true, message: 'zookeeper地址不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.getCanalServer()
    },
    methods: {
      getCanalServer() {
        axios.get(serverUrl + "/listCanalMenu").then(response => {
          let result = response.data;
          if (result.data.length == 0) {
            this.isServer = true
          } else if (result.code == 1) {
            this.isServer = false;
            this.dataHtml = result.data;
          }
        })
      },
      handleAdd() {//增加canal server
        this.addDialogVisible = true;
      },
      submitAddForm(formName) {//提交新增server
        //this.addDialogVisible = false
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.addForm);
              axios.post(serverUrl + "/addCanalServer", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.addDialogVisible = false;
                  this.$refs.addForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('新增失败');
                }
              })
            })
          }
        })
      },
      submitAddFirstForm(formName) {//提交新增destination
        this.$refs.addFirstForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.addFirstForm);
              let canalServerName = "canalServerName";
              param[canalServerName] = this.canalname;
              axios.post(serverUrl + "/addDestination", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.addFirstDialogVisible = false;
                  this.$refs.addFirstForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('新增失败');
                }
              })
            })
          }
        })
      },
      submitAddClientForm(formName) {//提交新增client
        this.$refs.addClientForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.addClientForm);
              let destinationName = "destinationName";
              param[destinationName] = this.canalname;
              axios.post(serverUrl + "/addClient", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.addClientDialogVisible = false;
                  this.$refs.addClientForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('新增失败');
                }
              })
            })
          }
        })
      },
      showMenu(e, num) {
        let canalName = e.target.getAttribute("dataCon");
        this.levelMune = num;
        this.canalname = canalName;
        event.preventDefault();
        let x = event.clientX;
        let y = event.clientY;
        // Get the current location
        if (this.levelMune == "slMenu") {
          this.contextMenuData.menulists = [{
            fnHandler: 'updatedata',
            icoName: 'fa fa-pencil',
            btnName: '修改 client'
          }, {
            fnHandler: 'deldata',
            icoName: 'fa fa-times',
            btnName: '删除 client'
          }]
        } else if (this.levelMune == "flMenu") {
          this.contextMenuData.menulists = [
            {
              fnHandler: 'adddata', // Binding events(绑定事件)
              icoName: 'fa fa-plus-square-o', // icon (icon图标 )
              btnName: '新增 destination' // The name of the menu option (菜单名称)
            },
            {
              fnHandler: 'updatedata',
              icoName: 'fa fa-pencil',
              btnName: '修改 server'
            }, {
              fnHandler: 'deldata',
              icoName: 'fa fa-times',
              btnName: '删除 server'
            }, {
              fnHandler: 'deploydata',
              icoName: 'fa fa-wrench',
              btnName: '部署 server'
            }
          ]
        }else if(this.levelMune == "tlMenu"){
          this.contextMenuData.menulists = [
            {
              fnHandler: 'adddata', // Binding events(绑定事件)
              icoName: 'fa fa-plus-square-o', // icon (icon图标 )
              btnName: '新增 client' // The name of the menu option (菜单名称)
            },
            {
              fnHandler: 'updatedata',
              icoName: 'fa fa-pencil',
              btnName: '修改 destination'
            }, {
              fnHandler: 'deldata',
              icoName: 'fa fa-times',
              btnName: '删除 destination'
            }, {
              fnHandler: 'deploydata',
              icoName: 'fa fa-wrench',
              btnName: '部署 destination'
            }
          ]
        }
        this.contextMenuData.axis = {
          x, y
        }
      },
      adddata() {
        if (this.levelMune == 'flMenu') {
          this.addFirstDialogVisible = true;
        }
        ;
        if (this.levelMune == 'tlMenu') {
          this.addClientDialogVisible = true;
        }

      },
      updatedata() {
        if (this.levelMune == 'flMenu') {
          //console.log(this.canalname)
          let canalServerName = {
            canalServerName: this.canalname
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
              this.updateForm = Object.assign({}, newupdateForm);
            }
          })
        }
        ;
        if (this.levelMune == 'tlMenu') {
          let destinationName = {
            destinationName: this.canalname
          };
          axios.get(serverUrl + "/selectDestinationOldConfig", {params: destinationName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.updateDesDialogVisible = true;
              let newupdateDesForm = {
                destinationName: result.data.destination_name,
                description: result.data.description,
                destinationConfiguration: result.data.destination_configuration,
                standbyConfiguration: result.data.standby_configuration
              };
              this.updateDesForm = Object.assign({}, newupdateDesForm);
            }
          })
        };
        if (this.levelMune == 'slMenu') {
          let clientName = {
            clientName: this.canalname
          };
          axios.get(serverUrl + "/selectClientOldConfig", {params: clientName}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.updateClientDialogVisible = true;
              let newupdateClientForm = {
                path:result.data.path,
                host:result.data.host,
                clientName: result.data.client_name,
                zkServers: result.data.zk_servers,
                filter: result.data.filter
              };
              this.updateClientForm = Object.assign({}, newupdateClientForm);
            }
          });
        }
        event.preventDefault();
      },
      deldata() {//删除
        let canalServerName = {
          canalServerName: this.canalname
        };
        let destinationName = {
          destinationName: this.canalname
        };
        let clientName = {
          clientName: this.canalname
        };
        if (this.levelMune == 'flMenu') {
          this.deleteFunc("/deleteCanalServer", canalServerName)
        }
        if (this.levelMune == 'tlMenu') {
          this.deleteFunc("/deleteDestination", destinationName)
        }
        if (this.levelMune == 'slMenu') {
          this.deleteFunc("/deleteClient", clientName)
        }
        event.preventDefault();
      },
      deleteFunc(url, param) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          axios.get(serverUrl + url, {params: param}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.getCanalServer();
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else {
              this.$message.error('删除失败');
            }
          })
        })
      },
      resetserverAForm() {//重置server新增表单验证
        this.addDialogVisible = false;
        this.$refs.addForm.resetFields();
      },
      resetdesAForm() {//重置destination新增表单验证
        this.addFirstDialogVisible = false;
        this.$refs.addFirstForm.resetFields();
      },
      resetcliAForm() {//重置client新增表单验证
        this.addClientDialogVisible = false;
        this.$refs.addClientForm.resetFields();
      },
      resetserverUtForm() {//重置server更新表单验证
        this.updateDialogVisible = false;
        this.$refs.updateForm.resetFields();
      },
      resetdesUForm() {//重置destination更新表单验证
        this.updateDesDialogVisible = false;
        this.$refs.updateDesForm.resetFields();
      },
      resetcliUForm() {//重置client更新表单验证
        this.updateClientDialogVisible = false;
        this.$refs.updateClientForm.resetFields();
      },
      submitUpdateForm() {//提交修改server表单
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.updateForm);
              let serverName = "serverName";
              param[serverName] = this.canalname;
              axios.post(serverUrl + "/updateCanalServer", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.updateDialogVisible = false;
                  this.$refs.updateForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('更新失败');
                }
              })
            })
          }
        })
      },
      submitUpdateDesForm() {//提交修改destination表单
        this.$refs.updateDesForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.updateDesForm);
              let destinationNameUpdateKey = "destinationNameUpdateKey";
              param[destinationNameUpdateKey] = this.canalname;
              axios.post(serverUrl + "/updateDestination", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.updateDesDialogVisible = false;
                  this.$refs.updateDesForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('更新失败');
                }
              })
            })
          }
        })
      },
      submitUpdateClientForm() {//提交修改client表单
        this.$refs.updateClientForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              let param = Object.assign({}, this.updateClientForm);
              let clientNameUpdateKey = "clientNameUpdateKey";
              param[clientNameUpdateKey] = this.canalname;
              axios.post(serverUrl + "/updateClient", qsData(param)).then(response => {
                let result = response.data;
                if (result.code == 1) {
                  this.updateClientDialogVisible = false;
                  this.$refs.updateClientForm.resetFields();
                  this.getCanalServer();
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                } else {
                  this.$message.error('更新失败');
                }
              })
            })
          }
        })
      },
      deploydata() {
        let canalServerName = {
          canalServerName: this.canalname
        };
        let destinationName = {
          destinationName: this.canalname
        };
        if (this.levelMune == 'flMenu') {
          this.deployFunction("/deployCanalServer", canalServerName)
        }
        if (this.levelMune == 'tlMenu') {
          this.deployFunction("/deployDestination", destinationName)
        }
      },
      deployFunction(url, param){
        this.$confirm('确认需要部署吗？', '提示', {}).then(() => {
          axios.get(serverUrl + url, {params: param}).then(response => {
            let result = response.data;
            if (result.code == 1) {
              this.getCanalServer();
              this.$message({
                message: '部署成功',
                type: 'success'
              });
            } else {
              this.$message.error('部署失败');
            }
          })
        })
      }
    }
  }
</script>
<style>
  .server_group {
    background: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    padding: 50px 30px 30px 30px;
    position: relative;
    box-sizing: border-box;
  }

  .server_group .el-menu {
    border-right: none;
  }

  .server_group .el-menu li i {
    color: #000;
  }

  .server_group .createBtn {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 7px 5px;
  }

  .server_group .el-dialog__header {
    background: #225488;
    color: #fff;
  }

  .server_group .el-dialog__title {
    color: #fff;
  }

  .server_content {
    background: #f0f7ff;
    padding: 20px 0;
  }

  .server_content::-webkit-scrollbar {
    display: none;
  }

  .content {
    width: 97%;
    margin: 20px auto;

  }

  .timeline {
    width: 50%;
    margin: auto;
    position: relative;
    overflow: hidden;

  }

  .timeline:before {
    content: "";
    display: block;
    width: 2px;
    height: 100%;
    background: #ee4d4d;
    margin: 0 0 0 -1px;
    position: absolute;
    top: 0;
    left: 50%;
  }

  .time_content{
    width: 45%;
    margin: 1px 0 0 0;
    border-radius: 6px;
  }
  .timeline:nth-child(odd) .time_content {
    float: left;
  }

  .timeline:nth-child(even) .time_content {
    float: right;
  }

  @media screen and (max-width:1200px){
    .time_content{
      width:200px;
    }
    .timeline{
      width:450px;
    }
  }

  .timeline .data {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #ee4d4d;
    margin: 0 0 0 -15px;
    position: absolute;
    top: 0;
    left: 50%;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }

  .timeline .title {
    padding: 15px;
    margin: 0;
    font-size: 18px;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: -1px;
    border-radius: 6px 6px 0 0;
    position: relative;
    word-break: break-all;
  }

  .timeline .title:after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: 20px;
    right: -5px;
    transform: rotate(-45deg);
  }

  .timeline:nth-child(2n+2) .title:after {
    left: -5px;
  }

  .timeline:nth-child(4n+1) .title, .timeline:nth-child(4n+1) .title:after {
    background: #FB8C00;
  }

  .timeline:nth-child(4n+2) .title, .timeline:nth-child(4n+2) .title:after {
    background: #9f84c4;
  }

  .timeline:nth-child(4n+3) .title, .timeline:nth-child(4n+3) .title:after {
    background: #66bb6a;
  }

  .timeline:nth-child(4n+4) .title, .timeline:nth-child(4n+4) .title:after {
    background: #02a2dd;;
  }

  .timeline .serverContent {
    padding: 5px;
    margin: 0;
    font-size: 14px;
    color: #656565;
    background: #fff;
    border-radius: 0 0 6px 6px;
  }

  .timeline .title .iconsbtn {
    position: absolute;
    top: -3px;
    font-size: 16px;
    cursor: pointer;
    z-index: 100;
  }

  .timeline:nth-child(2n) .title .iconsbtn {
    right: -3px;
  }

  .timeline:nth-child(2n+1) .title .iconsbtn {
    left: -3px;
  }

  .server_content .noServer {
    text-align: center;
    padding: 50px;
    font-size: 20px;
  }

  .el-menu-item .rightmene {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }

  .el-menu-item .rightmene1 {
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 60px;
    box-sizing: border-box;
  }

  .el-submenu__title .rightmene2 {
    display: inline-block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

</style>
