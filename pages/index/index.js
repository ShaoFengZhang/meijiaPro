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
                type: 1,
            },
            {
                icon: '/assets/index/02.png',
                name: '用户维护',
                type: 2,
            },
            {
                icon: '/assets/index/03.png',
                name: '朋友圈装修',
                type: 3,
            },
            {
                icon: '/assets/index/04.png',
                name: '早晚安问候',
                type: 4,
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
        this.setData({
            classScrollHeight: app.windowHeight * 750 / app.sysWidth - 416,
            // classScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 416,
        });
        if (options) {
            console.log('SCENE', options);
            let scene = decodeURIComponent(options.scene);
            let shareUserUid = scene.split('&')[0];
            let posterMid = scene.split('&')[1];
            // if (wx.getStorageSync('user_openID')) {
            //     app.ifPerformNavToDaZhuanPan = false;
            //     this.navToDaZhuanPan();
            // } else {
            //     app.ifPerformNavToDaZhuanPan = true;
            //     app.navToDaZhuanPan = this.navToDaZhuanPan;
            // }
        };
    },

    onShow: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        }
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
    }

})