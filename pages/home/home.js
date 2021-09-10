import request from '../../service/network.js'

Page({
  data:{
    message:11,
    list:[],
    imagepath:''
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
  onLoad:() =>{
    request({
      url:'http://152.136.185.210:7878/api/m5/home/data?type=pop&page=1'
    }).then(res =>{
      console.log(res);
    }).catch(err =>{
      console.log(err);
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
