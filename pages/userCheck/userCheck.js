const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {

    },

    onLoad: function (options) {
        this.setData({
            // classScrollHeight: app.windowHeight * 750 / app.sysWidth - 416,
            classScrollHeight: (app.windowHeight + app.Bheight) * 750 / app.sysWidth - 64,
        });
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myPosterArr: [],
            ifShowView: 0,
        });
        this.getDataFun();
    },

    onShow: function () {

    },

    onPullDownRefresh: function () {

    },

    // 分享
    onShareAppMessage: function (e) {
        let title = "点击查看";
        let path = `/pages/index/index`;
        return {
            title: title,
            path: path,
        }
    },

    // 请求数据
    getDataFun: function () {
        let _this = this;
        let getDataFunUrl = LoginFunc.domin + 'doPoster';
        let data = {
            'openid': wx.getStorageSync('user_openID'),
            "page": this.urlPage,
            "rows": this.rows,
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "POST", data, function (res) {
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
})