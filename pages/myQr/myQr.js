const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        userQr:'',
    },

    onLoad: function (options) {

    },

    onShow: function () {

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
    
    //上传图片
    upLoadImage: function () {
        const _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 10000
                })
                wx.uploadFile({
                    url: util.getClientSetting().domainName + '/home/uploadfilenew',
                    filePath: tempFilePaths[0],
                    name: 'uploadfile_ant',
                    formData: {
                        'imgIndex': 0
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function (res) {
                        var data = JSON.parse(res.data);
                        //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
                        var productInfo = that.data.productInfo;
                        if (productInfo.bannerInfo == null) {
                            productInfo.bannerInfo = [];
                        }
                        productInfo.bannerInfo.push({
                            "catalog": data.Catalog,
                            "fileName": data.FileName,
                            "url": data.Url
                        });
                        that.setData({
                            userQr: productInfo
                        });

                        //如果是最后一张,则隐藏等待中  
                        wx.hideToast();

                    },
                    fail: function (res) {
                        wx.hideToast();
                        wx.showModal({
                            title: '错误提示',
                            content: '上传图片失败',
                            showCancel: false,
                            success: function (res) { }
                        })
                    }
                });
            }
        });
    }
})