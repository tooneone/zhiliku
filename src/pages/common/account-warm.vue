<template>
  <div class="account-warm" v-if="this.isShow">
    <div class="warm-text">
      <p>公告：任何索要账户、密码或要求转账等均是诈骗行为。提高安全意识，谨防诈骗！</p>
    </div>
    <div class="warm-close" @click="close">
      <i class="iconfont">&#xe642;</i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'account-warm',
    data () {
      return {

      }
    },
    props:['isShow'],
    methods: {
      close () {
        this.$emit('close',this.isShow)
      },
    }
  }
</script>
<style lang="less" scoped>
  .account-warm{
    display: flex;
    height: 90px;
    padding:0 28px;
    background: #f67f79;
    color:white;
    .warm-text{
      display: flex;
      align-items: center;
    }
    .warm-close{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-basis: 70px;
    }
  }
</style>
