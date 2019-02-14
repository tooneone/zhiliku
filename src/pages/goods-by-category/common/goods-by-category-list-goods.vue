<template>
  <div class="goods-by-category-list-goods" @click="$go('/goods/'+info.id+'')">
    <div class="goods-pic">
      <img :src="info.list_pic_url" alt="">
    </div>
    <div class="goods-desc">
      <p>{{info.name}}</p>
      <div class="goods-price">
        <span class="cube-left">￥{{info.retail_price}}</span>
        <cube-button class="cube-right">立即购买</cube-button>
      </div>
    </div>
    <!--<div class="goods-name">-->
      <!--<h4>{{info.name}}</h4>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['info']
}
</script>

<style lang="less" scoped>
  cube-right {
    float: left;
  }
  .goods-by-category-list-goods{
    display: flex;
    flex-wrap: wrap;
    .goods-pic {
     flex-basis: 20%;
      /*height: 172px;*/
      img {
        width: 100%;
      }
    }
    .goods-desc{
      flex-basis: 80%;
      p{
        padding:14px 0;
        /*font-size: 28px;*/
        font-size: 100%;
        /*color:#845f3f;*/
      }
      .goods-price {
        line-height: 35px;
        .cube-left {
          float: left;
          color: #b60a0a;
          font-size: 100%;
          padding: 5px 0;
        }
        .cube-right {
          float: right;
          color: white;
          background-color:#b60a0a;
          height: auto;
          width: auto;
         display: inline-block;
          padding: 8px 20px;
          font-size: 100%;
          border-radius: 35px;
        }
      }
    }
  }
</style>
