<template>
  <div id="page">
    <m-cell-group>
      <m-cell
          title="商家电话"
          :value="subCategory.phone"></m-cell>
      <m-cell
        title="公司名称"
        :value="subCategory.name"></m-cell>
      <m-cell
        title="所在地区"
        :value="subCategory.address"></m-cell>
      <m-cell
        title="营业时间"
        :value="subCategory.businessHours"></m-cell>
      <m-cell
        title="店铺简介"
        :value="subCategory.introduction"></m-cell>
    </m-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      name: '尚品美食专营店',
      storePhone:5582512430,
      companyName:'尚品',
      location:'湖北武汉',
      businessHours:'6：00--次日0：00',
      hopsIntroduction:'尚品美食，让美食不平凡！',
    }
  },
  props:['subCategory'],
  computed: {
    ...mapState('user', ['profile'])
  },
  created(){
    this.subCategory.businessHours = this.subCategory.startTime+'--'+this.subCategory.endTime

  },
  methods: {
    ...mapActions('user', ['logout']),
    updateAvatar () {
      const title = '选择照片'
      const data = [
        {
          id: 1,
          content: '拍照'
        },
        {
          id: 2,
          content: '本地上传'
        }
      ]
      this.$sheet(title, data, (item, index) => {
        // @TODO
      })
    }
  }
}
</script>
<style lang="less">
  #page {
    margin-top: 340px;
  }
  #page .group-header {
    display: none;
    /*margin-top: 340px;*/
  }
</style>
<style lang="less" scoped>
  .account-avatar {
    display: inline-block;
    height: 104px;
    width: 104px;
    margin-right: 54px;
    .ignore {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
</style>
