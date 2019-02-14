<template>
  <page
      ref="scroll"
      :better-scroll="true"
      :header-immerse="true"
      @scroll="scroll">
    <goods-header
        slot="top"
        :scroll-y="scrollY"
        @clickTab="clickTab"></goods-header>
    <goods-swipper :swipperList="swipperList"></goods-swipper>
    <goods-info :data="data"></goods-info>
    <goods-number
      @change="goodsNumberChange"></goods-number>
    <goods-spec :data="data"></goods-spec>
    <!--<goods-instructions :data="data"></goods-instructions>-->
    <!--<goods-evaluate></goods-evaluate>-->
    <goods-shop @stores="stores" :shopInfo="shopInfo"></goods-shop>
    <goods-details :data="data" :detailsSet="detailsSet"></goods-details>
    <goods-action slot="bottom" :isActive="isActive" @addCard="addCard" @collect="collect" @buy="buy" :goods-count="goodsCount"></goods-action>
    <!--<goods-NumberPanel :data="data" :id="id"></goods-NumberPanel>-->
    <goods-spec-guige :id="id" @getQueryProduct="getQueryProduct" v-show="false"></goods-spec-guige>
  </page>
</template>

<script type="text/ecmascript-6">
import goodsHeader from './goods-header'
import goodsSwipper from './goods-swipper'
import goodsInfo from './goods-info'
import goodsNumber from './goods-number'
import goodsSpec from './goods-spec'
import goodsInstructions from './goods-instructions'
import goodsEvaluate from './goods-evaluate'
import goodsShop from './goods-shop'
import goodsDetails from './goods-details'
import goodsAction from './goods-action'
import goodsNumberPanel from './goods-number-panel'
import goodsSpecGuige from './common/goods-spec-guige'
export default {
  data () {
    return {
      id:this.$route.params.id,
      shopInfo:{},
      productId:'',
      isActive:false,
      data: '',
      flag:true,
      goodsCount:0,
      number:1,
      swipperList: [
        // {
        //   image: 'https://shop.io.mi-img.com/app/shop/img?id=shop_bb047e7522a92fb11fd12cd96f8180fb.jpeg&w=1080&h=1270&crop=a_0_95_1080_1080&t=webp'
        // }
        ],
      detailsSet: {
        summary: [
          // {
          //   img: 'https://shop.io.mi-img.com/app/shop/img?id=shop_3020bee0ff8c8d7179187f329e682e74.jpeg&w=1080&h=595&t=webp'
          // },
          // {
          //   img: 'https://shop.io.mi-img.com/app/shop/img?id=shop_ea79a77d4d423ca340d84643370a84ed.jpeg&w=1080&h=444&t=webp'
          // }
        ]
      },
      scrollY: 0
    }
  },
  components: {
    goodsHeader,
    goodsSwipper,
    goodsInfo,
    goodsNumber,
    goodsSpec,
    goodsInstructions,
    goodsEvaluate,
    goodsShop,
    goodsDetails,
    goodsAction,
    goodsNumberPanel,
    goodsSpecGuige
  },
  mounted(){
    this.getGoodsDetail()
    this.getQuerySpecification()
    this.getCartInfo()

  },
  methods: {
    collect(o){
      // console.log(o)
      this.request(this.api.collect,{"Value_id":this.productId,"type_id":o?'0':'1'}).then(res => {
        if (res.errno === 0) {
          this.isActive = !o
          this.getCollectLists()
        }
      })
    },
    getCollectLists(){
      this.request(this.api.getCollectList,{typeId: 0}).then(res => {
        if (res.errno === 0) {

        }
      })
    },
    getShopInfo(){
      this.request(this.api.merchantInfo,{'id':this.data.merchant_id}).then(res => {
        if (res.errno === 0) {
          this.shopInfo = res.data
        }
      })
    },
    stores(){
      // console.log(this.data)
      this.$go('/stores/'+this.data.merchant_id)
    },
    getQueryProduct(o){
      console.log(o)
      this.productId = o.id
    },
    buy(){
      this.$go('/checkout?goodsId='+this.id+'&productId='+this.productId+'&number='+this.number)
    },
    addCard(){
      var  param = Object.assign(this.data,{number: this.number},this.guigeInfo)
      var that = this
      if(this.flag){
          this.flag = false
        this.request(this.api.CartAdd, { goodsId:this.id , number: this.number, productId: this.productId }).then(res => {
          if (res.errno === 0) {
            this.flag = true
            this.$vux.toast.text('添加购物车成功')
            this.getCartInfo()
            // that.$go('/cart')
          }
        })
      }
    },
    getCartInfo(){
      this.request(this.api.CartList).then(res => {
        if (res.errno === 0) {
          this.goodsCount = res.data.cartTotal.goodsCount
        }
      })
    },
    getGoodsDetail() {
      this.request(this.api.goodsdetail,{id:this.id}).then(res => {
        if (res.errno === 0) {
          this.data = res.data
          this.name = res.data.name
          window.localStorage.list_pic_url = res.data.list_pic_url
          window.localStorage.name= res.data.name
          window.localStorage.retail_price = res.data.retail_price
          window.localStorage.goods_number = res.data.goods_number
          window.localStorage.id = this.id
          this.swipperList = []
          this.swipperList.push({image:res.data.list_pic_url})
          this.getShopInfo()
        }
      })
    },
    getQuerySpecification() {
      this.request(this.api.queryspecification,{id:this.id}).then(res => {
        if (res.errno === 0) {
            for(var i=0;i<res.data.length;i++){

            }
        }
      })
    },
    scroll (e) {
      this.scrollY = e.y
    },
    clickTab (n) {
      if (n === 0) {
        this.$refs.scroll.scrollTo([0, 0, 800])
      }
      if (n === 1) {
        this.$refs.scroll.scrollTo('#goods-details')
      }
      if (n === 2) {
        this.$go('/evaluate')
      }
    },
    goodsNumberChange (o) {
      this.number = o.number+1
      this.data.retail_price=(o.number+1 )* this.data.retail_price
    },
  }
}
</script>
