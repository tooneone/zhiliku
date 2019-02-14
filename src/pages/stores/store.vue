<template>
  <page :better-scroll="true"  :header-immerse="true" id="store">
    <!--<center-header ></center-header>-->
    <center-account slot="top" :subCategory="subCategory" :toggleDatas="toggleDatas" @toggleClass="toggleClass"></center-account>
    <!--<div class="direct-supply-wrap">-->
      <!--<div class="wrap-item"  v-for="item of toggleDatas" :class="{active:item.isActive}" @click="toggleClass(item)">{{item.name}}{{item.num}}</div>-->
    <!--</div>-->
    <goods-by-category-list v-if="toggleDatas[0].isActive" :list="goodsByCategory"></goods-by-category-list>
    <personAccount v-if="toggleDatas[1].isActive" :subCategory="subCategory"></personAccount>
  </page>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  // import goodsByCategoryHeader from './goods-by-category-header'
  import centerHeader from './center-header'
  import centerAccount from './center-account'
  import personAccount from './account'
  import goodsByCategoryList from './goods-by-category-list'

  export default {
    data() {
      return {
        pid: this.$route.query.pid,
        sid: this.$route.query.sid,
        id: this.$route.params.id,
        isActive:true,
        toggleDatas:[
          {
          name:"商品",
          isActive: true,
            num: '',
          },
      {
          name:"商家",
          isActive: false,}
          ],
        subCategory: {
          id: 0,
          name: '尚品美食专营店123',
          storePhone:5582512430,
          companyName:'尚品',
          location:'湖北武汉',
          businessHours:'6：00--次日0：00',
          hopsIntroduction:'尚品美食，让美食不平凡！',
          banner: 'http://yanxuan.nosdn.127.net/d872a3433859f8b4f35aabcb1b6e5fad.jpg?imageView&thumbnail=0x196&quality=75',
        },
        goodsByCategory: [

        ],
      }
    },
    computed: {
      // ...mapState('category', ['subCategory', 'goodsByCategory'])
    },
    components: {
      // goodsByCategoryHeader,
      centerHeader,
      centerAccount,
      personAccount,
      goodsByCategoryList
    },
    created() {
      console.log(this.id)
      this.init()
      this.getCategory()
    },
    methods: {
      ...mapActions('category', ['getSubCategoryByPid', 'getGoodsByCategory']),
      changeSubCategory(o) {
        this.getGoodsByCategory(o.id)
      },
      toggleClass(item) {
        this.toggleDatas[0].isActive = false
        this.toggleDatas[1].isActive = false
        item.isActive = true
      },
      getCategory() {

        this.request(this.api.merchantGoods,{"id":this.id}).then(res => {
          if (res.errno === 0) {
            this.goodsByCategory = res.data
            this.toggleDatas[0].num ="("+ res.data.length+")"
          }
        })
      },
      init() {
        this.request(this.api.merchantInfo,{'id':this.id}).then(res => {
          if (res.errno === 0) {
            this.subCategory = res.data
          }
        })
      }
    }
  }
</script>
<style>
  #store .center-header {
    display: none;
  }
</style>
<style lang="less" scoped>
    .all {
      display: flex;
      flex-wrap: wrap;
      .item {
        flex-basis:50%;
        text-align: center;
      }
      font-size: 12px;
      background-color: #ccc;
      padding: 4px 60px;
      color: #b60a0a;
    }

</style>
