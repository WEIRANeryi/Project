<template>
  <div class="container">
    <div class="logo">
      <i class="iconfont icon-xuexi"></i>
    </div>
    <div class="content">
      <div class="user-phone">
        <i class="iconfont icon-shouji"></i>
        <Field  placeholder="请输入手机号" v-model="formData.phone"></Field>
      </div>
      <div class="line"></div>
      <div class="user-pwd">
        <i class="iconfont icon-yanjing"></i>
        <Field  placeholder="请输入密码" v-model="formData.password"></Field>
      </div>
      <div class="line"></div>
      <div class="user-identify">
        <i class="iconfont icon-shouji"></i>
        <Field  placeholder="请输入验证码" v-model="formData.code"></Field>
        <Button @click="Validator" :disabled="disabled">获取验证码</Button>
      </div>
      <div class="line"></div>
    </div>
    <Button class="bottom-btn" type="primary" @click="register">立即注册</Button>
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
          password: '',
          code: ''
        },
        flag: 60,
        disabled: false,
        isRegister: false,
      }
    },
    methods: {
      register () {
        if (this.isRegister){
          this.$axios.post(this.$api.postRegister,this.formData).then(res => {
            if(res.code == 200){
              this.$router.push({
                name: 'login'
              })
              Toast({
                message: res.msg,
                duration: 1000
              })
            }
          })
        }
      },
      Validator () {
        this.disabled = true;
        this.$axios.post(this.$api.sendCode,{
          phone: this.formData.phone
        }).then(res => {
          if(res.code == 200) {
            this.isRegister = true
            Toast({
              message: res.msg
            })
          } else {
            Toast({
              message: res.msg
            })
          }
        })
        let timer =setInterval(() => {
          this.flag--;
          if (this.flag == 0) {
            clearInterval(timer)
            this.flag = 60
            this.disabled = false
          }
        })
      }
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
    .content {
      margin-top: px2-to-rem(100);
      .line {
        background-color: #0099ff;
      }
      .user-phone {
        display: flex;
        i {
          font-size: 30px;
        }
      }
      .user-pwd {
        display: flex;
        i {
          font-size: 30px;
        }
      }
      .user-identify {
        display: flex;
        justify-content: space-between;
        i {
          font-size: 30px;
        }
        Button {
          /*width: px2-to-rem(95);*/
          font-size: 14px;
        }
      }
    }
  }
  .bottom-btn {
    width: 100%;
    margin-top: px2-to-rem(100);
  }
</style>
