const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        imgSrc: '',
    },

    onLoad: function(options) {
        this.setData({
            imgW: ((app.windowHeight + app.Bheight) * 750 / app.sysWidth - 386) * (25 / 41),
        });
        if (options && options.urlSrc) {
            this.setData({
                imgSrc: options.urlSrc,
                imgNum: options.urlNum,
                imgId: options.urlid
            })
        }

    },

    onShow: function() {

    },

    onHide: function() {

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

    // 查看扫码人员
    howPeopleCheck: function() {
        util.showToastFun('程序猿加班开发中~')
    },

    // 保存图片
    savePicture: function() {
        let _this = this;
        wx.getImageInfo({
            src: this.data.imgSrc,
            success(res) {
                console.log(res.path);
                let path = res.path;
                wx.hideToast();
                wx.saveImageToPhotosAlbum({
                    filePath: path,
                    success: function() {
                        wx.showModal({
                            title: '保存成功',
                            content: `快去分享吧~`,
                            showCancel: false,
                            success: function(data) {
                                wx.previewImage({
                                    urls: [path]
                                })
                            }
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

})