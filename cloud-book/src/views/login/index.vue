<template>
  <div class="container">
    <div class="logo">
      <i class="iconfont icon-xuexi"></i>
    </div>
    <div class="login">
      <div class="user-name">
        <i class="iconfont icon-UserSettings-copy"></i>
        <Field placeholder="请输入手机号" type="tel" v-model="formData.phone"></Field>
      </div>
      <div class="line"></div>
      <div class="user-pwd">
        <i class="iconfont icon-biyan"></i>
        <Field placeholder="请输入密码" type="password" v-model="formData.password"></Field>
      </div>
      <div class="line"></div>
      <div class="register" @click="handleJump">
        <a>没有账号?立即注册</a>
      </div>
    </div>
    <Button class="btn1" type="primary" @click="Register">立即登陆</Button>
  </div>
</template>

<script>
  import {Button,Field,Toast} from 'mint-ui'
  export default {
    name: "index",
    components: {
      Button,
      Field,
      Toast
    },
    data () {
      return {
        formData: {
          phone: '',
          password: ''
        },
        loginStatus: '',
        userData: []
      }
    },
    methods: {
      handleJump () {
        this.$router.push({
          name: 'register'
        })
      },

      Register () {
        // this.loginStatus = this.inspect();
        this.$axios.post(this.$api.postLogin,this.formData).then(res => {
          if(res.code == 200){
            localStorage.setItem('token', res.token)
            Toast({
              message: '登录成功',
              duration: 1000
            })
            setTimeout(() => {
              this.$router.push({
                name: 'index'
              })
            }, 1000)
          }
          else {
            console.log(res);
          }
        })
      },

      // inspect () {
      //   if (this.formData.username) {
      //
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../globalCss/px2-rem";
  .container {
    .logo {
      text-align: center;
      margin-top: px2-to-rem(170);
      .iconfont{
        color: #0099ff;
        font-size: 90px;
      }
    }
    .login {
      margin-top: px2-to-rem(100);
      .line {
        background-color: #0099ff;
      }
      .user-name {
        display: flex;
        i {
          font-size: 30px;
        }
        Field {
          width: 100%;
        }
      }
      .user-pwd {
        display: flex;
        i {
          font-size: 30px;
        }
      }
      .register {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 20px;
        margin-right: 5px;
        a {
          color: #0099ff;
        }
      }
    }
  }
  .btn1 {
    width: 100%;
    margin-top: px2-to-rem(100);
  }
</style>
