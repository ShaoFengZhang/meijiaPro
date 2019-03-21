const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
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

        defaultTimeTxt: "请选择您的上下班时间",
        multiIndex: [8, 0, 17],
        dayArr:[
            {
                "txt":"周一",
                "classname":"noSelectDay",
                "flag":1,
            },
            {
                "txt": "周二",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "周三",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "周四",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "周五",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "周六",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "周日",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "没有休息日",
                "classname": "selectDay",
                "flag": 1,
            },

        ],
        serviceProject:[
            {
                "txt": "美甲",
                "classname": "noSelectDay",
                "flag": 1,
            },
            {
                "txt": "美睫",
                "classname": "selectDay",
                "flag": 1,
            },
            {
                "txt": "半永久",
                "classname": "selectDay",
                "flag": 1,
            },
            {
                "txt": "手部护理",
                "classname": "selectDay",
                "flag": 1,
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
})