<template>
  <div data-tag="recommend" class="home-banner">
    <cube-slide :data="list">
      <cube-slide-item v-for="(item, index) in list" :key="index">
        <div style="height: 135px">
          <img :src="item.image_url" alt="">
        </div>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      getBanner() {
        this.request(this.api.IndexUrlBanner).then(res => {
          if (res.errno === 0) {
            this.list = res.data.banner
          }
        })
      }
    },
    created() {
      this.getBanner()
    }
  }
</script>

<style lang="less" scoped>
  .home-banner {
    margin-bottom: 20px;
    background: white;
  }
</style>
