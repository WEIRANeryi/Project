<template>
  <div class="container">
    <div class="content">
      <div class="books" v-for="item in readList">
        <div class="books-left">
          <img :src="item.book.img" alt="">
        </div>
        <div class="books-right">
          <p class="title">{{item.book.title}}</p>
          <p class="schedule">已经看到{{item.title.index}}/{{item.title.total}}章节</p>
          <div class="middle">
            <div class="progress-bar">
              <div class="line" :style="{width: item.title.index *100 / item.title.total + '%'}"></div>
            </div>
            <p class="progress">已看{{parseInt(item.title.index *100 / item.title.total)}}%</p>
          </div>
          <div>
            <p class="last-view">上次查看 :{{item.title.title}}</p>
          </div>
          <div class="buttons">
            <Button class="btn btn1">继续阅读</Button>
            <Button class="btn2 btn">查看文档</Button>
          </div>
        </div>
      </div>
    </div>
    <myTabBar page="learn"></myTabBar>
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
  created () {
    if (localStorage.getItem("token")) {
      this.$store.dispatch('getReadList')
    }
  },
  computed: {
    readList () {
      return this.$store.state.readList;
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../../globalCss/px2-rem";
  .container {
    padding: 0;
    margin: 0;
    .content {
      padding-bottom: 60px;
      .books {
        display: flex;
        margin-top: 20px;
        margin-left: 10px;
        .books-left {
          img {
            width: px2-to-rem(250);
            height: px2-to-rem(320);
          }
        }
        .books-right {
          margin-left: 10px;
          color: #666666;
          width: 100%;
          .title {
            color: #000000;
          }
          .schedule {
            padding-top: 10px;
          }
          .middle {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            .progress-bar {
              display: flex;
              background-color: #C6CCC6;
              height: 5px;
              margin-top: 5px;
              position: relative;
              width: px2-to-rem(300);
              .line {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                margin: 0;
                background-color: #028002;
                height: 100%;
              }
            }
            .progress {
              font-size: 12px;
            }
          }
          .last-view {
            padding-top: 10px;
            font-size: 12px;
          }
          .buttons {
            padding-top: 20px;
            .btn {
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
  p {
    margin: 0;
    padding: 0;
  }
</style>
