// ==UserScript==
// @name           set skin
// @namespace      http://t.qq.com/lifengs
// @description    更换QQ微薄皮肤
// @include        http://t.qq.com/*
// @author         lifengs
// @version        1.0
// ==/UserScript==


var GM_JQ = document.createElement('script'),
    head = document.getElementsByTagName('head');

GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js';
GM_JQ.type = 'text/javascript';

var $;
if (head && head.length && head[0].appendChild) {
    head[0].appendChild(GM_JQ);

    // wait for jQuery to load
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
        else { unsafeWindow.jQuery.noConflict();$ = unsafeWindow.jQuery; getUser(); }
    }
    GM_wait();
}

$("body").css({background:url("http://bizhi.zhuoku.com/2010/08/16/jingxuan/jingxuan241.jpg") no-repeat scroll center top #73CFF1});