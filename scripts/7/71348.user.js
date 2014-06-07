// ==UserScript==
// @name           hi.baidu fix layer
// @namespace      http://userscripts.org/users/86496
// @description    Put hi.baidu's content layer back to the ground. | 将百度空间霸道的内容层放回底层。
// @include        http://hi.baidu.com/*
// ==/UserScript==

(function() {

var main = document.getElementById('main');
main.style.zIndex = 1;

})();