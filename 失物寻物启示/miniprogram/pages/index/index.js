//index.js
const app = getApp()
const db = wx.cloud.database();

Page({
   /**
   * 页面的初始数据
   */
  data: {
    lunbo:[
      { imagepath: "cloud://cloud1-89f52d.636c-cloud1-89f52d/image/lunbo1.jpg", },
      { imagepath: "cloud://cloud1-89f52d.636c-cloud1-89f52d/image/lunbo2.jpg", },
      { imagepath: "cloud://cloud1-89f52d.636c-cloud1-89f52d/image/lunbo3.jpg", },
      { imagepath: "cloud://cloud1-89f52d.636c-cloud1-89f52d/image/lunbo4.jpeg", },
      ],
    classify:["寻物启事","失物招领"],
    change_classify:0,
    goodsLost:"",
    goodsFound:"",
  },

  change_classify:function(e){
     let index = e.currentTarget.dataset.index;
     this.setData({
       change_classify:index
     })
  },
  //获取数据库 lunbo的集合
  //get_lunbo:function(){
  //  let that = this
  //  db.collection('lunbo').get({
  //    success:res=>{
  //       that.setData({
  //         lunbo:res.data
  //       }) 
  //    },
  //    fail:err=>{
  //       console.log(err);
  //    }
  //  })
  //},

     //获取数据库 goods集合的 寻物启事
     get_goodsLost:function(){
      let that = this
      wx.cloud.callFunction({
        name:"manager",
        data:{
          type:"goodsLost",
          data:{
           
          }
        },
        success:res=>{
          console.log(res)
          if(res.result.goodsLost.data!=0){
          that.setData({
            goodsLost:res.result.goodsLost.data
          })
         } 
        },
        fail:err=>{
          console.log(err)
        }
      })
   
    },
    get_goodsFound:function(){
      let that = this
      wx.cloud.callFunction({
        name:"manager",
        data:{
          type:"goodsFound",
          data:{     
          }
        },
        success:res=>{
          if(res.result.goodsFound.data!=0){
          that.setData({
            goodsFound:res.result.goodsFound.data
          })
         }
        },
        fail:err=>{
          console.log(err)
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

  go_search:function(){
    wx.navigateTo({
      url:"../searchPage/searchPage"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.get_goodsLost();
     this.get_goodsFound();
  
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
    this.get_goodsLost();
    this.get_goodsFound();
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
    console.log(22222222)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


})




