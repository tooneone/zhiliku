//  新加接口 杨宏伟
export const getsort = 'goods/getsort' //商品
export const getlilsort = 'goods/getlilsort' //商品
export const goodsdetail = 'goods/goodsdetail' //商品详情
export const queryspecification = 'goods/queryspecification' //商品详情
export const queryProduct = 'goods/queryProduct' //商品详情
export const getkeyword = 'goods/getkeyword' //商品详情
export const merchantGoods = 'goods/getmerchantgoods' //商家商品列表
export const merchantInfo = 'goods/getmerchant' //商家信息
export const OrderList = 'order/list' //订单列表
export const Orderetail = 'order/detail' //订单详情D
export const getgoods = 'order/getgoods' //获取订单商品信息
//新加接口 金晗汝
export const buy = 'buy/add' //直接购买
export const getProvince = 'region/provinceList' //获取省
export const getCity = 'region/cityList' //获取市区
export const getDistinct = 'region/distinctList' //获取区
export const collect = 'collect/addordelete' //是否收藏
export const getCollectList = 'collect/list' //收藏列表
export const getAddressDefault = 'address/querydefault' //获取默认地址
//王鹏
export const wxPay = 'wxpay/unifiedorder' //微信支付
export const alipay = 'alipay/gateway' //支付宝支付




export const IndexUrlNewGoods = 'index/newGoods' //新品首发
export const IndexUrlHotGoods = 'index/hotGoods' //热卖商品
export const IndexUrlTopic = 'index/topic' //专题精选
export const IndexUrlBrand = 'index/brand' //品牌制造商
export const IndexUrlCategory = 'index/category' //首页底部的分类及商品列表
export const IndexUrlBanner = 'index/banner' //首页banner
export const IndexUrlChannel = 'index/channel' //banner下的分类
export const CatalogList = 'catalog/index' //分类目录全部分类数据接口
export const CatalogCurrent = 'catalog/current' //分类目录当前分类数据接口

export const GoodsCount = 'goods/count' //统计商品总数
export const GoodsList = 'goods/list' //获得商品列表
export const GoodsCategorys = 'goods/category' //获得分类数据
export const GoodsCategory = 'goods/index' //获得分类数据
export const GoodsDetail = 'goods/detail' //获得商品的详情
export const GoodsHot = 'goods/hot' //人气推荐
export const GoodsRelated = 'goods/related' //商品详情页的关联商品（大家都在看）

export const BrandList = 'brand/list' //品牌列表
export const BrandDetail = 'brand/detail' //品牌详情

export const CartList = 'cart/index' //获取购物车的数据
// export const CartList = 'cart/update' //获取购物车的数据
export const CartAdd = 'cart/add' // 添加商品到购物车 /*金含汝*/
export const CartMinus = 'cart/minus' // 添加商品到购物车 /*金含汝*/
export const BuyAdd = 'buy/add' // 直接购买
// export const CartUpdate = 'cart/update' // 更新购物车的商品
export const CartDelete = 'cart/delete' // 删除购物车的商品
export const addressDelete = 'address/delete' // 删除地址信息

export const CartChecked = 'cart/checked' // 选择或取消选择商品
export const CartGoodsCount = 'cart/goodscount' // 获取购物车商品件数
export const CartCheckout = 'cart/checkout' // 下单前信息确认

export const OrderSubmit = 'order/submit' // 提交订单
export const PayPrepayId = 'pay/prepay' //获取微信统一下单prepay_id

export const CollectList = 'collect/list' //收藏列表
export const CollectAddOrDelete = 'collect/addordelete' //添加或取消收藏

export const CommentList = 'comment/list' //评论列表
export const CommentCount = 'comment/count' //评论总数
export const CommentPost = 'comment/post'  //发表评论

export const TopicList = 'topic/list' //专题列表
export const TopicDetail = 'topic/detail' //专题详情
export const TopicRelated = 'topic/related' //相关专题

export const SearchIndex = 'search/index' //搜索页面数据
export const SearchHelper = 'search/helper' //搜索帮助
export const SearchClearHistory = 'search/clearhistory' //搜索帮助

export const AddressList = 'address/list' //收货地址列表
export const AddressDetail = 'address/detail' //收货地址详情
export const AddressSave = 'address/save' //保存收货地址
export const AddressDelete = 'address/delete' //删除收货地址

export const RegionList = 'rergion/list' //获取区域列表

// export const OrderList = 'order/list' //订单列表
export const OrderDetail = 'order/detail' //订单详情
export const OrderCancel = 'order/cancelOrder' //取消订单
export const OrderConfirm = 'order/confirmOrder' //确认收货

export const FootprintList = 'footprint/list' //足迹列表
export const FootprintDelete = 'footprint/delete' //删除足迹

export const FeedbackAdd = 'feedback/save' //添加反馈
export const SmsCode = 'user/smscode' //发送短信
export const BindMobile = 'user/bindMobile' //绑定手机
export const Login = 'auth/login' //账号登录
export const Register = 'auth/register' //注册
export const CouponList = 'coupon/list' // 优惠券列表
export const GoodsCouponList = 'coupon/listByGoods' // 商品优惠券列表
export const OrderQuery = 'pay/query' //微信查询订单状态
export const community = 'community/queryList' // 社区查询
