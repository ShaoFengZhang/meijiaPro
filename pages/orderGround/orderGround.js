const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        srcUrl: LoginFunc.srcDomin,
        bananerUrls: [],
        sampleUrls: [],
        tukuUrls: [],
        ifShowStoreMask: false,
        // 默认店铺环境
        defaultBanner: [
            "Public/mimg/tuku/gua/1552019763.7.jpg"
        ],
        // 默认店主热键
        defaultSample: [{
                imgurl: "Public/mimg/tuku/gua/1552019763.7.jpg"
            },
            {
                imgurl: "Public/mimg/tuku/gua/1552019763.7.jpg"
            },
            {
                imgurl: "Public/mimg/tuku/gua/1552019763.7.jpg"
            },
        ]

    },

    onLoad: function(options) {
        // 处理用户信息
        if (app.globalData.userInfo) {
            console.log('if');
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        } else if (this.data.canIUse) {
            console.log('elseif');
            app.userInfoReadyCallback = res => {
                console.log('index');
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
                let iv = res.iv;
                let encryptedData = res.encryptedData;
                let session_key = app.globalData.session_key;
                LoginFunc.checkUserInfo(app, res, iv, encryptedData, session_key);
            }
        } else {
            console.log('else');
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                    let iv = res.iv;
                    let encryptedData = res.encryptedData;
                    let session_key = app.globalData.session_key;
                    LoginFunc.checkUserInfo(app, res, iv, encryptedData, session_key);
                }
            })
        };
        if (options) {//记得改条件
            console.log('SCENE', options);
            let scene = decodeURIComponent(options.scene);
            this.posterUid = scene.split('&')[0];
            this.posterImgId = scene.split('&')[1];
            if (wx.getStorageSync('user_openID') && !app.orderCallFlag) {
                this.orderCall("34");
            };
            app.orderCall = this.orderCall;
            this.getStoreInfo();
        };
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

    // 展示店铺详情
    showStoreDeatils: function() {
        this.setData({
            ifShowStoreMask: !this.data.ifShowStoreMask
        })
    },

    // 查看订单
    orderDeails:function(){
        wx.navigateTo({
            url: '/pages/orderList/orderList',
        })
    },

    catchtap:function(){},

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
            this.serviceOrder();
        } else {
            util.showToastFun('我们需要您的授权哦~');
        }
    },

    // 服务预约
    serviceOrder: function() {
        let _this = this;
        let serviceOrderUrl = LoginFunc.domin2 + 'order';
        let data = {
            'uid': this.posterUid == "undefined" ? "5c9ad87190cf1" : this.posterUid,
        }
        LoginFunc.wxRequest(app, serviceOrderUrl, "POST", data, function(res) {
            console.log(res,"服务预约");
            if (res.status == 1) {
                wx.navigateTo({
                    url: `/pages/serviceOrder/serviceOrder?storeInfo=${JSON.stringify(res.fuwuinfo)}&storeName=${_this.data.storeInfo.shopname}&storeCall=${_this.data.storeInfo.phone}&postUid=${_this.posterUid}&data=${res.data}&timeStamp=${res.time}&storeAdress=${_this.data.storeInfo.address}`,
                })
            };
            if (res.status == 0) {
                util.showToastFun("该店主还没有店铺~")
            }
        })

    },

    //存储查看人的信息
    orderCall: function(e) {
        console.log("orderCall", e);
        app.orderCallFlag = false;
        if (this.posterUid == wx.getStorageSync('u_id')){
            return;
        };
        let _this = this;
        let storageLookUserInfoUrl = LoginFunc.domin2 + 'look';
        let data = {
            'newimgid': this.posterImgId == undefined ? "1553842506444" : this.posterImgId,
            'uid': this.posterUid == "undefined" ? "5c9ad87190cf1" : this.posterUid,
            "seeopenid": wx.getStorageSync('user_openID'),
        }
        LoginFunc.wxRequest(app, storageLookUserInfoUrl, "POST", data, function(res) {
            console.log(res,"存储查看人的信息");
        })
    },

    // 请求店铺信息
    getStoreInfo: function() {
        console.log("Landing");
        let _this = this;
        let getStoreInfoUrl = LoginFunc.domin2 + 'Landing';
        let data = {
            'uid': this.posterUid == "undefined" ? "5c9ad87190cf1" : this.posterUid,
        }
        LoginFunc.wxRequest(app, getStoreInfoUrl, "POST", data, function(res) {
            console.log(res,"请求店铺信息");
            if (res.status == 1) {
                _this.setData({
                    storeInfo: res.bananer,
                    // 店铺环境
                    bananerUrls: res.bananer.picture ? res.bananer.picture.split("~") : [],
                    // 点主热荐
                    sampleUrls: res.sample.length > 0 ? res.sample : [],
                    // 热门款式
                    tukuUrls: res.tuku.length > 0 ? res.tuku : [],
                });
            };
            if (_this.data.bananerUrls.length == 0) {
                _this.setData({
                    bananerUrls: _this.data.defaultBanner
                })
            };
            if (_this.data.sampleUrls.length < 3) {
                _this.setData({
                    sampleUrls: _this.data.sampleUrls.concat(_this.data.defaultSample.slice(0, (3 - _this.data.sampleUrls.length)))
                })
            };
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