// miniprogram/pages/searchPage/searchPage.js
const app = getApp();
const db = wx.cloud.database();
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search:"",
    searchDetail:"",
  },
  searchGoods:function(e){
    var search = e.detail.value
      this.setData({
        search:search
      })
  },
  search_goods:function(){
     let that = this;
     let search = that.data.search
     if(search.trim()==""){
      wx.showToast({
        title:"请输入要搜索的内容！",
        icon:"none",
        duration:1500
      })
    }else{
      db.collection('goods').where(_.or([
        { 
              //使用正则查询，实现对搜索的模糊查询
              title:db.RegExp({
                regexp:search,
                //从搜索栏中获取的value作为规则进行匹配。
                options:'i',
                //大小写不区分
              })
        },
        { 
               //使用正则查询，实现对搜索的模糊查询
              lostType:db.RegExp({
                 regexp:search,
                  //从搜索栏中获取的value作为规则进行匹配。
                 options:'i',
                  //大小写不区分
               })
        }, 
        { 
               //使用正则查询，实现对搜索的模糊查询
              AnnouncementType:db.RegExp({
                 regexp:search,
                  //从搜索栏中获取的value作为规则进行匹配。
                 options:'i',
                  //大小写不区分
               })
        },
     ])).field({
              image_url1:true,
              title:true,
              AnnouncementType:true,
              lostType:true,
              newTime:true,
              specificDddress:true,
              browseTimes:true,   
        }).orderBy('newTime','desc').get({
        success:res=>{
          if(res.data!=""){
               that.setData({
              searchDetail:res.data,
            })     

          }else{
               setTimeout(function(){
                wx.showToast({
                   title:'对不起,没找到与'+search+'有关的信息',
                   icon:"none",
                   duration:1500,           
                   })
               },1000); 
            }
         }
      }) 

    } 
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