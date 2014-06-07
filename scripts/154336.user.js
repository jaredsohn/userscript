// ==UserScript==
// @name        屏蔽热门小站
// @namespace   http://userscripts.org/users/496479
// @description 屏蔽底部热门小站一栏
// @include     http://zhan.renren.com/*
// @version     1
// ==/UserScript==

var bar = document.getElementById("rogue-suggest");
bar.style.display = "none";