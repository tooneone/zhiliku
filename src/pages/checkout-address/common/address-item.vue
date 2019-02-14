<template>
  <div class="address-item border-1px-bottom" >
    <div class="item-select" v-if="addressItem.is_default" @click="checkedAddress">
      <i class="iconfont">&#xe65f;</i>
    </div>
    <div class="item-main" @click="checkedAddress">
      <div class="main-top">
        <span>{{addressItem.userName}}</span>
        <span>{{addressItem.telNumber}}</span>
      </div>
      <div class="main-bottom">
        <span v-if="addressItem.is_default">默认</span>
        <p>中国 {{addressItem.full_region}} {{addressItem.detailInfo}} <i v-if="addressItem.postalCode">（{{addressItem.postalCode}}）</i></p>
      </div>
    </div>
    <div class="item-update">
      <i @click="update" class="iconfont">&#xe62c;</i>
      <span @click="deletes">删除</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data(){
    return{

    }
  },
  props:['addressItem'],
  methods: {
    update () {
      this.$emit('update',this.addressItem)
    },
    deletes () {
      this.$emit('deletes',this.addressItem)
    },
    checkedAddress () {
      this.$emit('checkedAddress',this.addressItem)
    }
  }
}
</script>

<style lang="less" scoped>
  .address-item{
    display: flex;
    height: 210px;
    padding:0 27px;
    background: white;
    .item-select{
      display: flex;
      align-items: center;
      flex-grow: 0;
      i{
        color:#d74945;

      }
    }
    .item-main{
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex:1;
      padding:0 24px 0 40px;
      .main-top{
        display: flex;
        justify-content: space-between;
        span{
          font-weight: 600;
          font-size: 28px;
          color:#333;
        }
      }
      .main-bottom{
        display: flex;
        padding-top:27px;
        span{
          display: inline-block;
          height: 36px;
          box-sizing: border-box;
          padding:0 10px;
          margin-right:10px;
          line-height: 34px;
          border:1px solid #d74945;
          white-space: nowrap;
          color:#d74945;
        }
        p{
          color:#666;
        }
      }
    }
    .item-update{
      display: flex;
      align-items: center;
      flex-grow: 0;
      i{
        color:#666;
        padding-right: 10px;
      }
      span {
        color:#d74945;
      }
    }
  }
</style>
