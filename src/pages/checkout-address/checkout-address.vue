<template>
  <page>
    <page-header slot="top"  @newAdd="newAdd"></page-header>
    <div  v-if="loading" style="text-align: center;line-height: 500px;">
      <img src="../../static/images/5-121204193R0.gif" alt="">
    </div>
    <address-item @update="update" @checkedAddress="checkedAddress" @deletes="deletes" :key="item.id" v-for="item of address" :addressItem="item"></address-item>
  </page>

</template>

<script type="text/ecmascript-6">
import addressItem from './common/address-item'
import pageHeader from './common/page-header'
export default {
  data(){
    return{
      loading:true,
      address:[]
    }
  },
  components: {
    addressItem,
    pageHeader
  },
  created(){
    this.getAddressList()
  },
  methods: {
    getAddressList(){
      this.request(this.api.AddressList).then(res => {
        this.loading = false
        this.address = res.data
      })
    },
    update (o) {
      this.$go('/address/update?id='+o.id)
    },
    checkedAddress (o) {
      o.is_default = 1
      this.request(this.api.AddressSave,o).then(res => {
        if (res.errno === 0) {
            this.$toast('地址修改成功')
            this.getAddressList()
            this.$back()
        }
      })
    },
    newAdd(){

      this.$go('/address/update?type=add')
    },
    deletes(o){

      this.request(this.api.addressDelete,{id:o.id}).then(res => {
        if (res.errno === 0) {
          this.getAddressList()
          this.$toast('删除成功', 'warn')
        }
      })
    }
  }
}
</script>
