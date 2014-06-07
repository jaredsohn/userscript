// JavaScript Document
// ==UserScript==
// @name          MYTV Auto Refresher
// @website       http://blog.sina.com.cn/xMoneyHome
// @description   Auto Refreshes the MYTV page every 45 seconds
// @author        xMoney
// @license       Free
// @version       1.0.0
// @e-mail        xMoney@yeah.net
// @include       https://megayoutubeviews.com/view/*
// @exclude       
// ==/UserScript==

// 您可以用文本编辑器把"var time = "后的数值修改为您需要的自定义时间（单位是"毫秒"）

var time = 45000;

//    0 毫秒 = 0 秒
//  500 毫秒 = 0.5 秒
// 1000 毫秒 = 1 秒
// 2000 毫秒 = 2 秒
// 3000 毫秒 = 3 秒
// ......
              
window.setTimeout(

function() {
     window.location.reload();
}, time);