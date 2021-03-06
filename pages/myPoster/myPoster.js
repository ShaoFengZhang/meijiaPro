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
                imgId: options.urlid,
                imgType: options.urlType,
            })
        }

    },

    onShow: function() {

    },

    onHide: function() {

    },

    // 分享
    onShareAppMessage: function(e) {
        if (this.data.imgType == 1) {
            var path = `/pages/orderGround/orderGround?uid=${wx.getStorageSync('u_id')}&posterImgId=${this.data.imgId}`;
            var title = "点击立即预约";

        } else if (this.data.imgType == 2) {
            var path = `/pages/index/index?uid=${wx.getStorageSync('u_id')}&posterImgId=${this.data.imgId}`
        } else if (this.data.imgType == 3) {
            var path = `/pages/index/index?uid=${wx.getStorageSync('u_id')}&posterImgId=${this.data.imgId}`
        } else if (this.data.imgType == 4) {
            var path = `/pages/index/index?uid=${wx.getStorageSync('u_id')}&posterImgId=${this.data.imgId}`
        } else if (this.data.imgType == 5) {
            var path = `/pages/index/index?uid=${wx.getStorageSync('u_id')}&posterImgId=${this.data.imgId}`;
            var title = "点击查看";
        }
        return {
            title: title,
            path: path,
        }
    },

    // 查看扫码人员
    howPeopleCheck: function(e) {
        let id = e.currentTarget.dataset.id;
        let num = e.currentTarget.dataset.num;
        if (this.data.imgType == 1) {
            var navUrl = `/pages/storeOrderList/storeOrderList?ifShowGoHome = 123`

        } else if (this.data.imgType == 2) {
            var navUrl = `/pages/userCheck/userCheck?imgId=${id}&num=${num}`
        } else if (this.data.imgType == 3) {
            var navUrl = `/pages/userCheck/userCheck?imgId=${id}&num=${num}`
        } else if (this.data.imgType == 4) {
            var navUrl = `/pages/userCheck/userCheck?imgId=${id}&num=${num}`
        } else if (this.data.imgType == 5) {
            var navUrl = `/pages/userCheck/userCheck?imgId=${id}&num=${num}`
        }
        wx.navigateTo({
            // url: `/pages/userCheck/userCheck?imgId=${id}&num=${num}`,
            url: `${navUrl}`,
        })

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

    formSubmit: function(e) {
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
        LoginFunc.wxRequest(app, collectFormIdUrl, "POST", data, function(res) {
            console.log("???????")
        })
    },

})