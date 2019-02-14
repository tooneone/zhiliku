<template>
  <div class="cart-header">
    <div class="header-left" @click="$back">
      <i class="iconfont">&#xe68c;</i>
    </div>
    <h3>购物车</h3>
    <div
      class="header-right"
      @click="changeModel"
      v-if="headerRight">
      <span>{{cartInfo.model ? '完成' : '编辑'}}</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['cartInfo', 'headerRight'],
  methods: {
    changeModel () {
      this.$emit('change-model')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .cart-header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    background: white;
    .header-left {
      position: absolute;
      top: 50%;
      left: 27px;
      transform: translateY(-50%);
      i{
        display: inline-block;
        width:60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 30px;
        /*background: RGBA(0, 0, 0, .1);*/
        color:#333;
      }
    }
    h3{
      font-size: 30px;
      color: #333;
    }
    .header-right{
      position: absolute;
      top:50%;
      right:30px;
      transform: translateY(-50%);
      span{
        color:#b60a0a;
      }
    }
  }
</style>
