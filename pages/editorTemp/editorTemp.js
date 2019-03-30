const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        showPicOptions: false,
        showPopUpQrView: false,
        nowTempSrc: '',
        myTempArr: ['/assets/picture/logo.png','/assets/picture/logo.png', '/assets/picture/logo.png','/assets/picture/logo.png','/assets/picture/logo.png'],
    },

    onLoad: function(options) {
        console.log(options);
        if (options && options.urlID) {
            this.mid = options.urlID;
            this.setData({
                nowTempSrc: options.urlSrc
            })
        };
        this.ifWithQr = true;
        this.getPosterQrTemp();
    },

    onShow: function() {

    },

    onHide: function() {

    },

    onUnload: function() {

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

    // 选择什么方式弹窗
    popUpWin: function() {
        this.setData({
            showPicOptions: !this.data.showPicOptions,
        })
    },

    // 上传二维码弹窗
    popUpQr: function() {
        this.setData({
            showPopUpQrView: !this.data.showPopUpQrView,
            showPicOptions: false,
        })
    },

    // 保存照片
    savePicture: function() {
        let _this = this;
        this.saveImage();
        wx.getImageInfo({
            src: this.ifWithQr ? `${this.data.posterQrTempSrc}` : `${_this.data.nowTempSrc}`,
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

    //从手机相册上传图片二维码
    upLoadImage: function() {
        const _this = this;
        this.ifWithQr = false;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function(res) {
                _this.setData({
                    showPopUpQrView: !_this.data.showPopUpQrView,
                    showPicOptions: false,
                })
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths[0]);
                util.showLoadFun('正在上传');
                wx.uploadFile({
                    url: LoginFunc.domin + 'doUploadImage',
                    filePath: tempFilePaths[0],
                    name: 'image',
                    formData: {
                        'openid': wx.getStorageSync('user_openID'),
                        'mid': _this.mid,
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(res) {
                        console.log(res);
                        wx.hideLoading();
                        if (res.data) {
                            var data = JSON.parse(res.data);
                            if (data.status == 1) {
                                _this.setData({
                                    showPicOptions: false,
                                    nowTempSrc: LoginFunc.srcDomin + data.newimg,
                                    nowNewImg: data.newimg,
                                    oldimgSrc: data.oldimage,
                                    newimgid: data.newimgid,
                                })
                            } else {
                                util.showToastFun("上传失败,重新上传")
                            }
                        } else {
                            util.showToastFun("上传失败,重新上传")
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
        });
    },


    // upLoadHaveImage 上传已有二维码
    upLoadHaveImage:function(e){
        const _this = this;
        this.ifWithQr = false;
        let src=e.currentTarget.dataset.src
        _this.setData({
            showPopUpQrView: !_this.data.showPopUpQrView,
            showPicOptions: false,
        });
    },

    // 使用海报而二维码
    usePosterQr: function() {
        this.ifWithQr = true;
        this.setData({
            showPicOptions: !this.data.showPicOptions,
            nowTempSrc: this.data.posterQrTempSrc ? this.data.posterQrTempSrc : this.data.nowTempSrc
        })
    },

    // 得到海报二维码模板
    getPosterQrTemp: function() {
        let _this = this;
        let getPosterQrTempUrl = LoginFunc.domin + 'dohbimage';
        let data = {
            'openid': wx.getStorageSync('user_openID'),
            'mid': _this.mid,
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getPosterQrTempUrl, "POST", data, function(res) {
            if (res.status == 1) {
                _this.setData({
                    posterQrTempSrc: LoginFunc.srcDomin + res.newimg,
                    postNewImg: res.newimg,
                    oldimgSrc: res.oldimage,
                    newimgid: res.newimgid,
                })
            } else {
                // _this.getPosterQrTemp();
            }
        })
    },

    //保存模板
    saveImage: function() {
        let _this = this;
        let saveImageUrl = LoginFunc.domin + 'saveImage';
        let data = {
            'openid': wx.getStorageSync('user_openID'),
            'id': _this.mid,
            "newimg": this.ifWithQr ? `${this.data.postNewImg}` : `${_this.data.nowNewImg}`,
            "oldimage": this.data.oldimgSrc,
            "newimgid": this.data.newimgid,
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, saveImageUrl, "POST", data, function(res) {
            if (res.status == 1) {
                _this.setData({
                    // posterQrTempSrc: LoginFunc.srcDomin + res.newimg,
                    // oldimgSrc: LoginFunc.srcDomin + res.oldimg,
                })
            } else {
                // _this.getPosterQrTemp();
            }
        })
    },

    formSubmit: function (e) {
        console.log(1212121, e.detail.formId);

        let _this = this;
        let collectFormIdUrl = LoginFunc.domin4 + 'formid';
        if (e.detail.formId == 'the formId is a mock one') {
            return;
        }
        let form_id = e.detail.formId;
        let data = {
            openid: wx.getStorageSync('user_openID'),
            formid: form_id,
            uid: wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, collectFormIdUrl, "POST", data, function (res) {
            console.log("???????")
        })
    },
})