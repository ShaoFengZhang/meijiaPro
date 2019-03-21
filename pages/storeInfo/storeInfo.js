const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {

    },

    onLoad: function(options) {

    },

    onShow: function() {

    },

    // 分享
    onShareAppMessage: function(e) {
        let title = "点击查看";
        let path = `/pages/index/index`;
        return {
            title: title,
            path: path,
        }
    },

    // 获取电话号码
    getPhoneNumber: function(e) {
        console.log(e);
    },

    // 获取地址
    getAddressFun: function() {
        let _this=this;
        wx.chooseLocation({
            success(res) {
                console.log(res);
                _this.setData({
                    address: res.address, 
                })
            }
        })
    },
})