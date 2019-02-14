<template>
  <div class="goods-spec-panel">
    <div class="panel-goods">
      <div class="goods-img">
        <img :src="data.list_pic_url" alt="">
      </div>
      <div class="goods-info">
        <div class="info-name">
          <p>{{data.name}}</p>
        </div>
        <div class="info-price">
          <span>￥{{data.retail_price}}</span>
        </div>
      </div>
    </div>
    <goods-spec-guige :id="this.id" :retail_price="data.retail_price"></goods-spec-guige>
  </div>
</template>
<script type="text/ecmascript-6">
  import goodsSpecGuige from './common/goods-spec-guige'
  export default {
    data(){
      return {
        data:{
          list_pic_url:'',
          retail_price:'',
          name:''
        },
      }
    },
    components:{goodsSpecGuige},
    props: ['id'],
    created(){
      this.data.list_pic_url =  window.localStorage.list_pic_url
      this.data.name =  window.localStorage.name
      this.data.retail_price =  window.localStorage.retail_price
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/less/index';
  .goods-spec-panel{
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

  }
</style>
