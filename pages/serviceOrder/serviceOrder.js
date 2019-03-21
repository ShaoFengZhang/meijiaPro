const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        serviceArr:[
            {
                "name":"美甲",
                "nowClass":"noselect"
            },
            {
                "name":"美睫",
                "nowClass": "select"
            },
            {
                "name":"半永久",
                "nowClass": "noselect"
            },
        ],
        rackItems: [
            { name: '卸完再做', value: '卸完再做' },
            { name: '只卸甲', value: '只卸甲', checked: 'true' },
        ],
        eyelashItems: [
            { name: '不补睫毛', value: '不补睫毛' },
            { name: '只补睫毛', value: '只补睫毛',checked: 'true' },
        ],
        orderTimeArr:[
            {
                "day":"03-14",
                "time":{
                   "itemTime" :"8:30",
                   "iforder":1
                }
            },
            {
                "day": "03-15",
                "time": {
                    "itemTime": "8:30",
                    "iforder": 1
                }
            },
            {
                "day": "03-16",
                "time": {
                    "itemTime": "8:30",
                    "iforder": 1
                }
            },
            {
                "day": "03-17",
                "time": {
                    "itemTime": "8:30",
                    "iforder": 1
                }
            },
        ]
    },

    onLoad: function(options) {

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

    // 获取电话号码
    getPhoneNumber: function (e) {
        console.log(e);
    },

    // 拨打电话
    makePhoneCall: function() {
        wx.makePhoneCall({
            phoneNumber: '13062537515' 
        })
    },

    // 单项选择1
    radioChange1:function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },

    // 单项选择2
    radioChange2: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
    },
})