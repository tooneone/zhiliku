<template>
  <div class="center-account">
    <div class="header-left" @click="$back">
      <i class="iconfont">&#xe68c;</i>
    </div>
    <div class="account-left">
      <div class="left-avatar">
        <img class="ignore" src="http://yanxuan.nosdn.127.net/d872a3433859f8b4f35aabcb1b6e5fad.jpg?imageView&thumbnail=0x196&quality=75" alt="">
      </div>
      <div class="left-name">
        <span>{{subCategory.name}}</span> <br>
        <span>{{subCategory.startTime}}--{{subCategory.endTime}}</span> <br>
        <span>{{subCategory.introduction}}</span> <br>
      </div>
    </div>
    <div class="direct-supply-wrap">
      <div class="wrap-item"  v-for="item of toggleDatas" :class="{active:item.isActive}" @click="toggleClass(item)">{{item.name}}{{item.num}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['isLogin', 'profile','subCategory','toggleDatas'],
  methods:{
    toggleClass(item){
      this.$emit('toggleClass',item)
    }
  }
}
</script>

<style lang="less" scoped>
  .direct-supply-wrap{
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    top: 298px;
    width: 100%;
    background-color: white;
    .wrap-item{
      position: relative;
      /*flex-basis: calc(20% - 3.5px);*/
      flex-basis:50%;
      height: auto;
      text-align: center;
      color:#333;
      box-sizing: border-box;
      padding: 22px;
      &.active {
        color: #b60a0a;
        border-bottom: 1px solid #b60a0a;
      }
    }
  }
  .center-account{
    .header-left {
      position: absolute;
      top: 50%;
      left: 27px;
      transform: translateY(-50%);
      z-index: 111111111;
      i{
        display: inline-block;
        width:60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border-radius: 30px;
        /*background: RGBA(0, 0, 0, .1);*/
        color:white;
      }
    }
    position: relative;
    height: 277px;
    background: url('../../static/images/center/personal_bg_top.png') center no-repeat;
    /*background: url('http://yanxuan.nosdn.127.net/d872a3433859f8b4f35aabcb1b6e5fad.jpg?imageView&thumbnail=0x196&quality=75') center no-repeat;*/
    background-size: 100% 100%;
    .account-left{
      position: absolute;
      top: 50%;
      left: 128px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      .left-avatar{
        display: inline-block;
        width: 127px;
        height: 127px;
        .ignore{
          width:100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .left-name{
        padding-left:28px;

        span{
          line-height: 40px;
          font-size: 12px;
          font-weight: 600;
          color:white;
        }
      }
    }
    .account-right{
      position: absolute;
      top: 50%;
      right: 28px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      i{
        color:white;
      }
    }
  }
</style>
