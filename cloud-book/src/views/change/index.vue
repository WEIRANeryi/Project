<template>
  <div class="container">
    <div class="top">
      <Button icon="back" size="small" type="primary" class="btn1" @click="handleJump1">返回</Button>
      <h2>修改个人信息</h2>
    </div>
    <div class="content">
      <sw-upload class="avatar content-item" @success="changeAvatar">
        <div class="des">
          <span>头像</span>
        </div>
        <div class="msg">
          <img v-if="userData.user" :src="userData.user.avatar" alt="">
          <i class="iconfont icon-xiayiye"></i>
        </div>
      </sw-upload>
      <div class="line"></div>
      <div class="avatar content-item">
        <div class="des">
          <span>昵称</span>
        </div>
        <div class="msg" @click="handleJump2">
          <span v-if="userData.user">{{userData.user.username || userData.user.phone}}</span>
          <i class="iconfont icon-xiayiye"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="avatar content-item">
        <div class="des">
          <span>个性签名</span>
        </div>
        <div class="msg" @click="handleJump3">
          <span>{{userData.user.describle || '用户个性签名'}}</span>
          <i class="iconfont icon-xiayiye"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="avatar content-item" @click="handleJump4">
        <div class="des">
          <span>修改密码</span>
        </div>
        <div class="msg">
          <i class="iconfont icon-xiayiye"></i>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
  import {Button,Toast} from 'mint-ui'
  import swupload from '@/components/sw-upload'
export default {
  name: "index",
  components: {
    Button,
    Toast,
    'sw-upload': swupload,
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    handleJump1 () {
      this.$router.push({
        name: 'personal'
      })
    },
    handleJump2 () {
      this.$router.push({
        name: 'changeName'
      })
    },
    handleJump3 () {
      this.$router.push({
        name: 'changeDes'
      })
    },
    handleJump4 () {
      this.$router.push({
        name: 'changePwd'
      })
    },
    changeAvatar (url) {
      this.$axios.put(this.$api.changeUser,{
        avatar: url
      }).then(res => {
        if (res.code ==200) {
          Toast({
            message: '头像修改成功'
          })
          this.$store.dispatch('getUserData')
        }
      })
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.isLogin = true
      this.$store.dispatch('getUserData')
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    }
  },
}
</script>

<style scoped lang="scss">
@import '../../globalCss/px2-rem';

  .container {
    margin: 0;
    padding: 0;
    .top {
      height: px2-to-rem(80);
      background-color: #26a2ff;
      position: relative;
      text-align: center;
      .btn1 {
        position: absolute;
        left: 0;
      }
      h2 {
        display: inline-block;
        color: #ffffff;
        font-size: 18px;
        margin-top: 8px;
      }
    }
    .content {
      .content-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: px2-to-rem(80);
        .des {
          span {
            font-size: 16px;
          }
        }
        .msg {
          display: flex;
          align-items: center;
          img {
            width: px2-to-rem(120);
            height: px2-to-rem(120);
            border-radius: 50%;
          }
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
  .line {
    height: 1px;
    background-color: #333;
  }
body{
  background-color: #9C9C99;
}
</style>
