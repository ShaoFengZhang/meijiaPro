const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {

    },

    onLoad: function (options) {
        this.setData({
            // classScrollHeight: app.windowHeight * 750 / app.sysWidth - 416,
            classScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 64,
        })
    },

    onShow: function () {

    },

    onPullDownRefresh: function () {

    },

    // 分享
    onShareAppMessage: function (e) {
        let title = "点击查看";
        let path = `/pages/index/index`;
        return {
            title: title,
            path: path,
        }
    },
})