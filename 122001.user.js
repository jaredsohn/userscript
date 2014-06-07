// ==UserScript==
// @name           Fanfou Clean Up Ontime
// @namespace      http://userscripts.org/scripts/show/122001
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// @include        http://userscripts.org/scripts/source/122001.meta.js
// @exclude        http://fanfou.com/mentions
// @exclude        http://*.fanfou.com/mentions
// @description    Clean up tweets via ontime in fanfou.
// @updateURL      http://userscripts.org/scripts/source/122001.meta.js
// @author         @imAdam
// @version        2012-01-05
// ==/UserScript==

// 清除按时吃饭
(function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*按.*时.*吃.*饭.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
    setTimeout(cleanup, 1000);
}());