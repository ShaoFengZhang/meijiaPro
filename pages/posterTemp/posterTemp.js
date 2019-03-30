const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';

Page({

    data: {
        posterArr: [],
        domin: LoginFunc.srcDomin,
        ifShowView: 0,
    },

    onLoad: function(options) {
        let _this = this;
        if (options && options.type) {
            this.tempType = options.type;
            this.tempTitle = options.title;
            wx.setNavigationBarTitle({
                title: this.tempTitle + '制作模板'
            })
        };
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.getDataFun();

    },

    onShow: function() {

    },

    onUnload: function() {
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            posterArr: [],
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
        let getDataFunUrl = LoginFunc.domin + 'dotype';
        let data = {
            type: this.tempType,
            "page": this.urlPage,
            "rows": this.rows,
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "GET", data, function(res) {
            // wx.hideLoading();
            _this.setData({
                ifShowView: 1,
            })
            if (res.status == 1) {
                _this.setData({
                    posterArr: _this.data.posterArr.concat(res.images),
                });
                if ((res.images.length % _this.rows) != 0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    //模板点击
    posterClick: function(e) {
        let _this = this;
        let urlSrc = e.currentTarget.dataset.src;
        let urlID = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/editorTemp/editorTemp?urlSrc=${urlSrc}&urlID=${urlID}`,
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

})