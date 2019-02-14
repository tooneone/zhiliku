<template>
  <page :better-scroll="betterScroll">
    <cart-header
        slot="top"
        :headerRight="headerRight"
        :cartInfo="cartInfo"
        @change-model="changeModel"></cart-header>
    <cart-checkout
      slot="bottom"
      :cartInfo="cartInfo"
      @checkout="checkoutHandler"
      @delete-goods="deleteGoods"
      @select-all="selectAll"
      v-if="checkoutVisible"></cart-checkout>
    <cart-default v-if="defaultVisible"></cart-default>
    <cart-main
        v-if="mianVisible"
        :list="cartGroup"
         @goods-number="goodsNumber"
        @select="select"
        @select-group="selectGroup"></cart-main>
  </page>
</template>

<script type="text/ecmascript-6">
import cartHeader from './cart-header'
import cartCheckout from './cart-checkout'
import cartDefault from './cart-default'
import cartMain from './cart-main'
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  data(){
    return{
      delFlag:true,
      cartInfo:{isAll: true, price: 0, quantity: 0, select: [], model:0},
      cartGroup:[{list:[],select:true}],
    }
  },
  computed: {
    ...mapState('user', ['isLogin']),
    ...mapState('cart', ['cart']),
    ...mapGetters('cart', ["cartInfo",'cartGroup']),
    betterScroll () {
      return this.isLogin && this.cartGroup.length > 0
    },
    headerRight () {
      return this.isLogin && this.cartGroup.length > 0
    },
    defaultVisible () {
      return !this.isLogin || this.cartGroup.length === 0
    },
    mianVisible () {
      return this.isLogin
    },
    checkoutVisible () {
      return this.isLogin && this.cartGroup.length > 0
    }
  },
  created(){
    this.getCardInfo()
  },
  mounted(){
    console.log(this.cartGroup)
    console.log(this.cartInfo)
  },
  components: {
    cartHeader,
    cartCheckout,
    cartDefault,
    cartMain
  },
  methods: {
    ...mapMutations('cart', ['TOGGLE_MODEL', 'SELECT_GOODS', 'SELECT_GROUP', 'SELECT_ALL']),
    ...mapActions('cart', ['updateUserCartGoods', 'deleteUserCartGoods', 'checkout']),
    changeModel () {
      this.cartInfo.model===1?this.cartInfo.model=0:this.cartInfo.model=1

    },
    getCardInfo(){
      this.request(this.api.CartList).then(res => {
        if (res.errno === 0) {
          this.cartGroup[0].list = res.data.cartList
          this.cartInfo.price = res.data.cartTotal.goodsAmount
          this.cartInfo.quantity = res.data.cartTotal.goodsCount
        }
      })
    },
    checkoutHandler (a) {
      if (this.cartInfo.quantity>0) {
        this.$go('/checkout?type=cart')
      }else {
        this.$toast('商品数量不能少于一件', 'warn')
      }
    },
    deleteGoods () {
      var o = this.cartGroup[0].list
      var productIds = []
      for(let i =0 ;i<o.length;i++){
        if(o[i].checked===1){
          productIds.push(o[i].product_id)
        }
      }
      if(this.delFlag){
        this.delFlag = false;
        this.request(this.api.CartDelete,{productIds:productIds.toString()}).then(res => {
          if (res.errno === 0) {
            this.$toast('删除成功')
            this.delFlag = true
            this.getCardInfo()
          }
        })
      }

      // this.deleteUserCartGoods(o)
    },
    goodsNumber (o) {
      // console.log(o)
      if (o.type === 'sub') {
        if( o.number > 1){
          this.request(this.api.CartMinus,{ goodsId:o.goods.goods_id, productId:o.goods.product_id,number:1}).then(res => {
            if (res.errno === 0) {
              this.getCardInfo()
            }
          })
        }else {
          this.$toast('商品数量不能小于一件', 'warn')
        }
        return
      }
      if (o.type === 'add') {
        if(o.number < o.goods.product_id){
          this.request(this.api.CartAdd,{ goodsId: o.goods.goods_id, productId:o.goods.product_id,number:1}).then(res => {
            if (res.errno === 0) {
              this.getCardInfo()
            }
          })
        }else {
          this.$toast('商品数量不能大于库存', 'warn')
        }

        return
      }
      // this.updateUserCartGoods(o)
    },
    select (o) {
      console.log(o)
        o.checked===1? o.checked=0:o.checked=1
        this.cartInfo.isAll = true
      var list = this.cartGroup[0].list
      this.cartInfo.price=0

      this.request(this.api.CartChecked,{productIds:o.product_id,isChecked:o.checked}).then(res => {
        if (res.errno === 0) {

        }
      })
      for(let i=0;i<list.length;i++){
        if(list[i].checked===1){
          this.cartInfo.price += list[i].retail_price*list[i].number
          // console.log(this.cartInfo.price)
        }
      }
    },
    selectGroup (o) {
      // console.log(o)
      for(let i=0;i<o.list.length;i++){
        o.select? o.list[i].checked =0:o.list[i].checked=1
      }
      this.cartInfo.isAll = !o.select
      o.select = !o.select

      // this.SELECT_GROUP(o)
    },
    selectAll () {
      var o =this.cartGroup[0]
      this.cartInfo.isAll = !this.cartInfo.isAll
      if(this.cartInfo.isAll){
        for(let i=0;i<o.list.length;i++){
           o.list[i].checked =1
          this.cartInfo.price += o.list[i].retail_price*o.list[i].number
        }
        o.select = true

      }else {
        for(let i=0;i<o.list.length;i++){
            o.list[i].checked = 0
        }
        o.select = false
        this.cartInfo.price = 0
      }
      // this.SELECT_ALL()
    }
  }
}
</script>
