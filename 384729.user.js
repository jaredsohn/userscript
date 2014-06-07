// ==UserScript==
// @name        enableCopyAndContextMenu.user.js
// @namespace   zhang
// @description enable copy&paste and context menue
// @include     http://chuangshi.qq.com/read/*
// @include     http://www.wcxiaoshuo.com/*
// @version     1
// @grant       GMlog
// ==/UserScript==

function clearEventListeners() {
    document.oncontextmenu = undefined;
    document.oncopy = undefined;
    document.oncut = undefined;
    document.onpaste = undefined;
    document.onselectstart = undefined;
    
    document.body.removeAttribute("oncopy");
    document.body.removeAttribute("ondrag");
    document.body.removeAttribute("oncontextmenu");
    document.body.removeAttribute("onselectstart");
}

window.addEventListener('load', clearEventListeners, false);