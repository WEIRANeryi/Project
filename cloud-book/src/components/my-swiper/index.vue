<template>
  <div>
    <swiper :options="swiperOption" autoplay="autoplay"  speed="speed" ref="mySwiper" >
      <!-- slides -->
      <swiper-slide v-for="(item,index) in swiperdata" :key="index">
        <router-link :to="{name: 'details', params : {id:item.book._id}}" class="swiper-img-wrap">
          <img :src="item.img" :alt="item.img" class="swiper-img">
          <div class="swiper-title">{{item.title}}</div>
        </router-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  export default {
    name: "index",
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
          },
          autoplay:true,
          speed: 1000
        },
        swiperdata: [],

      }
    },
    methods: {
      getSwiper () {
        this.$axios.get(this.$api.getSwiper).then(res => {
          this.swiperdata = res.data;
        })
      }
    },
    created() {
      this.getSwiper()
    }
  }
</script>

<style lang="scss">
  @import "../../globalCss/px2-rem";
  .swiper-img-wrap{
    display: block;
    position: relative;
    color: rgba(255,255,255,.9);
    .swiper-img {
      height: px2-to-rem(400);
    }
    .swiper-title{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      background-color: rgba(0,0,0,.5);
      padding: 4px;
    }
  }

</style>
