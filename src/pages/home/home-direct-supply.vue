<template>
  <div class="home-direct-supply">
    <!--<m-floor>-->
      <div class="direct-supply-wrap">
        <div class="wrap-item" :key="key" v-for="(item, key) in list" >
          <img class="ignore" :src="item.icon_url" alt=""  @click="$go(item.url)">
          <h4  @click="$go(item.url)">{{item.name}}</h4>
          <!--<div class="item-desc">-->
          <!---->
            <!--<span>{{item.price}}元起</span>-->
          <!--</div>-->
        </div>
      </div>
    <!--</m-floor>-->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['list']
}
</script>

<style lang="less" scoped>
  .home-direct-supply{
    margin-bottom: 20px;
    background-color: #fff;
    .direct-supply-wrap{
      display: flex;
      flex-wrap: wrap;
      .wrap-item{
        position: relative;
        /*flex-basis: calc(20% - 3.5px);*/
        flex-basis:20%;
        height: 172px;
        text-align: center;
        /*background: #f4f4f4;*/
        color:#333;
        box-sizing: border-box;
        padding: 22px;
        /*.item-desc{*/
          /*position: absolute;*/
          /*top:20px;*/
          /*left:20px;*/
          /*display: flex;*/
          /*flex-direction: column;*/
          /*align-items: flex-start;*/
          /*h4{*/
            /*height: 30px;*/
            /*line-height: 30px;*/
          /*}*/
          /*span{*/
            /*height: 30px;*/
            /*line-height: 30px;*/
          /*}*/
          /*label{*/
            /*display: inline-block;*/
            /*height: 30px;*/
            /*line-height: 30px;*/
            /*padding:0 10px;*/
            /*border:1px solid #d1c9b3;*/
            /*color:#d1c9b3;*/
          /*}*/
        /*}*/
        .ignore{
          width:42.4px;
          height: 42.4px;
        }
        &:nth-child(2n + 1){
          /*margin:0 7px 7px 0;*/
        }
        &:nth-child(2n){
          /*margin-bottom:7px;*/
        }
      }
    }
  }
</style>
