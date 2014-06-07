// ==UserScript==
// @name           Vote every 20 seconds
// @namespace      www.amlw.com
// @include        http://weareaustin.keyetv.com/*
// @include        http://weareaustin.tv/*
// ==/UserScript==

function eventClickOn() {
    var evt = document.createEvent("HTMLEvents");
    var link = document.getElementById("task_button");
    evt.initEvent("click", true, true);
    link.dispatchEvent(evt);
}

window.setTimeout(function() { document.getElementById("p14").checked=true }, 6000);
window.setTimeout(eventClickOn, 6100);

    delCookie("ec88f6924d20070e4b07a5ca10cad5e0");
    delCookie("__utma");
    delCookie("__utmb");
    delCookie("__utmc");
    delCookie("__utmz");
    delCookie("voted2");
    delCookie("ec88f6924d20070e4b07a5ca10cad5e0");
    delCookie("__utma");
    delCookie("__utmb");
    delCookie("__utmc");
    delCookie("__utmz");
    delCookie("voted2");

function delCookie(name) {	
document.cookie = name + "=; expires=Thu, 01-Jan-70 00:00:01 GMT" + "; path=/";	
}	
