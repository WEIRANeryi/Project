<template>
  <div>
    <Tabbar v-model="selected" :fixed="true">
    <TabItem id="index">
      <i class="iconfont icon-shouye" slot="icon" @click="handleJump1"></i>
      首页
    </TabItem>
      <TabItem id="learn">
        <i class="iconfont icon-xuexi-" slot="icon" @click="handleJump2"></i>
        我的学习
      </TabItem>
      <TabItem id="person">
        <i class="iconfont icon-gerenzhongxin" slot="icon" @click="handleJump3"></i>
        个人中心
      </TabItem>
    </Tabbar>
  </div>
</template>

<script>
  import {Tabbar,TabItem} from 'mint-ui'

  export default {
    name: "tab-bar",
    props: {
      page: String
    },
    components: {
      Tabbar,
      TabItem
    },
    methods: {
      handleJump1 () {
        this.$router.push({
          name: 'layout'
        })
      },
      handleJump2 () {
        this.$router.push({
          name: 'study'
        })
      },
      handleJump3 () {
        this.$router.push({
          name: 'personal',
          // params: {
          //   id: this.jumptitlesId
          // }
        })
      }
    },
    data () {
      return {
        selected: this.page
      }
    }
  }
</script>

<style scoped>
.iconfont {
  font-size: 26px;
}
</style>
