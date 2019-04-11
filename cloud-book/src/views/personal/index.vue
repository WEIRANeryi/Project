<template>
  <div class="container">
    <div class="contents">
      <div class="top">
        <div class="top-left" v-if="!isLogin" @click="handleJump">
          <h1>立即登录</h1>
        </div>
        <div class="top-left" v-else>
          <h1 v-if="userData.user">{{userData.user.username || userData.user.phone}}</h1>
          <span>时光回头，当下最重要</span>
        </div>
        <div class="top-right">
          <img v-if="userData.user" :src="userData.user.avatar" alt="">
          <i class="iconfont icon-youbian"></i>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-item readed">
          <p class="top-character">
            <span class="bottom-item-first">{{userData.read}}</span>
            <span class="bottom-item-second">本</span>
          </p>
          <p class="bottom-character">已读书籍</p>
        </div>
        <div class="vertical-line"></div>
        <div class=" bottom-item collection">
          <p class="top-character">
            <span class="bottom-item-first">{{userData.collection}}</span>
            <span class="bottom-item-second">本</span>
          </p>
          <p class="bottom-character">已收藏书籍</p>
        </div>
        <div class="vertical-line"></div>
        <div class=" bottom-item like">
          <p class="top-character">
            <span class="bottom-item-first">{{userData.like}}</span>
            <span class="bottom-item-second">本</span>
          </p>
          <p class="bottom-character">喜欢</p>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="flex1" @click="handleJump1">
        <div class="middle-item change">
          <i class="iconfont icon-xiugaigerenxinxi change-first first-icon"></i>
          <span class="change-second">修改个人信息</span>
        </div>
        <div class="flex2">
          <i class="iconfont icon-youbian change-third"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="flex1" @click="handleJump2">
        <div class="middle-item change">
          <i class="iconfont icon-jiazhi change-first second-icon"></i>
          <span class="change-second">收藏书单</span>
        </div>
        <div class="flex2">
          <i class="iconfont icon-youbian change-third"></i>
        </div>
      </div>
      <div class="line"></div>
      <div class="flex1" @click="handleJump3">
        <div class="middle-item change">
          <i class="iconfont icon-aihao- change-first third-icon"></i>
          <span class="change-second">喜欢的书</span>
        </div>
        <div class="flex2">
          <i class="iconfont icon-youbian change-third"></i>
        </div>
      </div>
      <div class="line"></div>
    </div>
    <Button class="btn1" v-if="isLogin" type="primary" @click="quit">退出登陆</Button>
    <myTabBar page="person"></myTabBar>
  </div>

</template>

<script>
  import myTabBar from '@/components/tab-bar'
  import {Button} from 'mint-ui'
export default {
  name: "index",
  components: {
    myTabBar,
    Button
  },
  data () {
    return {
      isLogin: false,
    }
  },
  methods: {
    handleJump () {
      this.$router.push({
        name: 'login'
      })
    },
    handleJump1 () {
      this.$router.push({
        name: 'change'
      })
    },
    handleJump2 () {
      this.$router.push({
        name: 'change'
      })
    },
    handleJump3 () {
      this.$router.push({
        name: 'change'
      })
    },
    quit () {
      let token = localStorage.getItem('token');
      token = ''
      this.isLogin = false
    }
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
  }
}
</script>

<style lang="scss" scoped>
  @import "../../globalCss/px2-rem";
  .container {
    padding: 0;
    margin: 0;
    text-align: center;
    .contents {
      height: px2-to-rem(350);
      background-color: #5363DB;
      color: #ffffff;
      .top {
        display: flex;
        justify-content: space-between;
        .top-left {
          margin: 20px 0 0 20px;
          h1 {
            padding-bottom: 10px;
          }
        }
        .top-right {
          width: px2-to-rem(150);
          height: px2-to-rem(150);
          margin: 20px 30px 0 0;
          display: flex;
          img {
            border-radius: 50%;
          }
          i {
            margin: 30px 10px 0 5px;
          }
        }
      }
      .bottom {
        display: flex;
        margin-top: px2-to-rem(50);
        .bottom-item {
          width: 33.3333%;
          text-align: center;
          .top-character {
            margin: 0;
            .bottom-item-first {
              font-size: 18px;
            }
          }
          .bottom-character {
            margin: 0;
            padding-top: 5px;
          }
        }
        .vertical-line {
          margin-top: 10px;
          width: 1px;
          height: px2-to-rem(50);
          background-color: #ffffff;
        }
      }
    }
    .middle {
      margin-top: px2-to-rem(80);
      .flex1 {
        display: flex;
        justify-content: space-between;
        .middle-item {
          height: px2-to-rem(50);
          padding-top: 20px;
          padding-bottom: 20px;
          display: flex;
          .change-first {
            font-size: 40px;
            line-height: px2-to-rem(50);
            margin-left: 10px;
          }
          .change-second {
            /*float: left;*/
            font-weight: 600;
            font-size: 16px;
            line-height: px2-to-rem(65);
          }
        }
        .flex2 {
          display: flex;
          flex-direction: row-reverse;
          .change-third {
            color: #BBBBBB;
            font-size: 20px;
            line-height: px2-to-rem(65);
            margin-top: px2-to-rem(40);
            margin-right: 10px;
          }
        }

      }
    }
  }
  .line {
    height: 1px;
    margin: 0 auto;
    background-color: #C8CFC4;
    margin-left: 10px;
    margin-right: 10px;
  }
  .first-icon {
    color: #0099ff;
  }
  .second-icon {
    color: #B53F8C;
  }
  .third-icon {
    color: #F7AC20;
  }
  .btn1 {
    width: px2-to-rem(600);
    margin-top: px2-to-rem(100);
  }
</style>
