const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        myPosterArr: [],
        srcDomin: LoginFunc.srcDomin,
        ifShowView:0,
    },

    onLoad: function(options) {
        this.setData({
            ScrollHeight: app.windowHeight * 750 / app.sysWidth - 262,
            // ScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 416,
        });
        // this.urlPage = 1;
        // this.rows = 6;
        // this.cangetData = true;
    },

    onShow: function() {
        // this.getDataFun();
    },

    onTabItemTap: function () {
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myPosterArr: [],
        });
        this.getDataFun();
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
        // wx.navigateTo({
        //     url: `/pages/myBrand/myBrand`,
        // })
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
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "POST", data, function(res) {
            // wx.hideLoading();
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myPosterArr: _this.data.myPosterArr.concat(res.poster),
                    ifShowView:1,
                });
                if ((res.poster.length % _this.rows) != 0 || (res.poster.length / _this.rows)<=0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 查看海报
    tempClick: function(e) {
        let _this = this;
        let urlSrc = e.currentTarget.dataset.src;
        let urlMid = e.currentTarget.dataset.mid;
        wx.navigateTo({
            url: `/pages/myPoster/myPoster?urlSrc=${urlSrc}&urlMid=${urlMid}`,
        });
    },
})