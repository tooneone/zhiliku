<template>
  <page id="address">
    <div class="page-header border-1px-bottom" slot="top">
      <div class="header-left" @click="$back">
        <i class="iconfont">&#xe68c;</i>
      </div>
      <h3>地址编辑</h3>
      <div class="header-right" @click="save">
        <span>保存</span>
      </div>
    </div>
    <div class="address-update">
      <div class="update-item">
        <div class="item-title">
          <span>收货人姓名</span>
        </div>
        <div class="item-text">
          <input type="text" placeholder="收货人" @change="nameValid(form.userName)" v-model="form.userName">
        </div>
      </div>
      <div class="update-item">
        <div class="item-title">
          <span>手机号码</span>
        </div>
        <div class="item-text">
          <input type="text" placeholder="手机号码" @change="phoneValid(form.telNumber)" v-model="form.telNumber">
        </div>
      </div>
      <div class="update-item">
        <div class="item-title">
          <span>所在地区</span>
        </div>
        <div class="item-text">
          <cube-select name="province"
            v-model="form.provinceName"
            :title="province.title"
            :options="province.options"
            :placeholder="province.placeholder"
            :auto-pop="province.autoPop"
            :disabled="province.disabled"
            @change="changeProvince">
          </cube-select>
          <cube-select name="province"
                       v-model="form.cityName"
                       :title="city.title"
                       :options="city.options"
                       :placeholder="city.placeholder"
                       :auto-pop="city.autoPop"
                       :disabled="city.disabled"
                       @change="changeCity">
          </cube-select>
          <cube-select name="province"
                       v-model="form.countyName"
                       :title="area.title"
                       :options="area.options"
                       :placeholder="area.placeholder"
                       :auto-pop="area.autoPop"
                       :disabled="area.disabled"
                       @change="changeArea">
          </cube-select>
          <!--<p>广东 佛山 顺德 北滘</p>-->
        </div>
      </div>
      <div class="update-item">
        <div class="item-title">
          <span>详细收货地址</span>
        </div>
        <div class="item-text">
          <input type="text" placeholder="详细收货地址" @change="placeValid(form.detailInfo)"  v-model="form.detailInfo">
        </div>
      </div>
      <div class="update-item">
        <div class="item-title">
          <span>邮政编码</span>
        </div>
        <div class="item-text">
          <input type="text" placeholder="邮政编码"  v-model="form.postalCode">
        </div>
      </div>
      <div class="update-item">
        <div class="item-title">
          <span>是否默认地址</span>
        </div>
        <div class="item-text">
          <cube-radio-group v-model="selected" :options="options" />
        </div>
      </div>
    </div>
  </page>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      id:'1',
      title:'地址编辑',
      selected: '是',
      options: ['是', '否'],
     province:{
        ids:[],
       options: [],
       value: '',
       title: '省',
       placeholder: '省',
       autoPop: false,
       disabled: false,
     },
      city:{
        ids:[],
        options: [],
        value: '',
        title: '市',
        placeholder: '市',
        autoPop: false,
        disabled: false,
      },
      area:{
        ids:[],
        options: [],
        value: '',
        title: '区域',
        placeholder: '区域',
        autoPop: false,
        disabled: false,
      },
      form: {
        userName: '邓海标',
        telNumber: 13680065830,
        nationalCode: '陈家北二巷',
        provinceName:'',
        cityName:'',
        countyName:'',
        detailInfo:'金融港4路',
        postalCode: '528300',
        is_default:1,
      },
    }
  },
  created(){
    this.getProvinceList()
    if(this.$route.query.id){
      this.addressDetail()
    }
    if(this.$route.query.type==='add'){
      this.form = {
        userName: '',
        telNumber: '',
        nationalCode: '',
        provinceName:'',
        cityName:'',
        countyName:'',
        detailInfo:'',
        postalCode: '',
        is_default:1,
      }
    }
  },
  methods:{
    nameValid(o){
      console.log(o)
      if(!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(o)){
        this.$toast("请填入正确的姓名格式",'warn')
        return false
      }else {
        return true
      }

    },
    phoneValid(o){
      if(!(/^1[34578]\d{9}$/.test(o))){
        this.$toast("手机号码有误，请重填");
        return false;
      } else {
        return true
      }
    },
    postValid(postalcode){
      var reg = /^[0-9]{6}$/;
      if(reg.test(postalcode)){
        return true;
      }else if(postalcode==""||postalcode.length==0){
        this.$toast("请输入您的邮政编码",'warn')
        return false;
      }else{
        this.$toast("邮政编码格式有误，请重输",'warn')
        return false;
      }
    },
    placeValid(dz) {
      if (dz.length <= 0) {
        this.$toast("地址信息必填",'warn')
        return false;
      }
      if (dz.length < 4 || dz.length > 60) {
        this.$toast("请填写正确的地址信息",'warn')
        return false;
      } else {
        return true;
      }
    },
    changeProvince(value, index, text) {
      console.log('change', value, index, text)
      console.log(this.province.ids[index])
      this.getCityList(this.province.ids[index])
    },
    changeCity(value, index, text) {
      console.log('change', value, index, text)
      this.getDistinctList(this.city.ids[index])
    },
    changeArea(value, index, text) {
      console.log('change', value, index, text)
      console.log(index)
    },
    getProvinceList(){
      this.request(this.api.getProvince,{areaId:1}).then(res => {
        if (res.errno === 0) {
          this.province.options =[]
          this.city.options =[]
          this.area.options = []
          for(let i=0;i<res.data.length;i++){
            this.province.options.push(res.data[i].name)
            this.province.ids.push(res.data[i].id)
          }
        }
      })
    },
    getCityList(parentId){
      this.request(this.api.getCity,{id:parentId,proviceName:this.form.provinceName}).then(res => {
        if (res.errno === 0) {
          this.city.options =[]
          this.area.options = []
          for(let i=0;i<res.data.length;i++){
            this.city.options.push(res.data[i].name)
            this.city.ids.push(res.data[i].id)
          }

        }
      })
    },
    getDistinctList(parentId){
      this.area.options = []
      this.request(this.api.getDistinct,{id:parentId,cityName:this.form.cityName,proviceName:this.form.provinceName}).then(res => {
        if (res.errno === 0) {
          for(let i=0;i<res.data.length;i++){
            this.area.options.push(res.data[i].name)
            this.area.ids.push(res.data[i].id)
          }

        }
      })
    },
    addressDetail(){
      this.request(this.api.AddressDetail,{id:this.$route.query.id}).then(res => {
        if (res.errno === 0) {
          this.form=res.data
          if(res.data.is_default === 1){
            this.selected = '是'
          }else {
            this.selected = '否'
          }
          this.changeProvince()
          this.changeCity()
        }
      })

    },
    save(){
        // this.form = {
        //   userName: '',
        //   telNumber: '',
        //   nationalCode: '',
        //   provinceName:'',
        //   cityName:'',
        //   countyName:'',
        //   detailInfo:'',
        //   postalCode: '',
        //   is_default:1,
        // }
      if(!this.nameValid(this.form.userName)){
        return false
      }
      if(!this.phoneValid(this.form.telNumber)){
        return false;
      }
      if(!this.postValid(this.form.postalCode)){
        return false
      }
      if(!this.placeValid(this.form.detailInfo)){
          return false
      }
      if(!this.form.provinceName){
        this.$toast("省信息必填", 'warn')
        return false
      }
      if(!this.form.cityName){
        this.$toast("市信息必填", 'warn')
        return false
      }
      if(!this.form.countyName){
        this.$toast("区域信息必填", 'warn')
        return false
      }

      if(this.selected==='是'){
        this.form.is_default = "1"
      }else {
        this.form.is_default = "0"
      }
      if(this.$route.query.type==='add'){
        this.request(this.api.AddressSave,this.form).then(res => {
          if (res.errno === 0) {
            this.$toast('添加成功')
            this.$back()
            // this.$go('/checkout/address')
          }
        })
      }
      if(this.$route.query.id){
        this.form.id = this.$route.query.id
        this.request(this.api.AddressSave,this.form).then(res => {
          if (res.errno === 0) {
            this.$toast('修改成功')
            this.$back()
            // this.$go('/checkout/address')
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
  #address {
    .cube-radio-group{
      .cube-radio{
        float: left;
      }
    }
    .border-bottom-1px:after {
      display: none;
    }
    .border-right-1px:after, .border-top-1px:before,border-bottom-1px:after {
      display: none;
    }
  }

</style>
<style lang="less" scoped>
  @import '../../static/less/index';
  .cube-select {
    margin-right: 5px;
  }

  .page-header{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88px;
    background: white;
    .header-left{
      position: absolute;
      top:50%;
      left:30px;
      transform: translateY(-50%);
    }
    h3{
      font-size: 30px;
      font-weight: 600;
      color:#333;
    }
    .header-right{
      position: absolute;
      top:50%;
      right:30px;
      transform: translateY(-50%);
      span{
        color:#666;
      }
    }
  }
  .address-update{
    padding:0 43px;
    background: white;
    .update-item{
      position: relative;
      display: flex;
      height: 107px;
      color:#333;
      .item-title{
        display: flex;
        align-items: center;
        flex-basis: 172px;
      }
      .item-text{
        display: flex;
        align-items: center;
        flex:1;
        input{
          border:none;
          outline: none;
        }
      }
      &:not(:last-child) {
        &::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          border-bottom: 1px solid @border-color;
          transform: scaleY(0.5);
        }
      }
    }
  }
</style>
