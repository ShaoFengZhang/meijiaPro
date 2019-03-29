const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        ifshowUserView:1,
        ifShowTimeChoose: 0,
        userName: '', //预约人姓名
        userCall: "", //预约人的电话
        noteTxt: '', //备注信息
        storeName: '', //店铺信息
        serviceArr: [], //服务项目
        designerNameObj: {
            name: "到店安排",
            value: 0,
        },
        timeValue: {
            name: "手动选择",
            value: 0,
        },
        whichDay:null,
        //卸甲
        xiejia: "只卸甲",
        rackItems: [{
                name: '卸完再做',
                value: '卸完再做'
            },
            {
                name: '只卸甲',
                value: '只卸甲',
                checked: 'true'
            },
        ],
        bujiemao: "只补睫毛",
        ifShowRackItems: 0,
        ifShowRackItems2: 1,
        // 补睫毛
        eyelashItems: [{
                name: '不补睫毛',
                value: '不补睫毛'
            },
            {
                name: '只补睫毛',
                value: '只补睫毛',
                checked: 'true'
            },
        ],
        ifShowEyelashItems: 0,
        ifShowEyelashItems2: 0,
        orderTimeArr: [

        ],
        timeArray: [
            // {
            //     time:"00:00",
            //     ifCheck:true,
            //     nowCheck:false,
            // },
            // {
            //     time: "00:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "01:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "01:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "02:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "02:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "03:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "03:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "04:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "04:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "05:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "05:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "06:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "06:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "07:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "07:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            {
                time: "08:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "08:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "09:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "09:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "10:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "10:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "11:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "11:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "12:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "12:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "13:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "13:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "14:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "14:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "15:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "15:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "16:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "16:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "17:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "17:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "18:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "18:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "19:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "19:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "20:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "20:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "21:00",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "21:30",
                ifCheck: true,
                nowCheck: false,
            },
            {
                time: "22:00",
                ifCheck: true,
                nowCheck: false,
            },
            // {
            //     time: "22:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "23:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "23:30",
            //     ifCheck: true,
            //     nowCheck: false,
            // },
            // {
            //     time: "24:00",
            //     ifCheck: true,
            //     nowCheck: false,
            // }
        ],
    },

    onLoad: function(options) {
        app.designerInfo = null;
        if (options && options.storeInfo) {
            this.storeInfo = JSON.parse(options.storeInfo);
            console.log(this.storeInfo)
            this.setData({
                storeInfo: this.storeInfo,
                storeName: options.storeName,
                storeAdress: options.storeAdress,
                storeCall: options.storeCall,
                postUid: options.postUid,

            });
            // 处理服务项目
            let serviceList = JSON.parse(this.data.storeInfo[0].worktype);
            for (let i = 0; i < serviceList.length; i++) {
                if (serviceList[i].flag) {
                    let obj = {
                        txt: serviceList[i].txt,
                        flag: serviceList[i].flag,
                        nowFlag: i == 0 ? 1 : 0,
                        point: serviceList[i].point ? serviceList[i].point:'',
                    }
                    this.data.serviceArr.push(obj);
                    this.setData({
                        serviceArr: this.data.serviceArr,
                    })
                };
                if (serviceList[i].point == "meijia" && serviceList[i].flag) {
                    this.setData({
                        ifShowRackItems: 1,
                    })
                };
                if (serviceList[i].point == "meijie" && serviceList[i].flag) {
                    this.setData({
                        ifShowEyelashItems: 1,
                    })
                };
            };
            // 上下班时间、休息日
            this.yearsTime = options.data.slice(0, 5);
            this.timeStamp = options.timeStamp * 1000;
            this.startWorkTime = this.data.storeInfo[0].start;
            this.endWorkTime = this.data.storeInfo[0].end;
            let restDayArr = JSON.parse(this.data.storeInfo[0].rest);
            this.restDayArr = [];
            for (let i = 0; i < restDayArr.length; i++) {
                if (restDayArr[i].flag) {
                    this.restDayArr.push(i);
                }
            };
            console.log(this.startWorkTime);
            console.log(this.endWorkTime);
            console.log(this.restDayArr);
            console.log(this.yearsTime);
            console.log(new Date(this.timeStamp));
            for (let i = 0; i < 7; i++) {
                this.data.orderTimeArr.push(this.fun_date(this.timeStamp, i))
            };
            this.setData({
                orderTimeArr: this.data.orderTimeArr,
                whichDay: this.yearsTime + this.fun_mon(this.timeStamp)
            })
            console.log(this.data.orderTimeArr)
        };
    },

    onShow: function() {
        this.managerid = 'null';
        let desInfo = app.designerInfo;
        console.log(desInfo,"PPPPPPPPPPPP")
        if (desInfo && !desInfo.botCheck) {
            for (let i = 0; i < desInfo.usrArr.length; i++) {
                if (desInfo.usrArr[i].check) {
                    this.setData({
                        designerNameObj: {
                            name: desInfo.usrArr[i].name,
                            value: 1,
                        },
                    });
                    this.managerid = desInfo.usrArr[i].id
                }
            }
        };
        if (desInfo && desInfo.botCheck) {
            this.setData({
                designerNameObj: {
                    name: "到店安排",
                    value: 0,
                },
            });
            this.managerid = null;                  
        };
        console.log(this.managerid)
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

    // 预约时间选择
    orderTimeCheck:function(e){
        let index=e.currentTarget.dataset.index;
        let ifCheck = e.currentTarget.dataset.ifcheck;
        if (!ifCheck){
            util.showToastFun("此时间段不可约~");
            return;
        };
        if (this.data.timeArray[index].nowCheck){
            util.showToastFun("不要重复预约~");
            return;
        }
        for (let i = 0; i < this.data.timeArray.length;i++){
            this.data.timeArray[i].nowCheck=false;
        }
        this.data.timeArray[index].nowCheck=true;
        this.setData({
            timeArray: this.data.timeArray,
            timeValue:{
                name: this.data.timeArray[index].time,
                value:1,
            },
            ifShowTimeChoose: !this.data.ifShowTimeChoose,
            ifshowUserView: !this.data.ifshowUserView
        })
    },

    // 处理上下班时间
    dealWithStarEnd:function(index){
        let startWorkTime = this.startWorkTime;
        let endWorkTime = this.endWorkTime;

        let startWorkStamp = Date.parse(this.yearsTime + this.data.orderTimeArr[index].value.slice(3) + " " + startWorkTime);//开始上班的时间戳

        let endWorkStamp = Date.parse(this.yearsTime + this.data.orderTimeArr[index].value.slice(3) + " " + endWorkTime); //下班的时间戳

        let startTime = this.timeStamp > startWorkStamp ?this.timeStamp: startWorkStamp; //取到开始时间戳

        let endTime = endWorkStamp; //取到结束时间戳

        // 截取开始和下班时间
        for (let i = 0; i < this.data.timeArray.length;i++){
          let arrtiem= Date.parse(this.yearsTime + this.data.orderTimeArr[index].value.slice(3) + " " + this.data.timeArray[i].time);
            if ((arrtiem < startTime) || (arrtiem >= endTime)){
                this.data.timeArray[i].ifCheck=false;
            }else{
                this.data.timeArray[i].ifCheck = true;
            };
            this.setData({
                timeArray: this.data.timeArray,
            });
            this.hasOrderInfo(index)
        }
    },

    // 处理日期
    fun_date: function(data, a) {
        let date = new Date(data);
        date.setDate(date.getDate() + a);
        let mon = date.getMonth() + 1;
        let hou = date.getDate();
        let time = (mon > 9 ? mon : `0${mon}`) + "-" + (hou > 9 ? hou : `0${hou}`);
        let weekDay = date.getDay();
        let dayObj = {
            value: null,
            ifrest: false,
            botLine: false,
        }
        for (let i = 0; i < this.restDayArr.length; i++) {
            if (weekDay == this.restDayArr[i]) {
                dayObj.ifrest = true;
            };
            if (a == 0) {
                dayObj.value = '今天 ' + time;
                dayObj.botLine = true;
            } else if (a == 1) {
                dayObj.value = '明天 ' + time;
            } else if (a == 2) {
                dayObj.value = '后天 ' + time;
            } else {
                if (weekDay == 0) {
                    dayObj.value = '周日 ' + time;
                } else if (weekDay == 1) {
                    dayObj.value = '周一 ' + time;
                } else if (weekDay == 2) {
                    dayObj.value = '周二 ' + time;
                } else if (weekDay == 3) {
                    dayObj.value = '周三 ' + time;
                } else if (weekDay == 4) {
                    dayObj.value = '周四 ' + time;
                } else if (weekDay == 5) {
                    dayObj.value = '周五 ' + time;
                } else if (weekDay == 6) {
                    dayObj.value = '周六 ' + time;
                }

            }

        }
        return dayObj;
    },

    // 处理时间点
    fun_mon:function(data){
        let time = new Date(data);
        const month = time.getMonth() + 1;
        const day = time.getDate();
        return [month, day].map(util.formatNumber).join('-');
    },

    // 选择那一天
    dayClick: function(e) {
        let index = e.currentTarget.dataset.index;
        let len = this.data.orderTimeArr.length;
        if (this.data.orderTimeArr[index].botLine) {
            return;
        };
        for (let i = 0; i < len; i++) {
            this.data.orderTimeArr[i].botLine = false;
        };
        this.data.orderTimeArr[index].botLine = true;
        this.setData({
            orderTimeArr: this.data.orderTimeArr,
            whichDay: this.yearsTime + this.data.orderTimeArr[index].value.slice(3)
        });
        this.getorderTime(index);
    },

    // getorderTime 得到各时间段的预约信息
    getorderTime: function(index) {
        // util.showLoadFun("loading");
        this.setData({
            ifShowBotTimeView:0,
        })
        let _this = this;
        let getorderTimeUrl = LoginFunc.domin3 + 'getorder';
        let data = {
            "uid": "5c9ad87190cf1",
        }
        LoginFunc.wxRequest(app, getorderTimeUrl, "POST", data, function(res) {
            if (res.status == 1) {
                _this.timeStamp = res.time * 1000;
                _this.timeHasCheckArr = res.num;
                _this.dealWithStarEnd(index);
            }
        })

    },

    // 处理已经预约的订单信息
    hasOrderInfo:function(index){
        let _this=this;
        let arr = this.timeHasCheckArr;
        let designerNum = this.data.storeInfo.length;
        for(let i=0 ;i<arr.length;i++){
            let timeFlag = Date.parse(arr[i].data + " " + arr[i].appointment);
            for (let j = 0; j < this.data.timeArray.length;j++){
                let arrtiem = Date.parse(this.yearsTime + this.data.orderTimeArr[index].value.slice(3) + " " + this.data.timeArray[j].time);
                if (timeFlag == arrtiem && arr[i].num >= designerNum){
                    this.data.timeArray[j].ifCheck=false;
                };
            };
        };
        this.setData({
            timeArray: this.data.timeArray,
        });
        setTimeout(function(){
            // wx.hideLoading();
            _this.setData({
                ifShowBotTimeView: 1,
            })
        },800)
        
    },

    // 获取电话号码
    getPhoneNumber: function(e) {
        console.log(e);
        let _this = this;
        let telCount = 0;
        if (e && e.detail.iv) {
            let _this = this;
            let getPhoneNumberUrl = LoginFunc.domin2 + 'getphone';
            let data = {
                "encryptedData": e.detail.encryptedData,
                "iv": e.detail.iv,
                "seesion_key": app.globalData.session_key
            }
            LoginFunc.wxRequest(app, getPhoneNumberUrl, "POST", data, function(res) {
                if (res.status == 1) {
                    console.log(res.phone.purePhoneNumber);
                    _this.setData({
                        userCall: res.phone.purePhoneNumber,
                    })
                } else {
                    util.showToastFun("获取失败")
                }
            })

        } else {
            util.showToastFun("获取失败")
        }
    },

    // 姓名输入
    nameInput: function(e) {
        console.log(e);
        let txt = e.detail.value;
        this.setData({
            userName: txt,
        })
    },

    // 电话号码输入
    telInput: function(e) {
        console.log(e);
        let txt = e.detail.value;
        this.setData({
            userCall: txt,
        })
    },

    // txetAreaBindinput 备注信息
    txetAreaBindblur: function(e) {
        console.log(e);
        let txt = e.detail.value;
        this.setData({
            noteTxt: txt
        })
    },

    // srverItemClick 服务选项点击事件
    srverItemClick: function(e) {
        let index = e.currentTarget.dataset.index;
        this.data.serviceArr[index].nowFlag = !this.data.serviceArr[index].nowFlag; 
        this.setData({
            serviceArr: this.data.serviceArr,
        });
        for (let i = 0; i < this.data.serviceArr.length; i++) {
            if (this.data.serviceArr[i].point == "meijia" && this.data.serviceArr[i].nowFlag){
                this.setData({
                    ifShowRackItems2:1,
                })
            };
            if (this.data.serviceArr[i].point == "meijia" && !this.data.serviceArr[i].nowFlag) {
                this.setData({
                    ifShowRackItems2: 0,
                })
            };
            if (this.data.serviceArr[i].point == "meijie" && this.data.serviceArr[i].nowFlag) {
                this.setData({
                    ifShowEyelashItems2: 1,
                })
            };
            if (this.data.serviceArr[i].point == "meijie" && !this.data.serviceArr[i].nowFlag) {
                this.setData({
                    ifShowEyelashItems2: 0,
                })
            };
        }
    },

    // 校验信息
    checkInfo: function() {

        // 服务项目校验
        let serviceCheck = false;
        for (let i = 0; i < this.data.serviceArr.length; i++) {
            if (this.data.serviceArr[i].nowFlag) {
                serviceCheck = true;
            }
        }
        if (!serviceCheck) {
            util.showToastFun("请完善服务项目~");
            return;
        }
        if (!this.data.timeValue.value){
            util.showToastFun("请完善预约时间~");
            return;
        }
        
        // 预约人信息校验
        if (this.data.userName == '' || this.data.userCall == '' || (this.data.userCall && this.data.userCall.length != 11)) {
            util.showToastFun("请完善预约人信息~");
            return
        };

        this.nowOrderClick();
    },

    // 立即预约
    nowOrderClick: function() {
        util.showLoadFun("正在预约");
        let _this = this;
        let nowOrderClickUrl = LoginFunc.domin3 + 'doindex';
        // 卸甲补睫毛
        let armor = (this.data.ifShowRackItems2 ? this.data.xiejia : "") + (this.data.ifShowRackItems2 ? "," : "") + (this.data.ifShowEyelashItems2 ? this.data.bujiemao : "");
        let fuwutypeArr = [];
        for (let i = 0; i < this.data.serviceArr.length; i++) {
            if (this.data.serviceArr[i].nowFlag == 1) {
                fuwutypeArr.push(this.data.serviceArr[i].txt);
            }
        }
        let fuwutype = fuwutypeArr.join(',');
        let data = {
            'uid': "5c9ad87190cf1" || this.postUid,
            "managerid": this.managerid ? this.managerid : '',
            "data":this.data.whichDay,
            "appointment": this.data.timeValue.name,
            "armor": armor,
            "openid": wx.getStorageSync('user_openID'),
            "name": this.data.userName,
            "phone": this.data.userCall,
            "content": this.data.noteTxt,
            "fuwutype": fuwutype,
            "shopname": this.data.storeName,
            "address": this.data.storeAdress,
        }
        LoginFunc.wxRequest(app, nowOrderClickUrl, "POST", data, function(res) {
            console.log(res);
            wx.hideLoading();
            if (res.status == 1) {
                _this.setData({
                    timeValue: {
                        name: "手动选择",
                        value: 0,
                    },
                });
                for (let i = 0; i < _this.data.timeArray.length;i++){
                    _this.data.timeArray[i].nowCheck=false;
                };
                _this.setData({
                    timeArray: _this.data.timeArray,
                })
                wx.navigateTo({
                    url: `/pages/orderList/orderList`,
                })
            } else {
                util.showToastFun("预约失败请重试");
            }
        })
    },

    // 单项选择1
    radioChange1: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        this.setData({
            xiejia: e.detail.value,
        })
    },

    // 单项选择2
    radioChange2: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);
        this.setData({
            bujiemao: e.detail.value,
        })
    },

    // chooseDesigner: 选择设计师
    chooseDesigner: function() {
        wx.navigateTo({
            url: `/pages/servicePeople/servicePeople?designer=${JSON.stringify(this.storeInfo)}`,
        })
    },

    // ifShowTimeChoose 预约时间弹窗
    ifShowTimeChoose: function() {
        this.setData({
            ifShowTimeChoose: !this.data.ifShowTimeChoose,
            ifshowUserView: !this.data.ifshowUserView
        })
        if (this.data.ifShowTimeChoose) {
            for (let i = 0; i < this.data.orderTimeArr.length;i++){
                if (this.data.orderTimeArr[i].botLine){
                    console.log(i,"PPPPPPPPPPP");
                    this.getorderTime(i);
                }
            }
            
        }
    },

    // 拨打电话
    makePhoneCall: function () {
        wx.makePhoneCall({
            phoneNumber: this.data.storeCall
        })
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
        }
        LoginFunc.wxRequest(app, collectFormIdUrl, "POST", data, function (res) {
            console.log("???????")
        })
    },
})