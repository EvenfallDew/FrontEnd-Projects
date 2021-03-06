"use strict"

// 引入对应的less样式
require("../less/index.less");

// 引入swiper的样式文件
require("../libs/swiper/swiper-bundle.min.css");

// 引入swiper的js文件
const Swiper = require("../libs/swiper/swiper-bundle.min.js");

// 加载
$utils.load(1400);

document.ready(function () {
    // 底部封装
    $utils.commonFooter();

    // 轮播
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 自动播放
        autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
    });

    // 获取元素
    let rankNum = document.querySelector("#rankNum");
    let clockNum = document.querySelector("#clockNum");
    let badgeNum = document.querySelector("#badgeNum");
    let clockBtn = document.querySelector("#clockBtn");
    let userId = JSON.parse(window.localStorage.getItem("user")).userId;
    let isClock = true;

    // 获取该账号的数据
    function getData() {
        axios.get($utils.BASE_URL + "/headPageInfo?userId=" + userId).then(function (res) {
            let result = res.data;
            // 获取数据成功
            if (result.status == 0) {
                // 渲染数据
                rankNum.textContent = result.data.rank;
                clockNum.textContent = result.data.punchIn;
                badgeNum.textContent = result.data.insigniaNum;
                // 更改按钮文本
                clockBtn.textContent = result.data.isPunch == "true" ? "已打卡" : "今日打卡";
                // 标记是否打卡
                isClock = result.data.isPunch == "true" ? false : true;
            } else {
                // 获取数据失败,弹窗提示
                $utils.showToast("icon-toast-wrong", "加载失败");
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
    // 页面加载完获取
    getData();

    // 打卡
    clockBtn.addEventListener("click", function () {
        if (isClock == true) {
            axios.get($utils.BASE_URL + "/clockIn?userId=" + userId).then(function (res) {
                let result = res.data;
                // 获取数据成功
                if (result.status == 0) {
                    // 渲染数据
                    getData();
                    // 弹窗提示
                    $utils.showToast("icon-toast-correct", "打卡成功");
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            // 弹窗提示
            $utils.showToast("icon-toast-wrong", "已打卡");
        }
    });

    // 页面跳转
    let dataLink = document.querySelector("#dataLink");
    let badgeLink = document.querySelector("#badgeLink");
    let trainLink = document.querySelector("#trainLink");
    let runLink = document.querySelector("#runLink");
    dataLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./mine_data.html";
        }, 1000);
    });
    badgeLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./mine_badge.html";
        }, 1000);
    });
    trainLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./sports_train.html";
        }, 1000);
    });
    runLink.addEventListener("click", function () {
        $utils.out();
        setTimeout(() => {
            location.href = "./sports_run.html";
        }, 1000);
    });
});