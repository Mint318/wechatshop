// pages/cate/cate.js
// import Notify from '@vant/weapp/dist/notify/notify';
const app=getApp()
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        tehui_list:{},
        active: 0,
        shangxin_list:{},
        pro_list:{},
    },
   
    onChange(event) {
        this.setData({ active: event.detail });
      },

   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this
        db.collection('tehui').get({
            success:res=>{
                console.log('获取成功',res)
                this.setData({
                    tehui_list:res.data
                })
            },fail:err=>{
                console.log('获取失败',err)
            }
        })
        db.collection('shangxin').get({
            success:res=>{
                console.log('获取成功',res)
                this.setData({
                    shangxin_list:res.data
                })
            },fail:err=>{
                console.log('获取失败',err)
            }
        })
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