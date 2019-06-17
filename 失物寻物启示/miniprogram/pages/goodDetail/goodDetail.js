// miniprogram/pages/goodDetail/goodDetail.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodDetail:"",
    imageUrl_length:0,
  },
  get_goodDetail:function(_id){
     var that = this;
     db.collection('goods').where({
        _id:_id
     }).get({
       success:res=>{
         that.setData({
          goodDetail:res.data[0],
          imageUrl_length:res.data[0].image_url.length
         })
         console.log(res.data);
         console.log(res.data[0].image_url.length);
       },
       fail:err=>{
         console.log(err);
       }
     }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let _id = options._id
      this.get_goodDetail(_id);
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

  },
   // 预览图片
 previewImg: function (e) {
  //获取当前图片的下标
 var index = e.currentTarget.dataset.index;
  //所有图片
 var  image_url = this.data.goodDetail.image_url;
 wx.previewImage({
  //当前显示图片
  current:  image_url[index],
  //所有图片
  urls:image_url
 })
},
callPhone:function(){
  wx.makePhoneCall({
    phoneNumber:this.data.goodDetail.telephone,
  })
}
})