const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        topBarStatus: [1, 0, 0, 0],
        ifShowGoHome:1,
    },

    onLoad: function(options) {
        console.log("storelist", options)
        this.uid = wx.getStorageSync('u_id');
        if (options && options.uid) {
            this.uid = options.uid;
        };

        if (options && options.ifShowGoHome){
            this.setData({
                ifShowGoHome:0, 
            })
        }

        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myorderArr: [],
            ifShowView: 0,
            yiguoqi: 0,
        });
        this.getTodyDataFun();
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
            this.setData({
                yiguoqi: 0,
            })
            this.getTodyDataFun();
        } else if (index == 1) {
            this.setData({
                yiguoqi: 0,
            })
            this.getTomorrowDataFun(this.formatTime(this.data.timeStemp,1));
        } else if (index == 2) {
            this.setData({
                yiguoqi: 0,
            })
            this.getTomorrowDataFun(this.formatTime(this.data.timeStemp, 2));
        } else if (index == 3) {
            this.setData({
                yiguoqi:1,
            })
            this.getGuoQiDataFun();
        }
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
                    myorderArr: _this.data.myorderArr.concat(res.shoporder),
                    ifShowView: 1,
                    timeStemp: res.time*1000,
                });
                if (res.shoporder.length < _this.rows) {
                    _this.cangetData = false;
                }
            }else{
                _this.setData({
                    ifShowView: 1,
                });
            }
        })
    },

    // 请求明后天数据
    getTomorrowDataFun: function(time) {
        let _this = this;
        let getTomorrowDataFunUrl = LoginFunc.domin3 + 'shopmorders';
        let data = {
            "uid": this.uid,
            "page": this.urlPage,
            "rows": this.rows,
            "date": time
        }
        LoginFunc.wxRequest(app, getTomorrowDataFunUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myorderArr: _this.data.myorderArr.concat(res.shoporder),
                    ifShowView: 1,
                });
                if (res.shoporder.length < _this.rows) {
                    _this.cangetData = false;
                }
            }else{
                _this.setData({
                    ifShowView: 1,
                });
            }
        })
    },

    // 请求过期的数据
    getGuoQiDataFun: function () {
        let _this = this;
        let getGuoQiDataFunUrl = LoginFunc.domin3 + 'getguoqi';
        let data = {
            "uid": this.uid,
            "page": this.urlPage,
            "rows": this.rows,
        }
        LoginFunc.wxRequest(app, getGuoQiDataFunUrl, "POST", data, function (res) {
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    myorderArr: _this.data.myorderArr.concat(res.shoporder),
                    ifShowView: 1,
                });
                if (res.shoporder.length < _this.rows) {
                    _this.cangetData = false;
                }
            }else{
                _this.setData({
                    ifShowView: 1,
                }); 
            }
        })
    },

    // 下拉刷新
    bindscrolltolower: function() {
        console.log(this.cangetData)
        if (this.cangetData) {
            this.urlPage++;
            console.log("this.urlPage++", this.urlPage);
            for (let i = 0; i < this.data.topBarStatus.length; i++) {
                if (this.data.topBarStatus[i]==1){
                    var lowerIndex=i;
                }
            };
            if (lowerIndex == 0) {
                this.getTodyDataFun();
            } else if (lowerIndex == 1) {
                this.getTomorrowDataFun(this.formatTime(this.data.timeStemp, 1));
            } else if (lowerIndex == 2) {
                this.getTomorrowDataFun(this.formatTime(this.data.timeStemp, 2));
            } else if (lowerIndex == 3) {
                this.getGuoQiDataFun();
            }
        }
    },

    // 处理时间
    formatTime: function(data,a) {
        let date = new Date(data);
        console.log(data)
        date.setDate(date.getDate() + a);
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let hou = date.getDate();
        let time = year+"-"+(mon > 9 ? mon : `0${mon}`) + "-" + (hou > 9 ? hou : `0${hou}`);
       
        return time;
    },

    goHome:function(){
        wx.switchTab({
            url: '/pages/index/index'
        })
    }

})