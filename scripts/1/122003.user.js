// ==UserScript==
// @name           Fanfou Clean Up LBS
// @namespace      http://userscripts.org/scripts/show/122003
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// @include        http://userscripts.org/scripts/source/122003.meta.js
// @exclude        http://fanfou.com/mentions
// @exclude        http://*.fanfou.com/mentions
// @exclude        http://fanfou.com/photo/*
// @exclude        http://*.fanfou.com/photo/*
// @description    Clean up tweets via LBS in fanfou.
// @updateURL      http://userscripts.org/scripts/source/122003.meta.js
// @author         @imAdam
// @version        2012-02-15
// ==/UserScript==

// 清除街旁
(function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*街.*旁.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
    setTimeout(cleanup, 1000);
}());

// 清除开开Kai
(function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*开.*开.*Kai.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
    setTimeout(cleanup, 1000);
}());