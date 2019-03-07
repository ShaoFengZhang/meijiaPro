import LoginFunc from './utils/Login.js';
const ald = require('./utils/ald-stat.js');
App({

    onLaunch: function() {
        let _this = this;
        wx.getSystemInfo({
            success(res) {
                // console.log(res);
                _this.pix = res.pixelRatio;
                _this.windowHeight = res.windowHeight;
                _this.windowwidth = res.windowWidth;
                _this.sysWidth = res.windowWidth;
                _this.Bheight = res.screenHeight - res.windowHeight - res.statusBarHeight - 44;
            }
        });
        LoginFunc.wxloginfnc(this);

        // 强制更新
        const updateManager = wx.getUpdateManager();

        updateManager.onCheckForUpdate(function(res) {
            console.log(res.hasUpdate)
        })
        
        updateManager.onUpdateReady(function() {
            wx.showModal({
                title: '更新提示',
                content: '版本更新啦，立即试用~',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate()
                    }
                }
            })
        })

        updateManager.onUpdateFailed(function() {
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false
            })
        })
    },

    onShow: function(options) {
        let _this = this;
    },

    globalData: {
        userInfo: null,
        appid: "wx85eda00af5df13ed",
    }
})