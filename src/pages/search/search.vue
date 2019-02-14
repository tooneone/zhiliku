<template>
  <page :better-scroll="true" page-background="white">
    <search-header
      slot="top"
      :step="step"
      :searchKey="searchKey"
      @search="search"
      @changeSort="changeSort"
      @key-change="change"></search-header>
    <search-default
      :hot="hot"
      :history="history"
      @select-hot="selectHot"
      @select-history="selectHistory"
      @clear-history="clearHistory"
      v-if="step === 1"></search-default>
    <search-auto
      @searchAutoKey="searchAutoKey"
      :recommend="recommend"
      :searchList="searchList"
      v-if="step === 2"></search-auto>
    <search-list
      :list="searchList"
      v-if="step === 3"></search-list>
  </page>
</template>

<script type="text/ecmascript-6">
  import {mapActions} from 'vuex'
  import session from '@/libs/session'
  import searchHeader from './search-header'
  import searchDefault from './search-default'
  import searchAuto from './search-auto'
  import searchList from './search-list'

  export default {
    data() {
      return {
        step: 1,
        id: this.$route.query.id,/*大分类id*/
        searchKey: '',
        hot: [],
        history: session.getHistory(),
        recommend: null,
        searchList: []
      }
    },
    components: {
      searchHeader,
      searchDefault,
      searchAuto,
      searchList
    },
    methods: {
      // ...mapActions('search', ['getSearchHot', 'getSearchListBykeyword']),
      change(key) {
        // this.getSearchListBykeyword(key).then(res => {
        //   this.recommend = res.recommend
        //   this.searchList = res.hot
        //
        // })
        this.request(this.api.getkeyword, {'keyword': key,id:this.id}).then(res => {
          if (res.errno === 0) {
            this.recommend = res.data
            this.searchList = res.data
            this.step = 2
          }
        })
      },
      changeSort(n){
        console.log(n)
      },
      searchAutoKey(val){
        // @TODO
        // this.searchKey=val
        // this.searchGoods()
        this.step = 3
      },
      search(val) {
        if (val) {
          this.step = 3
          session.addHistory(val)
        } else {
          this.$toast('搜索关键字不能为空', 'warn')
        }
      },
      searchGoods(){
        this.step = 3
        this.request(this.api.getkeyword, {'keyword':  this.searchKey,id:this.id}).then(res => {
          if (res.errno === 0) {
            this.recommend = res.data
            this.searchList = res.data

          }
        })
      },
      selectHot(o) {
        // @TODO
        this.searchKey = o.keyword
        this.searchGoods()
      },
      selectHistory(s) {
        // @TODO
        this.searchKey = s
        this.searchGoods()
      },
      clearHistory() {
        session.clearHistory()
        this.history = []
      },
      init() {
        // this.getSearchHot().then(res => {
        //
        // })
        this.request(this.api.SearchHelper).then(res => {
          if (res.errno === 0) {
            this.hot = res.data
            // this.data = res.data
          }
        })
      }
    },
    created() {
      this.init()
    }
  }
</script>
