<template>
  <page :better-scroll="true" page-background="white">
    <!--<goods-by-category-header-->
      <!--slot="top"-->
      <!--:subCategory="subCategory"-->
      <!--:sid="id"-->
      <!--@change-sub-category="changeSubCategory"></goods-by-category-header>-->
    <page-header slot="top"></page-header>
    <div  v-if="loading" style="text-align: center;line-height: 500px;">
      <img src="../../static/images/5-121204193R0.gif" alt="">
    </div>
    <goods-by-category-list :list="goodsByCategory"></goods-by-category-list>
  </page>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import goodsByCategoryHeader from './goods-by-category-header'
  import goodsByCategoryList from './goods-by-category-list'
  import pageHeader from './common/page-header'

  export default {
    data() {
      return {
           loading:true,
            pid: this.$route.query.pid,/*小分类id*/
        // sid: this.$route.query.sid,
          id: this.$route.query.id,/*大分类id*/
        subCategory: {
          id: 0,
          subCategoryList: []
        },
        goodsByCategory: [],
      }
    },
    computed: {
      // ...mapState('category', ['subCategory', 'goodsByCategory'])
    },
    components: {
      goodsByCategoryHeader,
      goodsByCategoryList,
      pageHeader
    },
    created(){
      this.changeSubCategory()
    },
    methods: {
      ...mapActions('category', ['getSubCategoryByPid', 'getGoodsByCategory']),
      changeSubCategory() {
        this.request(this.api.getCollectList).then(res => {
          this.loading = false
          if (res.errno === 0) {
            this.goodsByCategory = res.data
          }
        })
      },
      getCategory() {
        // this.id = this.$route.query.id?this.$route.query.id:this.$route.query.pid
        this.request(this.api.CatalogCurrent,{id:this.id}).then(res => {
          if (res.errno === 0) {
            // this.subCategory = res.data.currentCategory
          }
        })
      },
      getSort() {
        this.request(this.api.getlilsort,{id:this.pid}).then(res => {
          if (res.errno === 0) {
            // this.goodsByCategory = res.data
          }
        })
      },
      // init() {
      //   this.getSubCategoryByPid(this.pid).then((res) => {
      //     this.getGoodsByCategory(res.sub[0].id)
      //   })
      // }
    },
  }
</script>
