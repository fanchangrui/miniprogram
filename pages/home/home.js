
import {getMultData,getGoodsData} from '../../service/home.js'

const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000;
Page({
  data:{
    banners:[],
    recommends:[],
    titles:['流行','新款','精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    currentType:'pop',
    showBackTop: false,
    isTabFixed:false,
    tabScrollTop: 0
  },
  select(){
    wx.chooseImage({
      success:(res) =>{
        const path =res.tempFilePaths
        this.setData({
          imagepath:path
        })
      }
    })
  },
  onLoad: function (options) {
    // 1.请求轮播图以及推荐数据
    this._getMultdata()

    // 2.请求商品数据
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')
  },
  _getMultdata() {
    getMultData().then(res => {
      // 取出轮播图和推荐的数据
      const banners = res.data.banner.list;
      const recommends = res.data.recommend.list;

      // 将banners和recommends放到data中
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    // 1.获取页码
    const page = this.data.goods[type].page + 1;

    // 2.发送网络请求
    getGoodsData(type, page).then(res => {
      // console.log(res)
      // 2.1.取出数据
      const list = res.data.list;

      // 2.2.将数据设置到对应type的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)

      // 2.3.将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  show(){
    wx.showModal({
      title: 'title',
      duration:3000,
      icon:'loading',
      complete:()=>{
        console.log('完成');
      }
    })
  },
  handleTabClick(event){
    const index = event.detail.index
    
    this.setData({
      currentType: types[index]
    })
  },
  onShareAppMessage:(result) => {
    
  },
  onReachBottom(){
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(options) {
    // 1.取出scrollTop
    const scrollTop = options.scrollTop;
    // console.log(scrollTop)

    // 2.修改showBackTop属性

    const flag1 = scrollTop >= TOP_DISTANCE;
    if (flag1 != this.data.showBackTop) {
      this.setData({
        showBackTop: flag1
      })
    }
    const flag2 = scrollTop >= this.data.tabScrollTop
    if(flag2!=this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  },
  handleImageLoad(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec()
  }

})
