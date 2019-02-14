<template>
  <div class="order-status-all">
    <order-none v-if="OrderList.length<=0" text="目前没有任何订单哦~"></order-none>
    <order-cell v-else :key="item.id" :type="1" @cancel="cancel" v-if="item.order_status===0"  :items="item" v-for="item of OrderList"></order-cell>
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
      cancel(orderId){
        this.$emit('cancel',orderId)
      }
    }
  }
</script>
