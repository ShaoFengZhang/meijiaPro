const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        userQr: '',
        imgUrls: [
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png',
            '/assets/picture/indexBanner1.png'
        ],
    },

    onLoad: function(options) {
        this.setData({
            // ScrollHeight: app.windowHeight * 750 / app.sysWidth - 262,
            scrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 360,
        });
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

    // getData:
    getData: function() {

    },

    //上传图片
    upLoadImage: function() {
        const _this = this;
        wx.chooseImage({
            count: 10,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function(res) {
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                });
                let tempFilePaths = res.tempFilePaths;
                let upImgCount = tempFilePaths.length;
                let hasCount = 0;
                for (let i = 0; i < upImgCount; i++) {
                    wx.uploadFile({
                        url: util.getClientSetting().domainName + '/home/uploadfilenew',
                        filePath: tempFilePaths[i],
                        name: 'uploadfile_ant',
                        formData: {
                            'imgIndex': 0
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function(res) {
                            if (res.status == 1) {
                                hasCount++;
                                var data = JSON.parse(res.data);
                                //如果是最后一张,则隐藏等待中  
                                if (hasCount == upImgCount) {
                                    wx.hideToast();
                                    _this.getData();
                                }
                            }else{
                                wx.hideToast();
                                wx.showModal({
                                    title: '错误提示',
                                    content: '上传图片失败',
                                    showCancel: false,
                                    success: function (res) { }
                                });
                                return; 
                            }

                        },
                        fail: function(res) {
                            wx.hideToast();
                            wx.showModal({
                                title: '错误提示',
                                content: '上传图片失败',
                                showCancel: false,
                                success: function(res) {}
                            })
                        }
                    });
                }

            }
        });
    }
})