const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        domin: LoginFunc.srcDomin,
        multiArray: [

            ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ],

            ["至"],

            ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
                '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
                '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
            ],
        ],

        defaultTimeTxt: "8:00 至 17:00",
        multiIndex: [8, 0, 17],
        dayArr: [{
                "txt": "周一",
                "flag": false,
            },
            {
                "txt": "周二",
                "flag": false,
            },
            {
                "txt": "周三",
                "flag": false,
            },
            {
                "txt": "周四",
                "flag": false,
            },
            {
                "txt": "周五",
                "flag": false,
            },
            {
                "txt": "周六",
                "flag": true,
            },
            {
                "txt": "周日",
                "flag": true,
            },
            {
                "txt": "没有休息日",
                "flag": false,
            },

        ],
        serviceProject: [{
                "txt": "美甲",
                "flag": 1,
            },
            {
                "txt": "美睫",
                "flag": 0,
            },
            {
                "txt": "半永久",
                "flag": 0,
            },
            {
                "txt": "手部护理",
                "flag": 0,
            },
        ],
        designerArr: [],
    },

    onLoad: function(options) {
        console.log(app.globalData.userInfo)
        this.startTime = this.data.multiArray[0][8];
        this.endTime = this.data.multiArray[2][17];
        this.getServiceInfo();
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

    // nameInput
    nameInput: function(e) {
        console.log(e);
        let index = e.currentTarget.dataset.index;
        let name = e.detail.value;
        this.data.designerArr[index].name = name.slice(0,11);
        this.setData({
            designerArr: this.data.designerArr,
        })
    },

    // addDesigner
    addDesigner: function() {
        let obj = {
            name: '',
            icon: '',
            type: 2,
            id:'',
        };
        this.data.designerArr.push(obj);
        this.setData({
            designerArr: this.data.designerArr,
        })
    },

    // deleteDesigner
    deleteDesigner: function(e) {
        let index = e.currentTarget.dataset.index;
        if (index == 0) {
            util.showToastFun("最少有一个");
            return;
        }
        this.data.designerArr.pop();
        this.setData({
            designerArr: this.data.designerArr,
        })
    },

    // value 改变时触发 change 事件
    bindchange: function(e) {
        let valueArr = e.detail.value;
        this.startTime = this.data.multiArray[0][valueArr[0]];
        this.endTime = this.data.multiArray[2][valueArr[2]];
        console.log(this.startTime, this.endTime);
        this.setData({
            defaultTimeTxt: `${this.startTime} 至 ${this.endTime}`
        })
    },

    // 休息日点击事件
    restDayClick: function(e) {
        let flag=true;
        let index = e.currentTarget.dataset.index;
        this.data.dayArr[index].flag = !this.data.dayArr[index].flag;
        if (index == this.data.dayArr.length - 1 && this.data.dayArr[this.data.dayArr.length - 1].flag) {
            for (let i = 0; i < this.data.dayArr.length - 1; i++) {
                this.data.dayArr[i].flag = false;
            };
        } else {
            this.data.dayArr[this.data.dayArr.length - 1].flag = false;
        };
        this.setData({
            dayArr: this.data.dayArr,
        })

    },

    // 服务项目点击事件
    srverItemClick: function(e) {
        let index = e.currentTarget.dataset.index;
        this.data.serviceProject[index].flag = !this.data.serviceProject[index].flag;
        this.setData({
            serviceProject: this.data.serviceProject,
        })
    },

    // 保存信息
    saveInfo: function() {
        let _this = this;
        let saveInfoUrl = LoginFunc.domin2 + 'addfuwuinfo';
        let designerUpArr = [];

        // 组织校验设计师信息
        for (let i = 0; i < this.data.designerArr.length; i++) {
            if (this.data.designerArr[i].icon == "" || this.data.designerArr[i].name==""){
                util.showToastFun("请完善设计师信息");
                return;
            }
            let obj = {
                "uid": wx.getStorageSync('u_id'),
                "openid": wx.getStorageSync('user_openID'),
                "name": this.data.designerArr[i].name,
                "headimg": this.data.designerArr[i].icon,
                "type": this.data.designerArr[i].type,
                "id": this.data.designerArr[i].id,
            };
            designerUpArr.push(obj);
        }

        // 校验休息日
        let restflag = 0;
        for (let i = 0; i < this.data.dayArr.length; i++) {
            if (!this.data.dayArr[i].flag) {
                restflag++
            }
        };
        if (restflag >= this.data.dayArr.length) {
            util.showToastFun("请完善休息日信息");
            return;
        };

        // 校验服务项目
        let serviceItemFlag = 0;
        for (let i = 0; i < this.data.serviceProject.length; i++) {
            if (!this.data.serviceProject[i].flag) {
                serviceItemFlag++
            }
        };
        if (serviceItemFlag >= this.data.serviceProject.length) {
            util.showToastFun("请完善服务项目信息");
            return;
        };

        let data = {
            "uid": wx.getStorageSync('u_id'),
            "openid": wx.getStorageSync('user_openID'),
            "start": this.startTime,
            "end": this.endTime,
            "rest": JSON.stringify(this.data.dayArr),
            "worktype": JSON.stringify(this.data.serviceProject),
            "designer": JSON.stringify(designerUpArr),
        };
        LoginFunc.wxRequest(app, saveInfoUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                wx.showModal({
                    title: '保存成功',
                    content: '返回个人中心',
                    success: function(res) {
                        wx.navigateBack({
                            delta: 2
                        })
                    },
                })
            }
        })
    },

    // 请求服务信息
    getServiceInfo: function() {
        let _this = this;
        let getServiceInfoUrl = LoginFunc.domin2 + 'shop';
        let data = {
            "uid": wx.getStorageSync('u_id'),
        }
        LoginFunc.wxRequest(app, getServiceInfoUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {

                // 设计师
                for (let i = 0; i < res.manager.length; i++) {
                    let obj = {
                        name: res.manager[i].name.slice(0, 11),
                        icon: res.manager[i].headimg,
                        type: res.manager[i].type,
                        id: res.manager[i].id,
                    };
                    _this.data.designerArr.push(obj);
                };

                // 上下班时间
                _this.startTime = res.fuwuinfo.start;
                _this.endTime = res.fuwuinfo.end;
                _this.setData({
                    designerArr: _this.data.designerArr,
                    defaultTimeTxt: _this.startTime + " 至 " + _this.endTime,
                    dayArr: JSON.parse(res.fuwuinfo.rest),
                    serviceProject: JSON.parse(res.fuwuinfo.worktype),
                });
            }
        })
    },

    // 添加设计师头像
    addHeadImg: function(e) {
        let index = e.currentTarget.dataset.index;
        this.upLoadImage(index);
    },

    // 上传图片
    upLoadImage: function(index) {
        const _this = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function(res) {
                var tempFilePaths = res.tempFilePaths;
                util.showLoadFun('正在上传');
                wx.uploadFile({
                    url: LoginFunc.domin2 + 'headimg',
                    filePath: tempFilePaths[0],
                    name: 'headimg',
                    formData: {},
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(res) {
                        wx.hideLoading();
                        console.log(res);
                        let data = JSON.parse(res.data);
                        if (data.status == 1) {
                            _this.data.designerArr[index].icon = data.headimg;
                            _this.data.designerArr[index].id = data.mangerid;
                            _this.setData({
                                designerArr: _this.data.designerArr,
                            });
                        } else {
                            wx.showModal({
                                title: '错误提示',
                                content: '上传头像失败',
                                showCancel: false,
                                success: function(res) {}
                            })
                        }
                    },
                    fail: function(res) {
                        wx.hideToast();
                        wx.showModal({
                            title: '错误提示',
                            content: '上传头像失败',
                            showCancel: false,
                            success: function(res) {}
                        })
                    }
                });
            }
        });
    },
})