<template>
  <div id="wrapper">
    <div class="left-wrapper">
      <Sidebar :isCollapses="isCollapse"></Sidebar>
    </div>
    <div class="right-wrapper" :class="lrCollapse">
      <div class="header">
        <Navbar @getIsCollapse="getisCollapse"></Navbar>
      </div>
      <section class="main">
        <div class="content-top"><h4>{{$route.name}}</h4></div>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>
<script>
  import Sidebar from "./Sidebar.vue"
  import Navbar from "./Navbar.vue"
  import axios from 'axios';
  export default {
    data() {
      return {
        isCollapse: "",
        lrCollapse: "rightStretch"
      }
    },
    components: {
      Sidebar,
      Navbar
    },
    mounted() {
    },
    methods: {
      getisCollapse(data) {
        this.isCollapse = data;
        if (data == true) {
          this.lrCollapse = "rightStretch"
        } else {
          this.lrCollapse = "leftStretch"
        }
      }
    }
  }
</script>
<style>
  #wrapper {
    height: 100%;
    overflow: hidden;
  }

  .left-wrapper {
    float: left;
    height: 100%;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 888;
    width: 100%;
  }

  .right-wrapper {
    background: #ecf0f5;
    position: relative;
    height: 100%;
  }

  .rightStretch {
    margin-left: 250px;
  }

  .leftStretch {
    margin-left: 64px;
  }

  .main {
    height: 100%;
    padding: 80px 20px 20px 20px;
    box-sizing: border-box;
    overflow: auto;
  }

  .main::-webkit-scrollbar {
    display: none;
  }

  .main .content-top {
    margin-bottom: 15px;
    color: rgba(0, 0, 0, 0.8);
  }
</style>
