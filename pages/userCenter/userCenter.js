const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        myPosterArr: [],
        srcDomin: LoginFunc.srcDomin,
        ifShowView: 0,
        ifShowPopView:0,
    },

    onLoad: function(options) {
        this.setData({
            ScrollHeight: app.windowHeight * 750 / app.sysWidth - 262,
            // ScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 416,
        });
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myPosterArr: [],
            ifShowView: 0,
        });
        this.onLoadPost=true;
        this.getDataFun();
    },

    onShow: function() {
        if (this.data.myPosterArr.length <= 3 && !this.onLoadPost) {
            this.getDataFun();
        };
        this.onLoadPost = false;
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
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "POST", data, function(res) {
            // wx.hideLoading();
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myPosterArr: _this.data.myPosterArr.concat(res.poster),
                    ifShowView: 1,
                });
                if ((res.poster.length % _this.rows) != 0 || (res.poster.length / _this.rows) <= 0) {
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
        wx.navigateTo({
            url: `/pages/myPoster/myPoster?urlSrc=${urlSrc}&urlid=${urlid}&urlNum=${urlNum}`,
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
                
            }else{
                util.showToastFun("删除失败,请重试")
            }
        })
    },

    // 点击删除
    delectClick:function(e){
        let _this = this;
        let urlid = e.currentTarget.dataset.id;
        let urlNum = e.currentTarget.dataset.num;
        this.data.myPosterArr.splice(urlNum, 1);
        wx.hideTabBar({
            aniamtion: true
        });
        this.setData({
            ifShowPopView:1,
            popId: urlid,
        });
    },

    hidePopView:function(){
        wx.showTabBar({
            aniamtion:true
        });
        this.setData({
            ifShowPopView:0,
        })
    },
})