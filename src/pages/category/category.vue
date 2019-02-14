<template>
  <page>
    <!--<category-header slot="top">445</category-header>-->
    <category-content
        :list="category"
        @selectSubList="selectSubList"></category-content>
  </page>
</template>

<script type="text/ecmascript-6">
import {mapState, mapActions} from 'vuex'
import categoryHeader from './category-header'
import categoryContent from './category-content'
export default{
  data(){
    return {
      category: [
        {
          id: 0,
          name: '推荐专区',
          banner: 'http://yanxuan.nosdn.127.net/d872a3433859f8b4f35aabcb1b6e5fad.jpg?imageView&thumbnail=0x196&quality=75',
          subCategoryList: [
            {
              id: 22,
              name: '母婴特惠',
              pic: 'http://yanxuan.nosdn.127.net/81edf1f5ea3500de14f560f1b3ee78c4.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 23,
              name: '美食低至5.5折',
              pic: 'http://yanxuan.nosdn.127.net/a61e1f12c7bed9882a865c4823844920.jpg?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 24,
              name: '美食每满150减30',
              pic: 'http://yanxuan.nosdn.127.net/6a84c7006b92ccf5488219dd27059ae3.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 25,
              name: '严选黑标',
              pic: 'http://yanxuan.nosdn.127.net/9c7fa95ceb9a9af2905d25ce5d2ad4fe.png?imageView&quality=85&thumbnail=144x144'
            }
          ]
        },
        {
          id: 1,
          name: '爆品区',
          sub: [
            {
              id: 22,
              name: '母婴特惠',
              pic: 'http://yanxuan.nosdn.127.net/81edf1f5ea3500de14f560f1b3ee78c4.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 23,
              name: '美食低至5.5折',
              pic: 'http://yanxuan.nosdn.127.net/a61e1f12c7bed9882a865c4823844920.jpg?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 24,
              name: '美食每满150减30',
              pic: 'http://yanxuan.nosdn.127.net/6a84c7006b92ccf5488219dd27059ae3.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 22,
              name: '母婴特惠',
              pic: 'http://yanxuan.nosdn.127.net/81edf1f5ea3500de14f560f1b3ee78c4.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 23,
              name: '美食低至5.5折',
              pic: 'http://yanxuan.nosdn.127.net/a61e1f12c7bed9882a865c4823844920.jpg?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 24,
              name: '美食每满150减30',
              pic: 'http://yanxuan.nosdn.127.net/6a84c7006b92ccf5488219dd27059ae3.png?imageView&quality=85&thumbnail=144x144'
            },
            {
              id: 25,
              name: '严选黑标',
              pic: 'http://yanxuan.nosdn.127.net/9c7fa95ceb9a9af2905d25ce5d2ad4fe.png?imageView&quality=85&thumbnail=144x144'
            }
          ]
        },
        {
          id: 2,
          name: '夏季专区'
        },
        {
          id: 3,
          name: '居家'
        },
        {
          id: 4,
          name: '鞋包配饰'
        },
        {
          id: 5,
          name: '服装'
        },
        {
          id: 6,
          name: '电器'
        },
        {
          id: 7,
          name: '洗护'
        },
        {
          id: 8,
          name: '餐厨'
        },
        {
          id: 9,
          name: '婴童'
        },
        {
          id: 10,
          name: '文体'
        },
        {
          id: 11,
          name: '特色区'
        }
      ],
    }
  },
  computed: {
    ...mapState('category', ['category'])
  },
  components: {
    categoryHeader,
    categoryContent
  },
  methods: {
    ...mapActions('category', ['getCategory']),
    selectSubList (o) {
      this.$go(`/goods-by-category?id=${o.parent.id}&pid=${o.sub.id}`)
    },
    getCategory() {
      this.request(this.api.CatalogList).then(res => {
        if (res.errno === 0) {
          this.category = res.data.categoryList
        }
      })
    },
  },
  created () {
    this.getCategory()
  }
}
</script>
