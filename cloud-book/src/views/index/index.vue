<template>
<div>
  <div class="container">
    <Loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" class="loadmore" ref="loadmore">
      <MySwiper class="swiper"></MySwiper>
      <div class="content">
        <ContentItem v-for="(item,index) in contentData" :options="item" :key="index"></ContentItem>
      </div>
    </Loadmore>
  </div>
</div>
</template>

<script>
  import MySwiper from '@/components/my-swiper'
  import { Loadmore } from 'mint-ui'
  import ContentItem from './components/contentitem'
  import moment from "moment"

  export default {
    name: "index",
    components: {
      MySwiper,
      ContentItem,
      Loadmore
    },
    data () {
      return {
        contentData: [],
        queryData: {
          pn:1,
          booksSize: 2,
          size: 2
        },
        allLoaded: false
      }
    },
    methods: {
      getContent () {
        return new Promise((resolve) => {
          this.$axios.get(this.$api.getContent,{
            params: this.queryData
          }).then(res => {
            let resData = res.data;
            if (resData.length < 1) {
              this.allLoaded = true;
            }
            resData = resData.map(item => {
              item.books = item.books.map(it => {
                it.updateTime = moment(it.updateTime).format('YYYY年M月D日')
                return it;
              })
              return item;
            })
            this.contentData = resData
            resolve();
          })
        })
      },
      updateData () {
        return new Promise(resolve => {
          this.$axios.get(this.$api.getContent,{
            params: this.queryData
          }).then(res => {
            let resData = res.data;
            if (resData.length < 1) {
              this.allLoaded = true;
            }
            resData = resData.map(item => {
              item.books = item.books.map(it => {
                it.updateTime = moment(it.updateTime).format('YYYY年M月D日')
                return it;
              })
              return item;
            })
            this.contentData = [...this.contentData,...resData]
            resolve();
          })
        })
      },
      loadTop () {
        this.queryData = {
          pn:1,
          booksSize: 2,
          size: 2
        };
        this.allLoaded = false;
        this.getContent().then(() => {
          this.$refs.loadmore.onTopLoaded();
        })
        this.loadBottom();
      },
      loadBottom () {
        this.queryData = {
          pn: this.queryData.pn + 1,
          booksSize: 2,
          size: 2
        };
        this.updateData().then(() => {
          this.$refs.loadmore.onBottomLoaded();
        })
      }
    },
    created() {
      this.getContent()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../globalCss/px2-rem";
  .container {
    padding: px2-to-rem(18);
    padding-bottom: 60px;
    .loadmore {
      .swiper {
        height: px2-to-rem(400);
      }
    }
  }
</style>
