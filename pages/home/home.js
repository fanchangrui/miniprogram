
import {getMultData} from '../../service/home.js'
Page({
  data:{
    banners:[],
    recommends:[]
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
  onLoad:function(options){
    getMultData().then(res => {
      // 取出轮播图和推荐的数据
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;

      // 将banners和recommends放到data中
      this.setData({
        banners,
        recommends
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
  onShareAppMessage:(result) => {
    
  }

})
