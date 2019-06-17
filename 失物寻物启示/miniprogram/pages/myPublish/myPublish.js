// miniprogram/pages/myPublish/myPublish.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPublish:"",
  },
 
  get_myPublish:function(){
    db.collection('goods').where({
       _openid:app.globalData.openid
    }).field({
      image_url1:true,
      title:true,
      AnnouncementType:true,
      lostType:true,
      newTime:true,
      specificDddress:true,
      browseTimes:true,
    }).orderBy('newTime','desc').get({
      success:res=>{
         this.setData({
           myPublish:res.data
         })
      },
      fail:err=>{
        console.log(err);
      }
    })
  },

  go_goodDetail:function(e){
    let _id = e.currentTarget.dataset.id;
    let browseTimes = e.currentTarget.dataset.browse;
        browseTimes = browseTimes + 1;
   wx.cloud.callFunction({
      name:"manager",
      data:{
        type:"addBrowseTimes",
        data:{
          browseTimes:browseTimes,
          _id:_id
        }
      },
      success:res=>{
        console.log(res);
      },
      fail:err=>{
        console.log(err);
      }
    })  
    wx.navigateTo({
      url:"../goodDetail/goodDetail?_id="+_id
    })
    
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_myPublish();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})