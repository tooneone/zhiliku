<template>
  <div class="goods-number-panel">
    <div class="panel-goods">
      <div class="goods-img">
        <img :src="datas.list_pic_url" alt="">
      </div>
      <div class="goods-info">
        <div class="info-name">
          <p>{{datas.name}}</p>
        </div>
        <div class="info-price">
          <span>￥{{datas.retail_price}}</span>
        </div>
      </div>
    </div>
    <div class="panel-section">
      <div class="section-title">
        <span>数量</span>
      </div>
      <div class="section-content">
        <m-number :params="datas" :value="num" @change="change"></m-number>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
export default {
  data(){
      return {
        datas:{
          list_pic_url:'',
          retail_price:'',
          name:'',
          goods_number:'',
        },
        num: 1
      }
  },
  props: ['id'],
  created(){
  this.getQuerySpecification()
    this.datas.list_pic_url =  window.localStorage.list_pic_url
    this.datas.goods_number =  window.localStorage.goods_number
    this.datas.name =  window.localStorage.name
    this.datas.retail_price =  window.localStorage.retail_price
  },
  methods: {
    getQuerySpecification() {

    },
    change (o) {

      if(o.type==='add'){
        if(this.num< this.datas.goods_number){
          this.num++
        }else {
          this.$toast('库存量不足', 'warn')
        }

      }
      if(o.type==='sub'){
        if(this.num>0){
          this.num--
        }else {
          this.$toast('商品数量不能小于一件', 'warn')
        }

      }
      console.log(o)
      this.datas.retail_price = this.num * this.datas.retail_price
      this.$emit('change', o)
    }
  }
}
</script>

<style lang="less" scoped>
  .goods-number-panel{
    min-height: 700px;
    padding:0 27px;
    background: white;
    .panel-goods{
      display: flex;
      align-items: center;
      padding:27px 0;
      .goods-img{
        flex-basis: 127px;
        height: 127px;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .goods-info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left:20px;
        .info-name{
          p{
            font-size: 28px;
          }
        }
        .info-price{
          span{
            font-size: 34px;
            font-weight: 600;
            color:#b6090b;
          }
        }
      }
    }
    .panel-section{
      .section-title{
        display: flex;
        align-items: center;
        height: 62px;
        span{
          font-size: 28px;
          color:#666;
        }
      }
      .section-content{
        padding:20px 0;
      }
    }
  }
</style>
