const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        swiperUrls: [{
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
            {
                "icon": "/assets/picture/indexBanner1.png"
            },
        ]
    },

    onLoad: function(options) {
        this.storageLookUserInfo();
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
    getPhoneNumber: function(e) {
        console.log(e);
    },

    // 获取地址
    getAddressFun: function() {
        let _this = this;
        wx.chooseLocation({
            success(res) {
                console.log(res);
                _this.setData({
                    address: res.address,
                })
            }
        })
    },

    //存储查看人的信息
    storageLookUserInfo: function() {
        let _this = this;
        let storageLookUserInfoUrl = LoginFunc.domin2 + 'look';
        let data = {
            'newimgid': "1553067920836"||this.posterImgId,
            'uid': "5c8877cd25a12" ||this.posterUid,
            "seeopenid": wx.getStorageSync('user_openID'),
        }
        LoginFunc.wxRequest(app, storageLookUserInfoUrl, "POST", data, function(res) {
            console.log(res);
            if (res.status == 1) {
                console.log(res);
            } else {
                
            }
        })
    },
})