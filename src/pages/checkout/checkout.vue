<template>
  <page :better-scroll="true">
    <account-warm slot="extra-top" @close="close" :isShow="isShow"></account-warm>
    <template slot="bottom">
      <checkout-address-tip :address="checkoutInfo.address"></checkout-address-tip>
      <checkout-pay @pay="orderSubmit" :orderTotalPrice="orderTotalPrice"></checkout-pay>
    </template>
    <checkout-address
        :address="checkoutInfo.address"
        @click.native="resetAddress"></checkout-address>
    <checkout-pay-way @alipay="alipay" @WeChatPay="WeChatPay"></checkout-pay-way>
    <checkout-goods-details :checkedGoodsList="checkedGoodsList"></checkout-goods-details>
    <!--<a :href="href">{{href}}ddd</a>-->
  </page>
</template>

<script type="text/ecmascript-6">
import {mapActions} from 'vuex'
import accountWarm from '../common/account-warm'
import checkoutPay from './checkout-pay'
import checkoutAddressTip from './checkout-address-tip'
import checkoutAddress from './checkout-address'
import checkoutPayWay from './checkout-pay-way'
import checkoutGoodsDetails from './checkout-goods-details'
export default{
  data () {
    return {
      href:'',
      type:'',
      isShow:true,
      checkoutId: this.$route.params.id,
      orderTotalPrice:'',
      outTradeNo:"20181212165014771",
      payWay:true,
      checkedGoodsList:[],
      checkoutInfo: {
        address: {}
      }
    }
  },
  components: {
    accountWarm,
    checkoutPay,
    checkoutAddressTip,
    checkoutAddress,
    checkoutPayWay,
    checkoutGoodsDetails
  },
  created () {
    var type = this.$route.query.type;

    if(type==='cart'){
      this.CartCheckout('cart')
      this.type='cart'
    }
    if(this.$route.query.order_sn){
      this.Orderetail()
      this.getAddressDefaults()
      this.getgoods()
    }
    if(this.$route.query.productId){
        this.type='buy'
        this.buy()
    }

  },
  methods: {
    // ...mapActions('cart', ['getCheckoutInfo', 'pay']),
    close(o){
      console.log(o)
      this.isShow = false
    },
    resetAddress(){
      if(this.$route.query.type==='cart'){
        this.$go('/checkout/address?type=cart')
      }
      if(this.$route.query.order_sn){
       this.$go('/checkout/address?order_sn='+this.$route.query.order_sn)
      }
      if(this.$route.query.productId){
        this.$go('/checkout/address?goodsId='+this.$route.query.goodsId+'&productId='+this.$route.query.productId+'&number='+this.$route.query.number)
      }

    },
    alipay(o){
      console.log(o)
      this.payWay = o
    },
    WeChatPay(o){
      console.log(o)
      this.payWay = o
    },
    Orderetail(){
      this.request(this.api.Orderetail,{id:this.$route.query.order_sn}).then(res => {
        if (res.errno === 0) {
          // this.checkoutInfo.address = res.data.orderInfo
          // this.checkedGoodsList = res.data.orderInfo
          // this.orderTotalPrice = res.data.orderGoods[0].order_price
          // this.outTradeNo=this.$route.query.order_sn
        }
      })
    },
    getgoods(){
      this.request(this.api.getgoods,{id:this.$route.query.order_sn}).then(res => {
        if (res.errno === 0) {
          // this.checkoutInfo.address = res.data.checkedAddress
          this.checkedGoodsList = res.data.orderGoods
          // this.orderTotalPrice = res.data.orderTotalPrice
          this.orderTotalPrice = res.data.orderGoods[0].order_price
          this.outTradeNo=this.$route.query.order_sn
        }
      })
    },
    getAddressDefaults(){
      this.request(this.api.getAddressDefault).then(res => {
        // if (res.errno === 0) {
          this.checkoutInfo.address = res

        // }
      })
    },
    buy(){
      this.request(this.api.buy,{goodsId:this.$route.query.goodsId,productId:this.$route.query.productId,number:this.$route.query.number}).then(res => {
        if (res.errno === 0) {
          // this.checkoutInfo.address = res.data.checkedAddress
          this.checkedGoodsList = res.data.checkedGoodsList
          this.orderTotalPrice = res.data.orderTotalPrice
          this.CartCheckout('buy')
        }
      })
    },
    CartCheckout(type){
      this.request(this.api.CartCheckout,{type:type}).then(res => {
        if (res.errno === 0) {
          // this.checkoutInfo.address = res.data.checkedAddress
          this.checkedGoodsList = res.data.checkedGoodsList
          this.orderTotalPrice = res.data.orderTotalPrice
          this.getAddressDefaults()

        }
      })
    },
    orderSubmit(){
      this.request(this.api.OrderSubmit,{type:this.type,addressId:this.checkoutInfo.address.id,couponId:'0'}).then(res => {
        if (res.errno === 0) {
          this.outTradeNo =res.data.orderInfo.order_sn
          this.payHandler ()
        }
      })
    },
    payHandler () {
      if(this.payWay){
        /*支付宝*/
        this.request(this.api.alipay,{
            "outTradeNo":this.outTradeNo,
            "payType":'ali',
            "subject":"智慧社区商城订单"
            // "subject":"qweqwe"
          }
        ).then(res => {
            // document.write(res)
          console.log(res)
          // $go(res.data)
        })
      }else {
        //微信
        this.request(this.api.wxPay,{
            "outTradeNo":"2018121300001885",
            "totalFee":"1",
            "payType":'wx',
          "frontUrl":'http://www.xhuachina.com/platform/statics/dist/#/order?from=0',
            "body":"这是订单明细的介绍",
            // "spbillCreateIp":"192.168.1.128",
            "subject":"智慧社区商城订单"
          }
        ).then(res => {
          this.$toast('成功')
          // this.href = res
          window.android.getInfoFromWeb(res)
        })
      }
    },
    showDialog (fn) {
      this.$createDialog({
        type: 'confirm',
        content: '便宜不等人，请三思而行~',
        confirmBtn: {
          text: '继续支付',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          // @TODO
        },
        onCancel: () => {
          fn()
        }
      }).show()
    },
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/cart') {
      this.showDialog(() => {
        next()
      })
    } else {
      next()
    }
  }
}
</script>
