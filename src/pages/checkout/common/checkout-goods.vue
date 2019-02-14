<template>
  <div class="checkout-goods">
    <div class="goods-pic">
      <img class="ignore" :src="checkedGoodsList.list_pic_url" alt="">
    </div>
    <div class="goods-info">
      <div class="info-name">
        <h3>{{checkedGoodsList.goods_name}}</h3>
      </div>
    </div>
    <div class="goods-price-num">
      <span class="single-price">￥{{checkedGoodsList.retail_price}}</span>
      <span class="num">x{{checkedGoodsList.number}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:['checkedGoodsList']
  }
</script>
<style lang="less" scoped>
  .checkout-goods{
    display: flex;
    .goods-pic{
      flex-basis: 166px;
      height: 166px;
      .ignore{
        width:100%;
        height:100%;
      }
    }
    .goods-info{
      flex:1;
      .info-name{
        padding-top:20px;
        h3{
          font-weight: 600;
          color:#333;
        }
      }
    }
    .goods-price-num{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-basis: 70px;
      .single-price{
        padding-top:20px;
        color:#666;
      }
      .num{
        padding-top:20px;
        color:#666;
      }
    }
  }
</style>
