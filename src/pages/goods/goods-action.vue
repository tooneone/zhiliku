<template>
  <div class="goods-action border-1px-top">
    <div class="action-left">
      <div class="left-item">
        <!--<i class="iconfont">&#xe654;</i>-->
        <!--<span>客服</span>-->
      </div>
      <div class="left-item" :class="{active:isActive}" @click="collect()">
        <i class="iconfont" >&#xe611;</i>
        <!--<span class="e">{{goodsCount}}</span>-->
        <span>收藏</span>
      </div>
      <div class="left-item" @click.prevent="$go('/cart')">
        <i class="iconfont">&#xe602;</i>
        <span class="e">{{goodsCount}}</span>
        <span>购物车</span>
      </div>
    </div>
    <div class="action-right">
      <div class="right-item right-item-buy" @click="buy">
        <span>立即购买</span>
      </div>
      <!--<div class="right-item right-item-cart"   @click="$go('/cart')">-->
      <div class="right-item right-item-cart"   @click="addCard">
        <span>加入购物车</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import navHeader from '../common/nav-header'
  export default {
    name:'goods-action',
    data () {
      return {
        currentSid: this.sid,
      }
    },
    props: ['subCategory', 'sid','goodsCount','isActive'],
    components: {
      navHeader
    },
    methods: {
      collect(){
        this.$emit('collect',this.isActive)
      },
      addCard () {
        this.$emit('addCard')
      },
      buy () {
        this.$emit('buy')
      }
    }
  }
</script>
<style lang="less" scoped>
  .goods-action{
    display: flex;
    height: 115px;
    padding:0 28px;
    background: white;
    .action-left{
      display: flex;
      justify-content: space-around;
      flex:1;
      .left-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color:#666;
        position: relative;
        &.active {
          /*background: #b60a0a;*/
          color: #b60a0a;
        }
        .e{
          position: absolute;
          top: 6px;
          left: 42px;
          display: inline-block;
          width: auto;
          height: 20px;
          padding: 5px 10px;
          border-radius: 25px;
          background: #b60a0a;
          color: white;
        }
      }
    }
    .action-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      .right-item{
        display: inline-block;
        width:222px;
        height: 68px;
        text-align: center;
        line-height: 68px;
        border-radius: 34px;
        color:white;
        &-buy{
          background: #b60a0a;
        }
        &-cart{
          background: #aa8a59;
        }
        &:nth-child(2){
          margin-left: 10px;
        }
      }
    }
  }
</style>
