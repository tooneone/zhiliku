<template>
  <div class="goods-number">
    <goods-cell title="数量：" @click.native="updateGoodsNumber">
      <span>{{number}}</span>
    </goods-cell>
    <!--<m-number  v-show="false" :value="value"></m-number>-->
  </div>
</template>

<script type="text/ecmascript-6">
import goodsCell from './common/goods-cell'
import goodsNumberPanel from './goods-number-panel'

export default {
  data(){
    return {
      number:1,
    }
  },
  components: {
    goodsCell,
    goodsNumberPanel
  },
    created() {
      this.$mPopup({
        mask: false,
      }, (h) => {
        return
      }).close()
    },
  methods: {
    updateGoodsNumber () {
      this.$mPopup({
        mask: true
      }, (h) => {
        return h(goodsNumberPanel, {
          on: {
            change: this.changeHandler,
          },
        })
      })
    },
    changeHandler (o) {
        this.number = o.number+1
        this.$emit('change', o)
    }
  }
}
</script>
<style>
</style>
<style lang="less" scoped>
  .goods-number {
    margin-bottom: 10px;
    background: white;
  }
</style>
