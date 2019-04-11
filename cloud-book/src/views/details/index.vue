<template>
  <div class="container">
    <div class="book">
      <div class="book-left">
        <img :src="bookData.img" alt="bookData.img" class="img">
      </div>
      <div class="book-right">
        <h2 class="title">
          {{bookData.title}}
        </h2>
        <div class="book-msg">
          <div class="author">{{bookData.author}}</div>
          <div class="looknums">{{bookData.looknums}}人在看</div>
          <div class="like">{{bookData.startsnums}}人喜欢</div>
        </div>
      </div>
    </div>

    <div class="btns">
      <Button size="small" @click="handleCollection">加入收藏</Button>
      <Button size="small">分享好友</Button>
    </div>


    <div class="line"></div>

    <div class="book-title">
      {{bookData.title}}
    </div>
    <div class="book-desc">
      {{bookData.desc}}
    </div>

    <div class="show-titles">
      <h2 class="title">
        查看目录
        <span>共{{totalTitle}}章</span>
      </h2>

      <div class="date">
        {{bookData.updateTime}}
      </div>
    </div>

    <div class="line"></div>

    <div class="read-btn">
      <router-link :to="{name: 'titles', params : {id : this.bookData._id}}">
        <Button type="primary" size="large">阅读该书籍</Button>
      </router-link>

    </div>
  </div>
</template>

<script>
import {Button,Toast} from 'mint-ui'
import moment from 'moment'

export default {
  name: "detail",
  components: {
    Button,
    Toast
  },
  data () {
    return {
      bookData: {},
      totalTitle: 0
    }
  },
  methods: {
    getBookData () {
      let id = this.$route.params.id;
      this.$axios.get(this.$api.getBook + '/' + id).then(res => {
        let resData = res.data;
        resData.updateTime = moment(resData.updateTime).format('YYYY年M月D日');
        this.bookData = resData;
        this.totalTitle = res.length;
      })
    },
    handleCollection () {
      let bookId = this.bookData._id;
      this.$axios.post(this.$api.addCollection,{
        bookId: bookId
      }).then(res => {
        if (res.code == 200 ){
          Toast({
            message: '添加收藏成功',
            duration: 1000
          })
        }
        else {
          Toast({
            message: res.msg,
            duration: 1000
          })
        }
      })
    }
  },
  created() {
    this.getBookData();
  }
}
</script>

<style scoped lang="scss">
  @import '../../globalCss/px2-rem';

  .container {
    padding-bottom: 51px;
  }

  .book {
    display: flex;
    justify-content: space-between;

    .book-left {
      width: px2-to-rem(200);
      height: px2-to-rem(266);
      box-shadow: 0 0 2px 2px rgba(0,0,0, .5);
    }

    .book-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      margin-left: 10px;

      .title {
        font-size: 16px;
        font-weight: 700;
      }

      .book-msg {
        flex: 1;
        padding-top: 26px;
        margin-left: 6px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #555;
        font-size: 12px;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    /deep/ .mint-button-text {
      font-size: 12px;
      color: #555;
    }

    .mint-button {
      width: 100px;
      height: 26px;
    }
  }

  .line {
    height: 6px;
    background: #e0e0e0;
    margin-top: 20px;
  }

  .book-title {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    margin-top: 20px;
  }
  .book-desc {
    margin-top: 16px;
    font-size: 12px;
    line-height: 2;
    color: #333;
  }

  .show-titles {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #333;

      span {
        font-size: 12px;
        margin-left: 20px;
      }
    }

    .date {
      font-size: 12px;
      color: #555;
    }
  }

  .read-btn {
    position: fixed;
    bottom: 10px;
    left: 0;
    right: 0;
    padding: 0 px2-to-rem(18);

    /deep/ .mint-button-text {
      font-size: 12px;
    }

    /deep/ .mint-button {
      height: 28px;
    }
  }
</style>
