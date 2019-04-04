const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            '/assets/picture/indexBanner1.png'
        ],
        classiy: [{
                icon: '/assets/index/01.png',
                name: '产品宣传海报',
                type: 5,
            },
            {
                icon: '/assets/index/02.png',
                name: '用户维护',
                type: 2,
            },
            {
                icon: '/assets/index/05.png',
                name: '服务预约',
                type: 1,
            },
            
            {
                icon: '/assets/index/04.png',
                name: '早晚安问候',
                type: 4,
            },

            // {
            //     icon: '/assets/index/03.png',
            //     name: '朋友圈装修',
            //     type: 3,
            // },
        ]
    },

    onLoad: function(options) {
        // app.orderCallFlag = false;
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
                app.globalData.userInfo = res.userInfo;
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
        this.setData({
            classScrollHeight: app.windowHeight * 750 / app.sysWidth - 416,
            // classScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 416,
        });

        if (options && options.scene) {//记得改条件
            console.log('SCENE', options);
            let scene = decodeURIComponent(options.scene);
            this.posterUid = scene.split('&')[0];
            this.posterImgId = scene.split('&')[1];
            if (wx.getStorageSync('user_openID') && !app.orderCallFlag) {
                this.orderCall("其他");
            };
            app.orderCall = this.orderCall;
        };

        if (options && options.uid) {
            this.posterUid = options.uid;
            this.posterImgId = options.posterImgId;
            if (wx.getStorageSync('user_openID') && !app.orderCallFlag) {
                this.orderCall("其他");
            };
            app.orderCall = this.orderCall;
        }
    },

    onShow: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        };
        wx.getSystemInfo({
            success(res) {
                // console.log(res);
                app.pix = res.pixelRatio;
                app.windowHeight = res.windowHeight;
                app.windowwidth = res.windowWidth;
                app.sysWidth = res.windowWidth;
                app.Bheight = res.screenHeight - res.windowHeight - res.statusBarHeight - 44;
            }
        });
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

    catchtap: function() {},

    //首页分类点击函数
    tempBindTap: function(e) {
        let _this = this;
        let urlType = e.currentTarget.dataset.type;
        let urlTitle = e.currentTarget.dataset.title;
        wx.navigateTo({
            url: `/pages/posterTemp/posterTemp?type=${urlType}&title=${urlTitle}`,
        })
    },

    // swiperClick
    goToRecruit: function() {
        wx.navigateTo({
            url: '/pages/recruit/recruit',
        })
    },

    // goToLogin
    goToLogin:function(){
        this.setData({
            hasUserInfo: true
        });
        wx.navigateTo({
            url: '/pages/loginPage/loginPage',
        });
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

    //存储查看人的信息
    orderCall: function (e) {
        console.log("orderCall", e);
        app.orderCallFlag = false;
        if (this.posterUid == wx.getStorageSync('u_id')) {
            return;
        };
        let _this = this;
        let storageLookUserInfoUrl = LoginFunc.domin2 + 'look';
        let data = {
            'newimgid': this.posterImgId == undefined ? "1553842506444" : this.posterImgId,
            'uid': this.posterUid == "undefined" ? "5c9ad87190cf1" : this.posterUid,
            "seeopenid": wx.getStorageSync('user_openID'),
        }
        LoginFunc.wxRequest(app, storageLookUserInfoUrl, "POST", data, function (res) {
            console.log(res, "存储查看人的信息");
        })
    },

})