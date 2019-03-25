const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        domin: LoginFunc.srcDomin,
        ifShowView: 0,
        userQr: '',
        imgUrls: [

        ],
    },

    onLoad: function(options) {
        this.setData({
            // ScrollHeight: app.windowHeight * 750 / app.sysWidth - 262,
            scrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 360,
        });
        this.getData();
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
        let _this = this;
        let getDataUrl = LoginFunc.domin2 + 'dosample';
        let data = {
            "uid": wx.getStorageSync('u_id'),
            "openid": wx.getStorageSync('user_openID'),
        }
        LoginFunc.wxRequest(app, getDataUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    imgUrls: res.sample,
                    ifShowView: 1,
                })
            }else{
                _this.setData({
                    ifShowView: 1,
                }) 
            }
        })
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
                        url: LoginFunc.domin2 + 'sample',
                        filePath: tempFilePaths[i],
                        name: 'sample',
                        formData: {
                            "uid": wx.getStorageSync('u_id'),
                            "openid": wx.getStorageSync('user_openID'),
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function(res) {
                            console.log(res);
                            let data = JSON.parse(res.data);
                            if (data.status == 1) {
                                hasCount++;
                                //如果是最后一张,则隐藏等待中  
                                if (hasCount == upImgCount) {
                                    wx.hideToast();
                                    _this.getData();
                                }
                            } else {
                                wx.hideToast();
                                wx.showModal({
                                    title: '错误提示',
                                    content: '上传图片失败',
                                    showCancel: false,
                                    success: function(res) {}
                                });
                                _this.getData();
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
                            });
                            _this.getData();
                        }
                    });
                }

            }
        });
    }
})