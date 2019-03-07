const domin = "https://dj.58100.com/home/index/"; //线上域名
const loginURl = `${domin}dologin`;
const checkUserUrl = `${domin}updateUser`;
const srcDomin = "https://dj.58100.com/"

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
                        // wx.setStorageSync('u_id', value.data.u_id);
                        // getSettingfnc(app);
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
            open_id: app.user_OpenId,
            iv: iv,
            encryptedData: encryptedData,
            session_key: session_key
        }, function(data) {
            console.log('checkUser', data);
            //失败重新登录
            if (res.code == -1 || res.code == -2) {
                wxloginfnc(app);
            }
        });
    }
};

const requestURl = (app, url, method, data, cb) => {
    wx.request({
        url: url,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': '+json',
        },
        data: data,
        method: method,
        success: function(resdata) {
            // console.log(url, resdata);
            app.netBlock = 0;
            cb(resdata.data);
        },
        fali: function(res) {
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
    srcDomin: srcDomin,
}