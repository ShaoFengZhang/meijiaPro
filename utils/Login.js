const domin = "https://dj.58100.com/home/index/"; //线上域名
const domin2 = "https://dj.58100.com/home/shop/"; //线上域名
const domin3 = "https://dj.58100.com/home/order/"; //线上域名
const domin4 = "https://dj.58100.com/home/send/"; //线上域名
const loginURl = `${domin}dologin`;
const checkUserUrl = `${domin}updateUser`;
const srcDomin = "https://dj.58100.com/";
let loginNum=0;
let checkuserNum=0;
const wxloginfnc = (app) => {
    wx.login({
        success: res => {
            let data = {
                code: res.code
            };
            wx.request({
                url: loginURl,
                method: "POST",
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Accept': '+json',
                },
                data: data,
                success: function(value) {
                    if (value.data.status == 1) {
                        wx.setStorageSync('user_openID', value.data.openid);
                        app.globalData.session_key = value.data.session_key;
                        wx.setStorageSync('u_id', value.data.uid);
                        getSettingfnc(app);
                        if (app.orderCallFlag) {
                            app.orderCallFlag = true;
                            app.orderCall?app.orderCall("12"):null;
                        } else {
                            app.orderCallFlag = false;
                        }
                    }else{
                        loginNum++;
                        if (loginNum>=3){
                            loginNum=0;
                            return
                        }
                        wxloginfnc(app);
                    }
                }
            });
        },
    })
};

const getSettingfnc = (app) => {
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    lang: "zh_CN",
                    success: res => {
                        // console.log(res);
                        let iv = res.iv;
                        let encryptedData = res.encryptedData;
                        let session_key = app.globalData.session_key;
                        app.globalData.userInfo = res.userInfo;
                        console.log(app.globalData.userInfo)
                        checkUserInfo(app, res, iv, encryptedData, session_key);
                        if (app.userInfoReadyCallback) {
                            app.userInfoReadyCallback(res);
                        }
                    }
                })
            }
        }
    })
};

const checkUserInfo = (app, res, iv, encryptedData, session_key) => {
    if (wx.getStorageSync('rawData') != res.rawData) {
        wx.setStorage({
            key: "rawData",
            data: res.rawData
        })
        requestURl(app, checkUserUrl, "POST", {
            // rowData: res.rawData,
            // open_id: app.user_OpenId,
            iv: iv,
            encryptedData: encryptedData,
            seesion_key: session_key,
            uid: wx.getStorageSync('u_id'),
        }, function(data) {
            console.log('checkUser', data);
            //失败重新登录
            if (data.status !=1) {
                checkuserNum++;
                if (checkuserNum>=3){
                    checkuserNum=0;
                    return;
                }
                wxloginfnc(app);
            }
        });
    }
};

const requestURl = (app, url, method, data, cb) => {
    wx.showLoading({
        title: 'Loading',
        mask:true,
    })
    wx.request({
        url: url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': '+json',
        },
        data: data,
        method: method,
        success: function(resdata) {
            wx.hideLoading();
            // console.log(url, resdata);
            app.netBlock = 0;
            cb(resdata.data);
        },
        fali: function(res) {
            wx.hideLoading();
            console.log("requestFali", res)
            wx.showModal({
                title: '提示',
                content: '请求失败,请稍后再试',
                showCancel: false,
                success: function(res) {}
            })
        },
        complete: function(res) {
            if (!res.statusCode) {
                app.netBlock++;
                wx.hideLoading();
                console.log("app.netBlock", app.netBlock)
                if (app.netBlock < 3) {
                    requestURl(app, url, method, data, cb)
                } else {
                    app.netBlock = 0;
                    wx.showModal({
                        title: '提示',
                        content: '网络异常,请稍后再试',
                        showCancel: false,
                        success: function(res) {
                            wx.switchTab({
                                url: '/pages/index/index'
                            })
                        }
                    })
                }

            };
            if (res.statusCode == 500) {
                wx.showModal({
                    title: '提示',
                    content: '服务器抛锚了,请稍后再试',
                    showCancel: false,
                    success: function(res) {
                        wx.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                })
            }
        }
    })
};

module.exports = {
    wxRequest: requestURl,
    wxloginfnc: wxloginfnc,
    checkUserInfo: checkUserInfo,
    domin: domin,
    domin2: domin2,
    domin3: domin3,
    domin4: domin4,
    srcDomin: srcDomin,
}