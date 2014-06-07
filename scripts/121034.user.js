// ==UserScript==
// @name  Fanfou Clean Up
// @author @Luahou, @nos. , @imvenj
// @version 1.3
// @namespace http://venj.me/fanfou
// @include        http://fanfou.com/*
// @include        http://*.fanfou.com/*
// ==/UserScript==

function cleanup() {
    var methods = document.getElementsByClassName("method");
    for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        if (/.*按.*时.*吃.*饭.*/.test(method.innerHTML)) {
            method.parentElement.parentElement.hidden = true;
        };
    }
};

cleanup();
var more=document.getElementById("pagination-more");
more.onclick=function(){
    setTimeout(cleanup, 2000);
};
var tlnoti=document.getElementById("timeline-notification");
tlnoti.onclick=function(){
    setTimeout(cleanup, 2000);
};
