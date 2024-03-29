//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:"cloud1-89f52d",
        traceUser: true,
      })
    }
    //调用云函数login
    wx.cloud.callFunction({
      name:'login',
      data:{},
      success:res=>{
        console.log('[云函数] [login] user openid: ', res.result.openid);
        this.globalData.openid =res.result.openid;
      },
      fail:err=>{
         console.log('[云函数] [login] 调用失败', err); 
      } 
    })
    this.globalData = {}
  }
})
