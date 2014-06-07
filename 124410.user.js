// ==UserScript==
// @name           Fanfou Clean Up icaitu
// @namespace      http://userscripts.org/scripts/show/124410
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// @include        http://userscripts.org/scripts/source/124410.meta.js
// @exclude        http://fanfou.com/mentions
// @exclude        http://*.fanfou.com/mentions
// @exclude        http://fanfou.com/photo/*
// @exclude        http://*.fanfou.com/photo/*
// @description    Clean up tweets via icaitu in fanfou.
// @updateURL      http://userscripts.org/scripts/source/124410.meta.js
// @author         @imAdam
// @version        2012-01-29
// ==/UserScript==

// 清除爱采图
(function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*爱.*采.*图.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
    setTimeout(cleanup, 1000);
}());