<template>
  <div class="navbar">
      <div class="toggerBtn">
        <i class="fa fa-bars cursors" @click="handleClick"></i>
      </div>
      <div class="uerInfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><i class="fa fa-user" aria-hidden="true" style="margin-right: 5px;"></i><span>{{userName}}</span>,欢迎您！</span>
          <el-dropdown-menu slot="dropdown">
            <!--<el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>-->
            <!--<el-dropdown-item>设置</el-dropdown-item>-->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
  </div>

</template>
<script>
  export default {
    data(){
      return{
        isCollapse:true,
        userName:""
      }
    },
    mounted(){
      let user = JSON.parse(sessionStorage.getItem('user'));
      this.userName = user.userCode
    },
    methods:{
      handleClick(){
        this.isCollapse = !this.isCollapse;
        this.$emit('getIsCollapse',this.isCollapse)
      },
      //退出登录
      logout(){
        this.$confirm("确认退出登录吗?", "提示", {}).then(() => {
          sessionStorage.removeItem('user');
          this.$router.push("/login")
        }).catch(() => {

        });
      },
      //修改密码
      modifyPassword() {
        this.$prompt("新密码", "修改密码", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: "password",
          inputValidator: (val) => {
            if (val == null) {
              return false
            }
          },
          inputErrorMessage: '密码不能为空!'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: '密码修改成功 '
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        })
      }
    }
  }
</script>
<style>
  .navbar{
    background: #225488;
    height:60px;
    line-height:60px;
    display: flex;
    justify-content: space-between;
    color: #fff;
  }
  .navbar .el-dropdown{
    color: #fff;
    font-size: 16px;
  }
  .navbar .toggerBtn{
    padding:0 10px;
    font-size: 20px;
    cursor: pointer;
  }
  .navbar .uerInfo{
    padding:0 10px;
    text-align: center;

  }
</style>
