<template>
  <div class="checkout-pay-way">
    <div class="pay-way-item">
      <div class="item-left">
        <i class="iconfont"  style="color: #00c800;">&#xe61c;</i>
        <span>微信支付</span>
        <label>推荐</label>
      </div>
      <div class="item-right" @click="WeChatPay">
        <i v-if="!payWay" class="iconfont" style="color:#cd363d;">&#xe65f;</i>
        <i v-if="payWay" class="iconfont">&#xe660;</i>
      </div>
    </div>
    <div class="pay-way-item border-1px-top">
      <div class="item-left">
        <i class="iconfont"  style="color: #00aaef;">&#xe601;</i>
        <span>支付宝支付</span>
      </div>
      <div class="item-right"  @click="alipay">
        <i v-if="payWay" class="iconfont" style="color:#cd363d;">&#xe65f;</i>
        <i v-if="!payWay" class="iconfont">&#xe660;</i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        payWay:true
      }
    },
    methods: {
      alipay () {
        this.payWay = true
        this.$emit('alipay',this.payWay)
      },
      WeChatPay () {
        this.payWay = false
        this.$emit('WeChatPay',this.payWay)
      }
    }
  }
</script>
<style lang="less" scoped>
  .checkout-pay-way{
    padding:0 28px;
    margin-bottom: 10px;
    background: white;
    .pay-way-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      padding-left:10px;
      .item-left{
        display: flex;
        align-items: center;
        i{
          font-size: 50px;
        }
        span{
          display: inline-block;
          padding:0 20px;
          font-size: 28px;
          font-weight: 600;
          color:#333;
        }
        label{
          display: inline-block;
          height: 33px;
          line-height: 33px;
          padding:0 10px;
          border-radius: 5px;
          font-size: 28px;
          background: #cd363d;
          color:white;
        }
      }
    }
  }
</style>
