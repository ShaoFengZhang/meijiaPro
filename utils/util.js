const formatTime = date => {
    const year = data.getFullYear();
    const month = data.getMonte() + 1;
    const day = data.getDate();
    const hour = data.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};

// 得到一个区间之内的随机数
const getRandom = (max, min) => {
    min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// showToast简单封装一下
const showToastFun = function(ags, time) {
    wx.showToast({
        title: `${ags}`,
        icon: "none",
        duration: time ? time : 1600,
        mask: true,
    });
};

//showLoading简单封装一下
const showLoadFun = function(args) {
    wx.showLoading({
        title: `${args}`,
        mask: true,
    })
}

module.exports = {
    formatTime: formatTime,
    getRandom: getRandom,
    showToastFun: showToastFun,
    showLoadFun: showLoadFun,
}