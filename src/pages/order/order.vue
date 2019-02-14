<template>
  <page :better-scroll="true">
    <page-header slot="top"></page-header>
    <template slot="extra-top">
      <account-warm></account-warm>
      <order-type
        :type="type"
        :receivedNum="receivedNum"
        @current-type="currentType"></order-type>
    </template>
    <div  v-if="loading" style="text-align: center;line-height: 500px;">
      <img src="../../static/images/5-121204193R0.gif" alt="">
    </div>
    <order-status-all @cancel="cancel" v-if="type === 0" :OrderList="OrderList"></order-status-all>
    <order-status-uncleared @cancel="cancel" v-if="type === 1" :OrderList="OrderList"></order-status-uncleared>
    <order-status-dispatched @canfirm="canfirm" v-if="type === 2" :OrderList="OrderList"></order-status-dispatched>
    <order-status-refund v-if="type === 3" :OrderList="OrderList"></order-status-refund>
    <order-status-received v-if="type === 4" :OrderList="OrderList"></order-status-received>
  </page>
</template>

<script type="text/ecmascript-6">
import accountWarm from '../common/account-warm'
import pageHeader from './common/page-header'
import orderType from './order-type'
import orderStatusAll from './order-status-all'
import orderStatusUncleared from './order-status-uncleared'
import orderStatusDispatched from './order-status-dispatched'
import orderStatusRefund from './order-status-refund'
import orderStatusReceived from './order-status-received'
export default{
  data () {
    return {
      type: parseInt(this.$route.query.from),
      receivedNum:0,
      loading:true,
      OrderList:[]
    }
  },
  components: {
    accountWarm,
    pageHeader,
    orderType,
    orderStatusAll,
    orderStatusUncleared,
    orderStatusDispatched,
    orderStatusRefund,
    orderStatusReceived
  },
  created(){
    this.getOrderList()
  },
  methods: {
    currentType (n) {
      this.type = n
    },
    cancel(orderId){
      this.request(this.api.OrderCancel,{"orderId":orderId}).then(res => {
        if (res.errno === 0) {
          this.$toast('订单取消成功')
          this.getOrderList()
        }
      })
    },
    canfirm(orderId){
      this.request(this.api.OrderConfirm,{"orderId":orderId}).then(res => {
        if (res.errno === 0) {
          this.$toast('确认成功')
          this.getOrderList()
        }
      })
    },
    getOrderList(){
      this.request(this.api.OrderList).then(res => {
        this.loading=false
        if (res.errno === 0) {
          var arr = res.data.data
          for(let i =0;i<arr.length;i++){

            if( arr[i].order_status===300){
              this.receivedNum++
            }
            arr[i].shopsInfo=[]
            for(let j =0;j<arr.length;j++){
              if(arr[i].id === arr[j].id){
                arr[i].shopsInfo.push(arr[j])
              }
            }
          }
          for(let i =0;i<arr.length;i++){
            for(let j =i+1;j<arr.length;j++){
              if(arr[i].id === arr[j].id){
                arr.splice(j,1);
              }
            }
          }
          this.OrderList = arr
          console.log(this.OrderList)
        }
      })
    }
  }
}
</script>
