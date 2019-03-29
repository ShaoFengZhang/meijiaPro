const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        botCheck:false,
        usrArr:[
        ],
    },

    onLoad: function(options) {
        this.setData({
            scrollHeight: app.windowHeight * 750 / app.sysWidth - 94,
        });
        if (options && options.designer){
            console.log(options.designer)
            this.designerArr = JSON.parse(options.designer);
            for (let i = 0; i < this.designerArr.length;i++){
                this.designerArr[i].check=false;
            }
            this.setData({
                usrArr: this.designerArr,
            })
        }
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

    switch1Change:function(e){
        console.log(e);
        let index=e.currentTarget.dataset.index;
        this.data.usrArr[index].check = e.detail.value;
        for (let i = 0; i < this.data.usrArr.length;i++){
            if (i != index && this.data.usrArr[index].check){
                this.data.usrArr[i].check=false;
                this.data.botCheck=false;
            }
        }
        this.setData({
            usrArr: this.data.usrArr,
            botCheck: this.data.botCheck,
        });
        this.backTopPage();
    },

    switch2Change:function(e){
        this.data.botCheck = e.detail.value;
        for (let i = 0; i < this.data.usrArr.length; i++) {
            if (this.data.botCheck) {
                this.data.usrArr[i].check = false;
            }
        };
        this.setData({
            usrArr: this.data.usrArr,
            botCheck: this.data.botCheck,
        });
        this.backTopPage();
    },

    // 返回上一页
    backTopPage:function(){
        app.designerInfo = this.data
        wx.navigateBack({
            delta: 1
        })
    },

})