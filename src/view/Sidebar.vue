<template>
  <div class="sidebar">
    <transition><h3 :class="titleFontsize">Canal</h3></transition>
    <transition>
      <el-menu :default-active="$route.path"
               class="el-menu-vertical-demo menupadding"
               :class="sidebarWidth"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               background-color="#151D25"
               text-color="#fff"
               unique-opened
               active-text-color="#ffd04b">
        <template v-for="item in menuLists">
          <router-link v-if="item.children.length == 0" :to="item.menuUrl">
            <el-menu-item :index="item.menuUrl">
              <i :class="item.menuIcon"></i>
              <span slot="title">{{item.menuName}}</span>
            </el-menu-item>
          </router-link>
          <el-submenu v-else :index="item.menuUrl">
            <template slot="title"><!--一级菜单（配置管理）-->
              <i :class="item.menuIcon"></i>
              <span>{{item.menuName}}</span>
            </template>
            <template v-for="child in (item.children)">
              <router-link :to="child.menuUrl" v-if="child.children.length == 0">
                <el-menu-item :index="child.menuUrl">
                  <span slot="title">{{child.menuName}}</span>
                </el-menu-item>
              </router-link>

              <!--<el-submenu v-else :index="child.menuUrl">
                <template slot="title">&lt;!&ndash;二级菜单（server配置）&ndash;&gt;
                  <span>{{child.menuName}}</span>
                </template>
                <template v-for="childSecond in (child.children)">
                  <router-link :to="childSecond.menuUrl" v-if="childSecond.children.length == 0">
                    <el-menu-item :index="childSecond.menuUrl">
                      <span slot="title">{{childSecond.menuName}}</span>
                    </el-menu-item>
                  </router-link>
                  <el-submenu v-else :index="childSecond.menuUrl">
                    <template slot="title">&lt;!&ndash;三级菜单（pipeline配置)&ndash;&gt;
                      <span>{{childSecond.menuName}}</span>
                    </template>
                    <template v-for="childThird in (childSecond.children)">
                      <router-link :to="childThird.menuUrl">
                        <el-menu-item :index="childThird.menuUrl">
                          <span slot="title">{{childThird.menuName}}</span>
                        </el-menu-item>
                      </router-link>
                    </template>
                  </el-submenu>
                </template>
              </el-submenu>-->
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </transition>
  </div>


</template>
<script>
  import axios from 'axios';
  import serverUrl from '../api/api'

  export default {
    props: {
      isCollapses: {
        type: Boolean
      }
    },
    data() {
      return {
        menuLists: '',
        isCollapse: false,
        sidebarWidth: "maxWidths",
        titleFontsize: "maxFontsize"
      }
    },
    created() {
      this.$watch("isCollapses", function (val, vals) {
        this.isCollapse = vals;
        //console.log(vals);
        if (this.isCollapse == false) {
          this.sidebarWidth = 'maxWidths';
          this.titleFontsize = 'maxFontsize'
        } else {
          this.sidebarWidth = 'minWidths';
          this.titleFontsize = 'minFontsize'
        }
      })
    },
    mounted() {
      this.getMenu()
    },
    methods: {
      //获取左侧菜单列表
      getMenu() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        axios.get(serverUrl + "/user/selectUserMenuAuth", {params: {userCode: user.userCode}}).then(response => {
          //console.log(response.data.data)
          this.menuLists = response.data.data
        })
      },
      handleOpen() {

      },
      handleClose() {

      }
    }
  }
</script>
<style>
  .sidebar {
    height: 100%;
    position: relative;
  }

  .sidebar h3 {
    height: 60px;
    width: 100%;
    line-height: 60px;
    text-align: center;
    background: #225488;
    color: #FFF;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 888;
    box-sizing: border-box;
  }

  .menupadding {
    color: #fff;
    border: none;
    height: 100%;
    padding-top: 60px;
    background: #151D25;
    box-sizing: border-box;
  }

  .maxWidths {
    width: 250px;
    transition: all .3s ease;
  }

  .minWidths {
    width: 64px;
    transition: all .3s ease;
  }

  .maxFontsize {
    font-size: 30px;
  }

  .minFontsize {
    font-size: 16px;
  }

  .el-menu a {
    text-decoration: none;
  }

  .el-menu li {
    text-align: left;
    color: #fff;
  }

  .el-menu li i {
    color: #fff;
  }
</style>
