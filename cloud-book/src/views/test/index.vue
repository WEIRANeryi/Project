<template>
  <div>
    <sw-upload>
      <div>上传文件</div>
    </sw-upload>
  </div>
</template>

<script>
  import swupload from '@/components/sw-upload'
  export default {
    name: "test",
    components: {
      'sw-upload' : swupload
    }
  }
</script>

<style scoped>

</style>
