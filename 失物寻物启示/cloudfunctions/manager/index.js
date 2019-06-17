// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db =cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const { type, data } = event;
  switch (type) {
    case 'DeteleGood':{
      const { _id } = data
      const result =  await db.collection('goods').doc(_id).remove() ;

      return {
          result
       }      
    }
   case 'goodsLost':{
     const goodsLost = await db.collection('goods').where({
      AnnouncementType:"寻物启事"
     }).field({
      image_url1:true,
      title:true,
      AnnouncementType:true,
      lostType:true,
      newTime:true,
      specificDddress:true,
      browseTimes:true,
    }).orderBy('newTime','desc').get(); 
     
     return {
      goodsLost
     }
   }
   case 'goodsFound':{
    const goodsFound = await db.collection('goods').where({
     AnnouncementType:"失物招领"
    }).field({
     image_url1:true,
     title:true,
     AnnouncementType:true,
     lostType:true,
     newTime:true,
     specificDddress:true,
     browseTimes:true,
   }).orderBy('newTime','desc').get(); 
    
    return {
      goodsFound
    }
  }
 
case 'addBrowseTimes':{
   const { _id, browseTimes } = data
   const browse = await db.collection('goods').doc(_id).update({
     data:{
      browseTimes:browseTimes 
     }
   })

   return {
      browse
   }
 }  
    
      
  } 
}