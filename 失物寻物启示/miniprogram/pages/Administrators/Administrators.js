// miniprogram/pages/Administrators/Administrators.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     hasGoods:false,
     classify:["寻物启事","失物招领"],
     change_classify:0,
     goodsLost:"",
     goodsFound:"",
  },
    //获取手机屏幕的高度
    getSystemInfo:function(){
      var that = this
      wx.getSystemInfo({
        success:function(res){
          that.setData({
            windowHeight:res.windowHeight + 20
          })
        } 
      })
    
    },
    formSubmit:function(e){
      var that =  this;
      var manager = e.detail.value.manager
      var upwd = e.detail.value.upwd
       if(manager==""){
         wx.showToast({
           title:"账号不能为空！",
           icon:"none",
           duration:1500
         })
         return
       }
       if(upwd==""){
         wx.showToast({
           title:"密码不能为空！",
           icon:"none",
           duration:1500
         })
         return
       }
      db.collection('manager').where({
        uname:manager,
        upwd:upwd 
      }).get({
         success:res=>{
            if(res.data.length==0){
              wx.showToast({
                title:"账号或者密码不正确",
                duration:1500,
                icon:"none",
              })
            }else{
             wx.showLoading({
               title:"正在登陆中..."
             }) 
            setTimeout(function(){
             wx.hideLoading()
              wx.showToast({
                title:"登陆成功",
                duration:1500,
                success:function(res){
                  setTimeout(function(){
                    wx.setStorage({
                      key:"hasGoods",
                      data:true,
                      success:function(res){
                        console.log(res);
                        that.setData({
                          hasGoods:true
                        })
                      }
                    })
                  },1500)
                }
              })
             },1500)  
           }
         }
      })
   
     },
  get_Storage:function(){
    let that = this
     wx.getStorage({
       key:"hasGoods",
       success:res=>{
         console.log(res)
         that.setData({
           hasGoods:res.data
         })
       }
     })
  },
  change_classify:function(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      change_classify:index
    })
 },
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

  deleteGood:function(e){
    let that = this;
    let _id = e.currentTarget.dataset.id;
   wx.showModal({
      title:"确定要删除该信息吗",
      confirmColor:'#27C79A',
      success:res=>{
        if(res.confirm){
          setTimeout(function(){
           wx.cloud.callFunction({
            name:'manager',
            data:{
              type:"DeteleGood",
              data:{
                _id:_id 
              },
             },
              success:res=>{
                console.log(res);
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000,
                  success:function(res){
                     setTimeout(function(){
                      that.get_goodsLost();
                      that.get_goodsFound();
                     },1000)
                  }
                });
              },
              fail:err=>{
                console.log(err);
              }           
         })
        },1500)
       }
      }
    }) 
    
  },

  logout:function(){
    let that = this;
    wx.showModal({
      title:"确定要退出管理？",
      confirmColor:'#27C79A',
      success:res=>{
        if(res.confirm){
          wx.removeStorage({
            key: 'hasGoods',
          success: function(res) {
            console.log(res)
            that.setData({
              hasGoods:false
            })
          },
     })
    }
   }
  }) 
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getSystemInfo();
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
    this.get_Storage();
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