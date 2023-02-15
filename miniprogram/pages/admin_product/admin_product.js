// pages/admin_product/admin_product.js
const db=wx.cloud.database
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classify:[],
        h_price:0,
        price:0,
        name:"",
        input_specs:"",
        specs:[],
        img:[],
        img_detail:[],
        select_classify:""
        
    },
upload_img(){

},

// 提交
 async submit(){
    let that =this
    let img=that.data.img
    let img_detail=that.data.img_detail
    wx.showLoading({
      title: '上传中',
    })
    for(let i=0;i<img.length;i++){
        var timestamp=new Date().getTime()
        await wx.cloud.uploadFile({
            cloudPath:'product/'+timestamp+''+i+'.png',
            filePath:img[i],
        }).then(async res=>{
            console.log(res.fileID)
            img[i]=res.fileID
            if(i+1==img.length){
                for(let j=0;j<img_detail.length;j++){
                    var timestamp=new Date().getTime()
                    await wx.cloud.uploadFile({
                        cloudPath:'product_detail/'+timestamp+''+i+'.png',
                        filePath:img_detail[j],
                    }).then(res_1=>{
                        console.log(res_1.fileID)
                        img_detail[j]=res_1.fileID
                        if(j+1==img_detail.length){
                            wx.cloud.callFunction({
                                name:"product",
                                data:{
                                    
                                    h_price:that.data.h_price,
                                    price:that.data.price,
                                    name:that.data.name,
                                    specs:that.data.specs,
                                    img:img,
                                    img_detail:img_detail,
                                    select_classify:that.data.select_classify
                                }
                            }).then(res=>{
                                wx.hideLoading({
                                  success: (res) => {},
                                })
                                console.log('',res)
                            })
                        }
                    }).catch(error=>{
            
                    })
                }
            }
        }).catch(error=>{

        })
        
    }


},
    // fenlei
    select_classify(e){
        let that =this
        console.log(e)
        that.setData({
            select_classify:e.detail
        })

    },
// 删除图片
    delete_img(e){
        let that=this
        let index=e.currentTarget.dataset.index
        let name=e.currentTarget.dataset.name
        if(naem=='img'){
            let img=that.data.img
            wx.showModal({
                title:'提示',
                content:'是否删除此图片',
               success(res){
                   if(res.confirm){
                       console.log('确定')
                       img.splice(index,1)
                       that.setData({
                           img:img
                       })
                   }else if(res.cancel){
                       console.log('取消')
    
                   }
                   
               }
            })
        }else{
            let img=that.data.img_detail
        wx.showModal({
            title:'提示',
            content:'是否删除此图片',
           success(res){
               if(res.confirm){
                   console.log('确定')
                   img.splice(index,1)
                   that.setData({
                       img_detail:img
                   })
               }else if(res.cancel){
                   console.log('取消')

               }
               
           }
        })
        }
        
    },
    // 获取分类
get_classify(){
    let that=this
    db.collection('classify').get().then(res=>{
        console.log('获取分类',res.data)
        that.setData({
            classify:res.data
        })
    })
},
    // 添加图片
    add_img(e){
        let that =this
        let name=e.currentTarget.dataset.name
        if(name=='img'){
            let img=that.data.img
            wx.chooseImage({
              count: 9-img.length,
              sizeType:['compressed','original'],
              sourceType:['album','camera'],
              success(res){
                  const tempFilePaths=res.tempFilePaths
                  that.setData({
                      img:img.concat(tempFilePaths)
                  })
              }
            })
        }else{
            let img=that.data.img_detail
            wx.chooseImage({
              count: 9-img.length,
              sizeType:['compressed','original'],
              sourceType:['album','camera'],
              success(res){
                  const tempFilePaths=res.tempFilePaths
                  that.setData({
                    img_detail:img.concat(tempFilePaths)
                  })
              }
            })
        }
        
    } ,

// 添加规格
    add_specs(){
        let that=this
        if(that.data.input_specs){
            let specs=that.data.specs
            specs.push(that.data.input_specs)
            that.setData({
                specs:specs,
                input_specs:""
            })
        }else{
            wx.showToast({
              title: '请输入规格',
              icon:"none"
            })
        }
    },
// 输入shijain 
    input_msg(e){
        let that=this
        let name =e.currentTarget.dataset.name
        if(name=='h_price'||name=='price'){
            that.setData({
                [name]:parseFloat((e.detail.value*1).toFixed(2))
            })
        }else{
            that.setData({
                [name]:e.detail.value
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        that.get_classify
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