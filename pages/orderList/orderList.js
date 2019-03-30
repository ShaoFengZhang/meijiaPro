const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
    },

    onLoad: function (options) {
        console.log("list",options)
        this.openId = wx.getStorageSync('user_openID');
        if (options && options.openid){
            this.openId = options.openid;
        };
        this.urlPage = 1;
        this.rows = 6;
        this.cangetData = true;
        this.setData({
            myorderArr: [],
            ifShowView: 0,
        });
        this.getDataFun();
    },

    onShow: function () {

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
        let getDataFunUrl = LoginFunc.domin3 + 'getorders';
        let data = {
            'openid': this.openId,
            "page": this.urlPage,
            "rows": this.rows,
        }
        LoginFunc.wxRequest(app, getDataFunUrl, "POST", data, function (res) {
            console.log(res);
            if (res.status == 1) {
                for (let i = 0; i < res.order.length; i++) {
                    let orderTimeStep = Date.parse(res.order[i].data + " " + res.order[i].appointment);
                    if (res.time*1000 > orderTimeStep) {
                        res.order[i].btnType = 1;
                    } else {
                        res.order[i].btnType = 2;
                    }

                };
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

    // 取消订单
    cancelOrder:function(e){
        let _this = this;
        console.log(e);
        let id=e.currentTarget.dataset.id;
        let ordernum = e.currentTarget.dataset.ordernum;
        let index = e.currentTarget.dataset.index;
        let cancelOrderUrl = LoginFunc.domin3 + 'delorder';
        let data = {
            'id': id,
            "ordernum": ordernum,
        }
        LoginFunc.wxRequest(app, cancelOrderUrl, "POST", data, function (res) {
            console.log(res);
            if (res.status == 1) {
                _this.data.myorderArr[index].status=0;
                _this.setData({
                    myorderArr: _this.data.myorderArr
                });
                util.showToastFun("已经取消订单~")
            }else{
                util.showToastFun("取消失败请重试~")
            }
        })
    },

    bindscrolltolower: function () {
        if (this.cangetData) {
            this.urlPage++;
            console.log("this.urlPage++", this.urlPage);
            this.getDataFun();
        }
    },

})