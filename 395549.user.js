// ==UserScript==
// @name        Download VeryCD ED2K by Xunlei Lixian
// @namespace   wangtianqi.com
// @author      Tianqi
// @version     1.0
// @grant       none
// @include     *.verycd.com/topics/*
// ==/UserScript==

//html id:'iptcomED2K'
document.body.innerHTML = document.body.innerHTML.replace(/href=\"ed2k:/g, 'href=\"http://lixian.vip.xunlei.com/lixian_login.html?furl=ed2k:');
