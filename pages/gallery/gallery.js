const app = getApp();
import util from '../../utils/util.js';
import LoginFunc from '../../utils/Login.js';
Page({

    data: {
        dataArray: [],
        srcUrl: LoginFunc.srcDomin,
        imgWidth:340,
        imgArr: [],
        col1: [],
        col2: [],
        loadingCount: 0,
    },

    onLoad: function(options) {

        this.urlPage = 1;
        this.rows = 9;
        this.cangetData = true;
        this.col1H = 0;
        this.col2H = 0;
        this.setData({
            imgArr: [],
            col1: [],
            col2: [],
            loadingCount: 0,
        })
        this.getDataFun();
    },

    onTabItemTap: function() {
        // this.urlPage = this.topPage ? this.topPage : 1;
        // this.urlPage = 1;
        // this.rows = 9;
        // this.cangetData = true;
        // this.col1H = 0;
        // this.col2H = 0;
        // this.setData({
        //     imgArr: [],
        //     col1: [],
        //     col2: [],
        //     loadingCount: 0,
        // })
        // this.getDataFun();
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

    bindscrolltolower: function() {
        console.log(123);
        if (this.cangetData) {
            this.urlPage++;
            this.getDataFun();
        }
    },

    // 请求数据
    getDataFun: function() {
        // util.showLoadFun('Loading');
        let _this = this;
        let getDataFunUrl = LoginFunc.domin + 'doimages';
        this.topPage = this.urlPage;
        let data = {
            page: this.urlPage,
            rows: this.rows,
        };

        LoginFunc.wxRequest(app, getDataFunUrl, "GET", data, function(res) {
            // wx.hideLoading();
            console.log(res);
            if (res.status == 1) {
                _this.setData({
                    // ["dataArray[" + (_this.urlPage - 1) + "]"]: res.images,
                    imgArr: _this.data.imgArr.concat(res.images),
                    loadingCount: res.images.length,
                });
                if ((res.images.length % _this.rows) != 0) {
                    _this.cangetData = false;
                }
            }
        })
    },

    // 查看图片
    checkImage: function(e) {
        console.log(e.currentTarget.dataset.urlsrc);
        let urlSrc = e.currentTarget.dataset.urlsrc;
        wx.previewImage({
            urls: [urlSrc]
        });
    },

    // onImageLoad
    onImageLoad: function(e) {
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width; //图片原始宽度
        let oImgH = e.detail.height; //图片原始高度
        let imgWidth = this.data.imgWidth; //图片设置的宽度
        let scale = imgWidth / oImgW; //比例计算
        let imgHeight = oImgH * scale; //自适应高度
        let images = this.data.imgArr;
        let imageObj = null;

        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            if (img.id === imageId) {
                imageObj = img;
                break;
            }
        }

        imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;

        //判断当前图片添加到左列还是右列
        if (this.col1H <= this.col2H) {
            this.col1H += imgHeight;
            col1.push(imageObj);
        } else {
            this.col2H += imgHeight;
            col2.push(imageObj);
        }

        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2
        };

        //当前这组图片已加载完毕，则清空图片临时加载区域的内容
        if (!loadingCount) {
            data.images = [];
        }

        this.setData(data)
    },
})