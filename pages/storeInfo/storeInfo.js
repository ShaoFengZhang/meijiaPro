const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        domin: LoginFunc.srcDomin,
        storeName: "",
        storeTel: "",
        storeAddress: "",
        qrArr: [],
        code:'',
        storeEnvironmentArr: [],
        picture:'',
        topViewId:'',
    },

    onLoad: function(options) {
        this.getStoreInfo();
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

    // 校验信息
    checkInfo: function() {
        if (this.data.storeName == '' || this.data.storeTel == '' || this.data.storeAddress == '' || (this.data.storeTel && this.data.storeTel.length != 11)) {
            util.showToastFun("请完善店铺信息~");
            this.setData({
                topViewId: "topview"
            });
            return
        };
        this.setData({
            code: this.data.qrArr.length>0? this.data.qrArr.join("~"):'',
            picture: this.data.storeEnvironmentArr.length>0? this.data.storeEnvironmentArr.join("~"):"",
        })
        this.addStoreInfo();
    },

    // 添加店铺信息
    addStoreInfo: function() {
        util.showLoadFun("保存中")
        let _this = this;
        let addStoreInfoUrl = LoginFunc.domin2 + 'addshop';
        let data = {
            "openid": wx.getStorageSync('user_openID'),
            "uid": wx.getStorageSync('u_id'),
            "phone": this.data.storeTel,
            "address": this.data.storeAddress,
            "shopname": this.data.storeName,
            "code": this.data.code,
            "picture": this.data.picture,
            
        }
        LoginFunc.wxRequest(app, addStoreInfoUrl, "POST", data, function(res) {
            console.log(res);
            wx.hideLoading();
            if (res.status == 1) {
                wx.navigateTo({
                    url: '/pages/serviceManagement/serviceManagement',
                })
            } else {

            }
        })
    },

    // 获取电话号码
    getPhoneNumber: function(e) {
        console.log(e);
        let _this = this;
        let telCount = 0;
        if (e && e.detail.iv) {
            let _this = this;
            let getPhoneNumberUrl = LoginFunc.domin2 + 'getphone';
            let data = {
                "encryptedData": e.detail.encryptedData,
                "iv": e.detail.iv,
                "seesion_key": app.globalData.session_key
            }
            LoginFunc.wxRequest(app, getPhoneNumberUrl, "POST", data, function(res) {
                if (res.status == 1) {
                    console.log(res.phone.purePhoneNumber);
                    _this.setData({
                        storeTel: res.phone.purePhoneNumber,
                    })
                } else {
                    util.showToastFun("获取失败")
                }
            })

        } else {
            util.showToastFun("获取失败")
        }
    },

    // 获取地址
    getAddressFun: function() {
        let _this = this;
        wx.chooseLocation({
            success(res) {
                console.log(res);
                _this.setData({
                    storeAddress: res.address,
                })
            }
        });
    },

    // 获取店铺信息
    getStoreInfo: function() {
        let _this = this;
        let getStoreInfoUrl = LoginFunc.domin2 + 'doindex';
        let data = {
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getStoreInfoUrl, "POST", data, function(res) {
            if (res.status == 1) {
                console.log(res);
                if (res.shop && res.shop.code) {
                    res.shop.code = res.shop.code.split("~");
                };
                if (res.shop && res.shop.picture) {
                    res.shop.picture = res.shop.picture.split("~");
                };
                _this.setData({
                    storeName: res.shop.shopname ? res.shop.shopname : '',
                    storeTel: res.shop.phone ? res.shop.phone : '',
                    storeAddress: res.shop.address ? res.shop.address : '',
                    qrArr: res.shop.code ? res.shop.code : [],
                    storeEnvironmentArr: res.shop.picture ? res.shop.picture : [],
                })
            }
        })
    },

    // 名称输入
    nameInput: function(e) {
        console.log(e);
        let txt = e.detail.value;
        this.setData({
            storeName: txt,
        })
    },

    // 电话号码输入
    telInput: function(e) {
        console.log(e);
        let txt = e.detail.value;
        this.setData({
            storeTel: txt,
        })
    },

    // 地址输入
    addressInput: function(e) {
        console.log(e);
        let txt = e.detail.value.slice(0,30);
        this.setData({
            storeAddress: txt,
        })
    },

    // 上传图片
    upLoadImage: function (e) {
        console.log(e);
        let urlName=e.currentTarget.dataset.type;
        const _this = this;
        wx.chooseImage({
            count: 5,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
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
                        url: LoginFunc.domin2 + urlName,
                        filePath: tempFilePaths[i],
                        name: urlName,
                        formData: {
                            
                        },
                        header: {
                            "Content-Type": "multipart/form-data"
                        },
                        success: function (res) {
                            if (res.data){
                                var data = JSON.parse(res.data);
                                if (data.status == 1) {
                                    hasCount++;
                                    console.log(data[urlName]);
                                    if (urlName=="code"){
                                        _this.data.qrArr.unshift(data[urlName]);
                                        _this.setData({
                                            qrArr: _this.data.qrArr.slice(0, 5), 
                                        })
                                    }else{
                                        _this.data.storeEnvironmentArr.unshift(data[urlName]);
                                        _this.setData({
                                            storeEnvironmentArr: _this.data.storeEnvironmentArr.slice(0, 5),
                                        })
                                    }
                                    
                                    if (hasCount == upImgCount) {
                                        wx.hideToast();
                                    }
                                } else {
                                    wx.hideToast();
                                    wx.showModal({
                                        title: '错误提示',
                                        content: '上传图片失败1',
                                        showCancel: false,
                                        success: function (res) {}
                                    });
                                    return;
                                }
                            } else {
                                wx.hideToast();
                                wx.showModal({
                                    title: '错误提示',
                                    content: '上传图片失败2',
                                    showCancel: false,
                                    success: function (res) { }
                                });
                                return;
                            }
                            

                        },
                        fail: function (res) {
                            wx.hideToast();
                            wx.showModal({
                                title: '错误提示',
                                content: '上传图片失败1',
                                showCancel: false,
                                success: function (res) { }
                            })
                        }
                    });
                }

            }
        });
    },

})