const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        myPosterArr: [],
        srcDomin: LoginFunc.srcDomin,
        ifShowView: 0,
        ifShowPopView: 0,
    },

    onLoad: function(options) {
        this.topNum = this.topNum ? this.topNum:null;
        this.setData({
            ScrollHeight: app.windowHeight * 750 / app.sysWidth - 300,
            // ScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 300,
        });
        // 处理用户信息
        if (app.globalData.userInfo) {
            console.log('if');
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
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
    },

    onShow: function() {
        this.newnum=null;
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        };
        this.bellFun();
    },

    onHide:function(){
        this.topNum = this.newnum;
    },

    onTabItemTap: function() {
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myPosterArr: [],
            ifShowView: 0,
        });
        this.getDataFun();
    },

    gotoStoreOrder:function(){
        wx.navigateTo({
            url: '/pages/storeOrderList/storeOrderList',
        })
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

    goToMyBrand: function() {
        wx.navigateTo({
            url: `/pages/myBrand/myBrand`,
        })
    },

    bindscrolltolower: function() {
        if (this.cangetData) {
            this.urlPage++;
            this.getDataFun();
        }
    },

    // 请求数据
    getDataFun: function() {
        // util.showLoadFun('加载中');
        let _this = this;
        let getDataFunUrl = LoginFunc.domin + 'doPoster';
        let data = {
            'openid': wx.getStorageSync('user_openID'),
            "page": this.urlPage,
            "rows": this.rows,
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "POST", data, function(res) {
            // wx.hideLoading();
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myPosterArr: _this.data.myPosterArr.concat(res.posters),
                    ifShowView: 1,
                });
                if (res.posters.length < _this.rows) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 查看海报
    tempClick: function(e) {
        let _this = this;
        let urlSrc = e.currentTarget.dataset.src;
        let urlid = e.currentTarget.dataset.id;
        let urlNum = e.currentTarget.dataset.num;
        let urlType = e.currentTarget.dataset.type;
        console.log(urlid);
        wx.navigateTo({
            url: `/pages/myPoster/myPoster?urlSrc=${urlSrc}&urlid=${urlid}&urlNum=${urlNum}&urlType=${urlType}`,
        });
    },

    // 删除海报
    popPoster: function() {
        this.setData({
            myPosterArr: this.data.myPosterArr
        });
        let popPosterUrl = LoginFunc.domin + 'delposter';
        let data = {
            "id": this.data.popId,
        };
        LoginFunc.wxRequest(app, popPosterUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {

            } else {
                util.showToastFun("删除失败,请重试")
            }
        })
    },

    // 点击删除
    delectClick: function(e) {
        let _this = this;
        let urlid = e.currentTarget.dataset.id;
        let urlNum = e.currentTarget.dataset.num;
        this.data.myPosterArr.splice(urlNum, 1);
        wx.hideTabBar({
            aniamtion: true
        });
        this.setData({
            ifShowPopView: 1,
            popId: urlid,
        });
    },

    hidePopView: function() {
        wx.showTabBar({
            aniamtion: true
        });
        this.setData({
            ifShowPopView: 0,
        })
    },

    // 强制授权
    goToLogin: function() {
        wx.navigateTo({
            url: '/pages/loginPage/loginPage',
        });
    },

    // bellFun
    bellFun:function(){

        let _this = this;
        let bellFunUrl = LoginFunc.domin3 + 'getordernum';
        let data = {
            uid: wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, bellFunUrl, "POST", data, function (res) {
            console.log(res);
            if(res.status==1){
                _this.newnum=res.num;
                _this.setData({
                    ifBell: (_this.newnum == _this.topNum || res.num==0 )?false:true,
                })
            }
        })
    },

    // 收集Formid
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