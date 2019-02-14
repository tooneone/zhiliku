<template>
  <page :better-scroll="true" page-background="white">
    <goods-by-category-header
      slot="top"
      :subCategory="subCategory"
      :sid="sid"
      @change-sub-category="changeSubCategory"></goods-by-category-header>
    <goods-by-category-list :list="goodsByCategory"></goods-by-category-list>
  </page>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapActions} from 'vuex'
  import goodsByCategoryHeader from './goods-by-category-header'
  import goodsByCategoryList from './goods-by-category-list'

  export default {
    data() {
      return {
          pid: this.$route.query.pid,/*小分类id*/
        sid: this.$route.query.pid,
          id: this.$route.query.id,/*大分类id*/
        subCategory: {
          id: 0,
          name: '推荐',
          banner: 'http://yanxuan.nosdn.127.net/d872a3433859f8b4f35aabcb1b6e5fad.jpg?imageView&thumbnail=0x196&quality=75',
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
      goodsByCategoryList
    },
    methods: {
      ...mapActions('category', ['getSubCategoryByPid', 'getGoodsByCategory']),
      changeSubCategory(o) {
        // this.getGoodsByCategory(o.id)
        this.request(this.api.getlilsort,{id:o.id}).then(res => {
          if (res.errno === 0) {
            this.goodsByCategory = res.data
          }
        })
      },
      getCategory() {
        // this.id = this.$route.query.id?this.$route.query.id:this.$route.query.pid
        this.request(this.api.CatalogCurrent,{id:this.id}).then(res => {
          if (res.errno === 0) {
            this.subCategory = res.data.currentCategory
          }
        })
      },
      getSort() {
        this.request(this.api.getlilsort,{id:this.pid}).then(res => {
          if (res.errno === 0) {
            this.goodsByCategory = res.data
          }
        })
      },
      // init() {
      //   this.getSubCategoryByPid(this.pid).then((res) => {
      //     this.getGoodsByCategory(res.sub[0].id)
      //   })
      // }
    },
    created() {
      // this.init()
      this.getCategory()
      this.getSort()
    }
  }
</script>
