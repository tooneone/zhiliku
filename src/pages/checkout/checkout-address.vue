<template>
  <div>
    <div class="checkout-address">
      <div class="address-left">
        <div class="left-top">
          <h4>{{address.userName}}</h4>
          <span>{{address.telNumber}}</span>
        </div>
        <div class="left-bottom">
          <p>中国 {{address.full_region}} {{address.detailInfo}} <span v-if="address.postalCode">（{{address.postalCode}}）</span></p>
        </div>
      </div>
      <div class="address-right">
        <i class="iconfont">&#xe632;</i>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  props: ['address']
}
</script>

<style lang="less" scoped>
  .checkout-address{
    display: flex;
    height: 124px;
    padding:0 28px;
    margin-bottom: 10px;
    background: white;
    .address-left{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex:1;
      .left-top{
        display: flex;
        justify-content: space-between;
        font-size: 28px;
        font-weight: 600;
        color:#333;
      }
      .left-bottom{
        padding-top:20px;
        font-size: 28px;
        color:#666;
      }
    }
    .address-right{
      display: flex;
      align-items: center;
      flex-grow: 0;
      padding-left:20px;
    }
  }
</style>
