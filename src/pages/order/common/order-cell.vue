<template>
  <div class="order-cell">
    <!--<div class="cell-time-status">-->
      <!--<div class="cell-time">-->
        <!--<span>2018-08-06 16:57</span>-->
      <!--</div>-->
      <!--<div class="cell-status">-->
        <!--<span>已支付支付</span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="cell-goods border-1px-top">
      <div class="goods-item" v-for="item of items.shopsInfo">
        <div class="item-pic">
          <img class="ignore" :src="item.list_pic_url" alt="">
        </div>
        <div class="item-info">
          <div class="info-name">
            <h3>{{item.goods_name}}</h3>
          </div>
        </div>
        <div class="item-price-num">
          <span class="single-price">￥{{item.retail_price}}</span>
          <span class="num">x{{item.number}}</span>
        </div>
      </div>
    </div>
    <div class="cell-price">
      <div class="price-total">
        <p>总金额<span>￥{{items.order_price}}</span></p>
      </div>
      <div class="price-transfer">
        <!--<span>（含运费￥10）</span>-->
      </div>
    </div>
    <div class="cell-action border-1px-top" >
      <div class="expire-time">
        <span>24小时候订单将关闭</span>
      </div>
      <div class="action-btns">
        <span @click="cancel(items.order_sn)">取消</span>
        <span v-if="type===0||type===1" @click="$go('/checkout?order_sn='+items.order_sn)">去支付</span>
        <span v-if="type===2" @click="canfirm(items.order_sn)">确认</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:['items','type'],
    methods:{
      cancel(orderId){
        this.$emit('cancel',orderId)
      },
      canfirm(orderId){
        this.$emit('canfirm',orderId)
      }
    }
  }
</script>
<style lang="less" scoped>
  .order-cell{
    padding:0 28px;
    background: white;
    .cell-time-status{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 90px;
      .cell-time{
        span{
          color:#666;
        }
      }
      .cell-status{
        span{
          color:#845f3f;
        }
      }
    }
    .cell-goods{
      .goods-item{
        display: flex;
        padding-top: 20px;
        .item-pic{
          flex-basis: 166px;
          height: 166px;
          .ignore{
            width:100%;
            height:100%;
          }
        }
        .item-info{
          flex:1;
          .info-name{
            padding-top:20px;
            h3{
              font-weight: 600;
              color:#333;
            }
          }
        }
        .item-price-num{
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
        &:last-child{
          padding-bottom: 20px;
        }
      }
    }
    .cell-price{
      .price-total{
        padding-top:35px;
        p{
          text-align: right;
          color:#333;
          span{
            font-size: 28px;
            font-weight: 600;
            color:rgb(182, 9, 9);
          }
        }
      }
      .price-transfer{
        padding:20px 0;
        text-align: right;
        color:#333;
      }
    }
    .cell-action{
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 113px;
      .expire-time{
        color:#666;
      }
      .action-btns{
        display: flex;
        align-items: center;
        span{
          display: inline-block;
          width:170px;
          height: 60px;
          box-sizing: border-box;
          line-height: 60px;
          text-align: center;
          border-radius: 5px;
          border:1px solid rgb(204, 204, 204);
          color:#666;
          &:not(:first-child){
            margin-left:20px;
            color:rgb(159, 128, 82);
            border-color: rgb(159, 128, 82);
          }
        }
      }
    }
  }
</style>
