const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        topBarStatus: [1, 0, 0, 0],
    },

    onLoad: function(options) {
        console.log("storelist", options)
        this.uid = wx.getStorageSync('u_id');
        if (options && options.uid) {
            this.uid = options.uid;
        };

        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myorderArr: [],
            ifShowView: 0,
        });
        // this.getTodyDataFun();
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

    // 顶部分类点击
    topBarChoose: function(e) {
        let index = e.currentTarget.dataset.index;
        if (this.data.topBarStatus[index]) {
            return;
        };
        for (let i = 0; i < this.data.topBarStatus.length; i++) {
            this.data.topBarStatus[i] = 0;
        };
        this.data.topBarStatus[index] = 1;
        this.setData({
            topBarStatus: this.data.topBarStatus,
        });

        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myorderArr: [],
            ifShowView: 0,
        });
        if (index == 0) {
            this.getTodyDataFun();
        } else if (index == 1) {
            this.getTomorrowDataFun();
        } else if (index == 2) {
            this.getTomorrowDataFun();
        } else if (index == 3) {
            this.getTodyDataFun();
        }
        this.getDataFun();
    },

    makePhoneCall: function(e) {
        let phone = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },

    // 请求今天数据
    getTodyDataFun: function() {
        let _this = this;
        let getTodyDataFunUrl = LoginFunc.domin3 + 'shoporders';
        let data = {
            "uid": this.uid,
            "page": this.urlPage,
            "rows": this.rows,
        }
        LoginFunc.wxRequest(app, getTodyDataFunUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myorderArr: _this.data.myorderArr.concat(res.order),
                    ifShowView: 1,
                });
                if ((res.order.length % _this.rows) != 0 || (res.order.length / _this.rows) <= 0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 请求明后天数据
    getTomorrowDataFun: function() {
        let _this = this;
        let getTomorrowDataFunUrl = LoginFunc.domin3 + 'shopmorders';
        let data = {
            "uid": this.uid,
            "page": this.urlPage,
            "rows": this.rows,
            "data": ""
        }
        LoginFunc.wxRequest(app, getTomorrowDataFunUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myorderArr: _this.data.myorderArr.concat(res.order),
                    ifShowView: 1,
                });
                if ((res.order.length % _this.rows) != 0 || (res.order.length / _this.rows) <= 0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 下拉刷新
    bindscrolltolower: function() {
        if (this.cangetData) {
            this.urlPage++;
            console.log("this.urlPage++", this.urlPage);
            this.getDataFun();
        }
    },

    // 处理时间
    formatTime: function(data,a) {
        let date = new Date(data);
        date.setDate(date.getDate() + a);
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let hou = date.getDate();
        let time = year+"-"+(mon > 9 ? mon : `0${mon}`) + "-" + (hou > 9 ? hou : `0${hou}`);
        return time;
    },

})