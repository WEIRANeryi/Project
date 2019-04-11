<template>
  <div class="container">
    <ul class="titles">
      <li class="title-item" v-for="(item, index) in titles" :key="index">
        <router-link :to="{name: 'article', params: {id: item._id}}">
          {{item.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "titles",
  data () {
    return {
      titles: []
    }
  },
  methods: {
    getTitle () {
      let id = this.$route.params.id;
      this.$axios(this.$api.getTitle + '/' + id).then(res => {
        this.titles = res.data
      })
    }
  },
  created() {
    this.getTitle();
  }
}
</script>

<style lang="scss" scoped>
  .title-item {
    line-height: 40px;
    height: 40px;
    padding-left: 10px;
    border-bottom: 1px solid #e0e0e0;
    a {
      color: #333;
    }
  }
</style>
