// miniprogram/pages/publish/publish.js
var util = require('../../utils/utils.js');
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon:false,
    newTime:"",
    image_url:[],
    arrayLmage:[],
    fileList:"",
    title:"",
    lostType:"",
    specificDddress:"",
    goodDetail:"",
    contacts:"",
    telephone:"",
    array:["请选择","衣服","饰品","伞","卡","钱财","电子设备","包","书本","其他"],
    array_index:0,
  },
  bindPickerChange:function(e){
    this.setData({
      array_index: e.detail.value,
    })
  },

  selecticon:function(){
    let icon = !this.data.icon
    this.setData({
      icon:icon
    })
  },
  formSubmit:function(e){
    let that = this;
    let title = e.detail.value.title;
    let icon = that.data.icon;
    let lostType = e.detail.value.lostType
    let newTime = that.data.newTime;
    console.log(newTime)
    let specificDddress = e.detail.value.specificDddress
    let goodDetail = e.detail.value.goodDetail
    let contacts = e.detail.value.contacts
    let telephone = e.detail.value.telephone
    let image_url = this.data.image_url;
    let image_url1 = this.data.image_url[0]
    let re = /^1\d{10}$/;
    if(icon==false){
      var AnnouncementType = "寻物启事"
    }else{
      var AnnouncementType = "失物招领"
    }

    if(title.trim()==""){
      wx.showToast({
        title:"标题不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(lostType.trim()=="" || lostType=="请选择"){
      wx.showToast({
        title:"失物类别不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(specificDddress.trim()==""){
      wx.showToast({
        title:"具体地址不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(contacts.trim()==""){
      wx.showToast({
        title:"联系人不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(telephone.trim()==""){
      wx.showToast({
        title:"联系电话不能为空",
        icon:"none",
        duration:2000
      })
      return
    }
    if(re.test(telephone)==false){
      wx.showToast({
        title:"请输入正确的11位手机号码！",
        icon:"none",
        duration:1500
      })
      return
    }
    if(image_url==""){
      wx.showToast({
        title:"至少上传一张图片",
        icon:"none",
        duration:2000
      })
      return
    }

    wx.showLoading({
      title:'发布中',
    })
    //把数据存入云数据库
    db.collection('goods').add({
      data:{
         title:title,
         AnnouncementType:AnnouncementType,
         lostType:lostType,
         newTime:newTime,
         specificDddress:specificDddress,
         goodDetail:goodDetail,
         contacts:contacts,
         telephone:telephone,
         image_url:image_url,
         browseTimes:0,
         image_url1:image_url1,
      },
      success:res=>{
        setTimeout(function(){
           wx.hideLoading()
           wx.showToast({
             title:"发布成功!",
             duration:2000,
             success:function(){
               setTimeout(function(){
                wx.switchTab({
                  url:"../index/index"
                })
               that.setData({
                title:"",
                lostType:"",
                specificDddress:"",
                goodDetail:"",
                contacts:"",
                telephone:"",
                image_url:"",
                image_url1:"",
               }) 
               console.log(666666666)
               },1500)
             }         
          })     
       },2000) 
      }
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
    var time = util.formatTime(new Date());
    this.setData({
     newTime:time
    })
    console.log(time);
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
  uploadFile:function(){
    let that = this
    let arrayLmage = that.data.arrayLmage
    let image_url = that.data.image_url
      // 让用户选择图片
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success:chooseResult => {
       console.log(chooseResult);
       arrayLmage = arrayLmage.concat(chooseResult.tempFilePaths)
        wx.showLoading({
          title:'上传中',
        })
      for(var i=0;i<arrayLmage.length; i++){       
            // 将图片上传至云存储空间
            const filePath =chooseResult.tempFilePaths[i]
            const cloudPath = 'image/' + filePath.slice(11)
            wx.cloud.uploadFile({
              // 指定上传到的云路径
              cloudPath,
              // 指定要上传的文件的小程序临时文件路径
              filePath: chooseResult.tempFilePaths[i],
              // 成功回调
              success: res => {
                console.log(res);
               image_url =  image_url.concat(res.fileID)
                that.setData({
                   image_url:image_url
                })
                console.log(image_url)
                wx.cloud.getTempFileURL({
                  fileList:image_url,
                  success: res => {
                    // get temp file URL
                    that.setData({
                     fileList:res.fileList 
                    })
                  },
                  fail: err => {
                    // handle error
                  }
                })
              },
              fail: e => {
                console.error('[上传文件] 失败：', e)
                wx.showToast({
                  icon: 'none',
                  title: '上传失败',
                })
              },
              complete: () => {
                wx.hideLoading()
                wx.showToast({
                  title:"上传成功",
                  duration:1500
                })
              }
            })
      }       
    },
    })
  },
   // 删除图片
 deleteImg: function (e) {
  var image_url = this.data.image_url;
  var index = e.currentTarget.dataset.index;
  image_url.splice(index, 1);
  this.setData({
    image_url:image_url
  });
 },
 // 预览图片
 previewImg: function (e) {
   //获取当前图片的下标
  var index = e.currentTarget.dataset.index;
   //所有图片
  var  image_url = this.data. image_url;
  wx.previewImage({
   //当前显示图片
   current:  image_url[index],
   //所有图片
   urls:image_url
  })
 },
})