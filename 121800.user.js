// ==UserScript==
// @name           Fanfou Clean Up Treeholes
// @namespace      http://userscripts.org/scripts/show/121800
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// @include        http://userscripts.org/scripts/source/121800.meta.js
// @exclude        http://fanfou.com/mentions
// @exclude        http://*.fanfou.com/mentions
// @exclude        http://fanfou.com/treeholes
// @exclude        http://*.fanfou.com/treeholes
// @exclude        http://fanfou.com/treeholes/*
// @exclude        http://*.fanfou.com/treeholes/*
// @exclude        http://fanfou.com/userview/treeholes
// @exclude        http://*.fanfou.com/userview/treeholes
// @exclude        http://fanfou.com/userview/treeholes/*
// @exclude        http://*.fanfou.com/userview/treeholes/*
// @description    Clean up tweets via treeholes in fanfou.
// @updateURL      http://userscripts.org/scripts/source/121800.meta.js
// @author         @imAdam
// @version        2012-01-10
// ==/UserScript==

// 清除神秘树洞
(function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*神.*秘.*树.*洞.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
    setTimeout(cleanup, 1000);
}());