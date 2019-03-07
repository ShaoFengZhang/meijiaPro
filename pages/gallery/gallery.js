const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        dataArray: [],
        srcUrl: LoginFunc.srcDomin
    },

    onLoad: function(options) {

        // this.urlPage = 1;
        // this.rows = 6;
        // this.cangetData = true;
        // this.getDataFun();
    },

    onTabItemTap: function() {
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.getDataFun();
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

    bindscrolltolower: function() {
        console.log(123);
        if (this.cangetData) {
            this.urlPage++;
            this.getDataFun();
        }
    },

    // 请求数据
    getDataFun: function() {
        // util.showLoadFun('Loading');
        let _this = this;
        let getDataFunUrl = LoginFunc.domin + 'doimages';
        let data = {
            page: this.urlPage,
            rows: this.rows,
        };

        LoginFunc.wxRequest(app, getDataFunUrl, "GET", data, function(res) {
            // wx.hideLoading();
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    ["dataArray[" + (_this.urlPage - 1) + "]"]: res.images,
                    // imgArr: _this.data.imgArr.concat(res.images)
                });
                if ((res.images.length % _this.rows) != 0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 查看图片
    checkImage: function(e) {
        console.log(e.currentTarget.dataset.urlsrc);
        let urlSrc = e.currentTarget.dataset.urlsrc;
        wx.previewImage({
            urls: [urlSrc]
        });
    }
})