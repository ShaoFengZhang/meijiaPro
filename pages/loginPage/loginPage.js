const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
    },

    onLoad: function (options) {
        wx.getSystemInfo({
            success(res) {
                // console.log(res);
                app.pix = res.pixelRatio;
                app.windowHeight = res.windowHeight;
                app.windowwidth = res.windowWidth;
                app.sysWidth = res.windowWidth;
                app.Bheight = res.screenHeight - res.windowHeight - res.statusBarHeight - 44;
            }
        });
    },

    onShow: function () {

    },

    // 获取用户信息
    getUserInfo: function (e) {
        console.log(e);
        if (e && e.detail.userInfo) {
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });
            let iv = e.detail.iv;
            let encryptedData = e.detail.encryptedData;
            let session_key = app.globalData.session_key;
            LoginFunc.checkUserInfo(app, e.detail, iv, encryptedData, session_key);
            wx.navigateBack({
                delta: 1
            })
            console.log(`${this.backPath}`)
        } else {
            util.showToastFun('我们需要您的授权哦~');
        }
    },

})