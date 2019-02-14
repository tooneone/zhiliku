<template>
  <div class="order-status-dispatched">
    <order-none v-if="OrderList.length<=0" text="目前没有任何订单哦~"></order-none>
    <order-cell v-else v-if="item.order_status===300" @canfirm="canfirm" :type="2" :key="item.id"  :items="item" v-for="item of OrderList"></order-cell>
  </div>
</template>

<script type="text/ecmascript-6">
  import orderNone from './common/order-none'
  import orderCell from './common/order-cell'
  export default {
    components: {
      orderNone,
      orderCell
    },
    props:['OrderList'],
    methods:{
      canfirm(orderId){
        this.$emit('canfirm',orderId)
      }
    }
  }
</script>
