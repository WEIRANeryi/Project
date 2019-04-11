<template>
  <div class="container">
    <section class="wmassageMask" v-show="writeMessageShow" @click="writeMessageFun()">
      <div class="lists">
        <ul class="titles">
          <li class="title-item" v-for="(item, index) in titles" :key="index">
            <router-link :to="{name: 'article', params: {id: item._id}}">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
    <div class="title">
      <h2>{{titleData}}</h2>
    </div>
    <div class="line"></div>
    <div class="content markdown" :style="{fontSize: fz + 'px'}">
    </div>
    <Tabbar v-model="selected" :fixed="true">
      <TabItem id="before">
        <i class="iconfont icon-shangyiyeqianyiye" @click="handleJumpbf"></i>
      </TabItem>
      <TabItem id="fenlei">
        <i class="iconfont icon-fenlei" @click="writeMessageFun"></i>
      </TabItem>
      <TabItem id="add" >
        <i class="iconfont icon-font-increase1" @click="handleAdd"></i>
      </TabItem>
      <TabItem id="Reduce">
        <i class="iconfont icon-font-subtract1" @click="handleReduce"></i>
      </TabItem>
      <TabItem id="after">
        <i class="iconfont icon-youbian" @click="handleJumpnx"></i>
      </TabItem>
    </Tabbar>
  </div>
</template>

<script>
import {Tabbar,TabItem} from 'mint-ui'
import Showdown from 'showdown'

export default {
  name: "myarticle",
  components: {
    Tabbar,
    TabItem,
  },
  data () {
    return {
      articleData: [],
      titleData: "",
      selected: 'index',
      fz: 12,
      bookId: "",//书籍id
      titlesId: "",//文章id
      titles: [],
      writeMessageShow: false,
      jumptitlesId: '',
      jumpindex: ''
    }
  },
  watch: {
    $route (to) {
      this.$axios.get(this.$api.getArticle + '/' + to.params.id).then(res => {
        let coverter = new Showdown.Converter()
        this.titlesId = res.data.article.titleId;
        this.articleData = coverter.makeHtml(res.data.article.content);
        this.titleData = res.data.title;
        document.querySelector(".content").innerHTML = this.articleData;
      })
    }
  },
  methods: {
    getArticleData () {
      let id = this.$route.params.id;
      this.$axios(this.$api.getArticle + '/' + id).then(res => {
        let coverter = new Showdown.Converter();
        this.bookId = res.data.article.bookId;
        this.titlesId = res.data.article.titleId;
        this.articleData = coverter.makeHtml(res.data.article.content);
        this.titleData = res.data.title;
        document.querySelector(".content").innerHTML = this.articleData;
        this.$axios(this.$api.getTitle + '/' + this.bookId).then(res => {
          this.titles = res.data;
        })
      })
    },
    writeMessageFun () {
      this.writeMessageShow = !this.writeMessageShow;
    },
    handleAdd () {
      if (this.fz <= 40){
        this.fz += 2;
      }
    },
    handleReduce () {
      if (this.fz >= 12)
      this.fz -= 2;
    },
    handleJump () {
      this.$router.push({
        name: 'article',
        params: {
          id: this.jumptitlesId
        }
      })
    },
    handleJumpbf () {
      this.titles.map((item,index) => {
        if (item._id == this.titlesId) {
          this.jumpindex = index;
        }
      })
      if (this.jumpindex == 0) {
        return
      }
      this.jumptitlesId = this.titles[this.jumpindex-1]._id;
      this.handleJump();
    },
    handleJumpnx () {
      this.titles.map((item,index) => {
        if (item._id == this.titlesId) {
          this.jumpindex = index;
        }
      })
      if (this.jumpindex == this.titles.length) {
        return
      }
      this.jumptitlesId = this.titles[this.jumpindex+1]._id;
      this.handleJump();
    }
  },
  created() {
    this.getArticleData();
  }
}
</script>

<style scoped>
  .container {
    padding: 10px 5px 0 10px;
    position: relative;
  }
  .lists{
    width: 80%;
    position: absolute;
    background-color: #ffffff;
    min-height: 100%;
  }
  .iconfont {
    font-size: 26px;
  }
  .title {
    padding-top: 10px;
  }
  .content {
    font-size: 24px;
    padding-bottom: 40px;
  }
  .titles {
    padding: 0;
  }
  .title-item {
    line-height: 30px;
    height: 30px;
    padding-left: 5px;
    border-bottom: 1px solid #e0e0e0;
  }
  a {
    color: #333;
  }
  .wmassageMask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0,0,0,.3);
    z-index: 101;
  }
</style>
<style lang="scss">
  @import './markdown.scss';
</style>
