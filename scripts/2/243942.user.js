// ==UserScript==
// @name        Yahoo news adchoice remover
// @namespace   http://whatever.whoever.why
// @description Remove fake AdChoice stories disguised as news from Yahoo news pages
// @include     http://news.yahoo.com/*
// @version     1
// @grant       none
// ==/UserScript==
document.removead = function () {
    var lis = document.getElementsByTagName('li');
    for (li = 0; li < lis.length; li++) {
        if (lis[li].className.indexOf('rmx-ad') > -1)
        	lis[li].style.display="none";
    }
}
setInterval("document.removead()", 500);