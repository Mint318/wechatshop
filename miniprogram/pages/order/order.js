// pages/order/order.js\
const db =wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        titile:"已付款",
        order:[],
        type:""
    },
// 获取订单
get_order(type){
    let that=this
    wx.showLoading({
      title: '获取订单中',
    })
    db.collection('order').where({
        type:type
    }).orderBy('time','desc').get().then(res=>{
        wx.hideLoading({
        })
        console.log('获取订单中',res.data)
    }).catch(err=>{
        wx.hideLoading({
            success: (res) => {},
          })
        console.log('获取订单中失败',res.data)
    })
},
    // 选择订单
select_titile(e){
    let that =this
    let name=e.currentTarget.dataset.name
    that.setData({
        titile:name
    })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        that.setData({
            titile:options.type
        })
        that.get_order('options.type')
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