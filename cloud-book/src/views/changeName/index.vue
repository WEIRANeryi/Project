<template>
  <div class="container">
    <div class="top">
      <Button icon="back" size="small" type="primary" class="btn1" @click="handleJump1">返回</Button>
      <h2>修改昵称</h2>
    </div>
    <div class="content">
      <Field placeholder="请输入用户名" v-model="changeData.userName"></Field>
      <div class="line"></div>
      <span>好的昵称可以让你的朋友更容易记住你</span>
      <Button type="primary" class="btn2" @click="changeName">保存</Button>
    </div>
  </div>
</template>

<script>
  import {Button,Field,Toast} from 'mint-ui'
  export default {
    name: "index",
    data () {
      return {
        changeData: {
          userName: ''
        },
      }
    },
    components: {
      Button,
      Field,
      Toast,
    },
    methods: {
      handleJump1 () {
        this.$router.push({
          name: 'change'
        })
      },
      changeName () {
        this.$axios.put(this.$api.changeUser,{
          username: this.changeData.userName
        }).then(res => {
          if (res.code ==200){
            Toast({
              message: '修改昵称成功',
              duration: '1000'
            })
            this.$store.dispatch('getUserData')
            this.handleJump1()
          }
        })
      }
    },
    created() {
      if (localStorage.getItem("token")) {
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
    /*text-align: center;*/
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
      width: 94%;
      margin: 0 auto;
      span {
        display: inline-block;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
  .line {
    height: 1px;
    background-color: #333;
    margin: 0;
  }
  .btn2 {
    margin: 0 auto;
    margin-top: 20px;
    width: 100%;
  }
</style>
