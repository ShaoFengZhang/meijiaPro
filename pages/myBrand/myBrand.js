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

    // goToStore
    goToStore: function() {
        wx.navigateTo({
            url: '/pages/storeInfo/storeInfo',
        });
    },

    //goToMyWorks
    goToMyWorks: function() {
        wx.navigateTo({
            url: '/pages/myQr/myQr',
        });
    },

})