// miniprogram/pages/center/center.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    userInfo:{},
    logged:false,
  },
denglu_user:function(){
    var that = this
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success:res => {
              that.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged:true,           
              })
            }
          })
        }
      }
    })
  },
 onGetUserInfo: function(e) {
    if (this.data.logged==false && e.detail.userInfo ) {
      this.setData({
        logged:true,
        avatarUrl:e.detail.userInfo.avatarUrl,
        userInfo:e.detail.userInfo
      })
    }
  }, 
  
  go_myPublish:function(){
      wx.navigateTo({
        url:"../myPublish/myPublish"
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.denglu_user();
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