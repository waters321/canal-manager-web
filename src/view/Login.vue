<template>
  <div class="login_container">
    <div class="login_page" :style="{backgroundImage: img }">
      <div class="cover">
        <h2>Canal数据平台登录</h2>
        <div class="login_form">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" status-icon label-position="left"
                   label-width="0px"
                   class="demo-ruleForm ">
            <el-form-item prop="username">
              <el-input type="text" placeholder="用户编号" v-model="ruleForm2.username"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" placeholder="用户密码" v-model="ruleForm2.checkPass"></el-input>
            </el-form-item>
            <el-button class="submit" style="width:100%;" @click="handleSubmit">登录</el-button>
          </el-form>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  const imageList = ["pic4.jpg", "pic6.jpg", "pic7.jpg", "pic11.jpg", "pic12.png"];
  import axios from 'axios';
  import {qsData} from '../filter/switchPost.js'
  import serverUrl from '../api/api'
  import {getHttp,postHttp} from '../axiospulig/http'

  export default {
    data() {
      return {
        imageRound: '../img/pic7.jpg',
        img: 'url(' + require('../img/pic7.jpg') + ')',
        ruleForm2: {
          checkPass: "",
          username: ""
        },
        rules2: {
          username: [
            {required: true, message: '请输入用户编号', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入用户密码', trigger: 'blur'}
          ]
        },
        checked: true
      }
    },
    created() {
      let index = Math.round(Math.random() * 5);
      this.img = 'url(' + require('../img/' + imageList[index] + '') + ')'
    },
    methods: {
      handleSubmit() {
        //console.log(this.ruleForm2)
        let username = this.ruleForm2.username;
        let password = this.ruleForm2.checkPass;
        let user = {
          userCode: username,
          userPassword: password
        };
        this.$refs.ruleForm2.validate((val) => {
          if (val) {
            axios.post(serverUrl + "/user/logon2", qsData(user)).then(response => {
              //console.log(response.data);
              if (response.data.reCode == '000') {
                let userauth = response.data.isAdmin;
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('userauth', JSON.stringify(userauth));
                this.$router.push({path: '/'});
              } else {
                this.$alert(response.data.rsMsg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
              }
            });
            /*const result = postHttp("/user/logon2",user);
            result.then(res =>{
              if(res.reCode == '000'){
                let userauth = res.isAdmin;
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('userauth', JSON.stringify(userauth));
                this.$router.push({path: '/'});
              }else{
                this.$alert(res.rsMsg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$message({
                      type: 'info',
                      message: `action: ${ action }`
                    });
                  }
                });
              }
            })*/
          } else {
            return false
          }
        })
      },
      handleKeyDown(ev) {
        if (ev.keyCode == 13) {
          console.log(ev.keyCode)
        }

      }
    }
  }
</script>
<style>
  .login_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f0f0f0;
  }

  .login_page {
    width: 50%;
    height: 650px;
    overflow: hidden;
    -webkit-background-size: cover;
    background-size: cover;
    box-shadow: 2px 0 1px rgba(0, 0, 0, 0.3), -2px 0 1px rgba(0, 0, 0, 0.3), 0 2px 15px #000, 0 -2px 1px rgba(0, 0, 0, 0.3);
  }

  .login_page .cover {
    background: linear-gradient(to top, rgba(0, 0, 0, .1), rgba(0, 0, 0, .2), rgba(0, 0, 0, .3), rgba(0, 0, 0, .4));
    background: -moz-linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .1), rgba(0, 0, 0, .2), rgba(0, 0, 0, .3));
    background: -o-linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, .1), rgba(0, 0, 0, .2), rgba(0, 0, 0, .3));
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .login_page h2 {
    font-size: 25px;
    color: #f0f0f0;
    height: 60px;
    line-height: 60px;
    padding-left: 25px;
  }

  .login_page .login_form {
    position: absolute;
    left: 50%;
    top: 17%;
    width:200px;
    height: 300px;
    padding: 60px 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, .8);
  }

  .login_page .el-form-item {
    margin-bottom: 40px;
  }

  .login_page .el-button {
    margin-top: 60px;
    background: #225488;
    color: #fff;
  }

  .login_page .el-button:hover {
    background: #225488;
    color: #fff;
  }

  @media screen and (max-width: 960px) {
    .login_page .login_form {
      margin-left:-140px;
      height:250px;
    }

    .login_page {
      height: 500px;
    }

    .login_page h2 {
      font-size: 18px;
    }
  }

  @media (min-width: 960px) and (max-width: 1200px) {
    .login_page {
      height: 500px;
    }
    .login_page .login_form {
      margin-left:-140px;
      height:250px;
    }
  }
  @media (min-width: 1200px) and (max-width: 1500px) {
    .login_page .login_form {
      margin-left:-80px;
    }
  }
</style>
