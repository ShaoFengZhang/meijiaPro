const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        weixin: "bxz201809",
        ifShowMask:false,
        weixinSrc: LoginFunc.srcDomin +'Public/mimg/my/60b570b85a63d9b4ab32399cdf7c10d.jpg',
    },

    onLoad: function(options) {

    },

    onShow: function() {

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

    showMask:function(){
        this.setData({
            ifShowMask: !this.data.ifShowMask,
        })
    },

    // 保存图片
    savePicture: function() {
        let _this = this;
        wx.getImageInfo({
            src: `${_this.data.weixinSrc}`,
            success(res) {
                console.log(res.path);
                let path = res.path;
                
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: function() {
                        wx.previewImage({
                            urls: [path]
                        });
                    },
                    fail: function() {
                        wx.previewImage({
                            urls: [path]
                        })
                    }
                })
            }
        })
    },

    // 复制微信号
    copyText: function() {
        wx.setClipboardData({
            data: this.data.weixin,
            success(res) {
                wx.hideToast();
                util.showToastFun('复制成功 加群领VIP')
            }
        })
    }
})