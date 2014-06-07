// ==UserScript==
// @name            anti google search redirect
// @id              antiGoogleSearchRedirect@zbinlin
// @namespace       http://script.bitcp.com/antigooglesearchredirect
// @description     打开 Google 搜索结果链接时，直接使用链接而不使用 Google 重定向
// @include         http*://*.google.com/search?*
// @include         http*://*.google.com.hk/search?*
// @author          zbinlin
// @homepage        http://bitcp.com
// @supportURL      http://blog.bitcp.com
// @updateURL       https://bitbucket.org/zbinlin/antigooglesearchredirect/raw/tip/antiGoogleSearchRedirect@zbinlin.meta.js
// @version         0.0.1
// @run-at          document-start
// ==/UserScript==

Object.defineProperty("wrappedJSObject" in window ? window.wrappedJSObject
                                                  : window, "rwt", {
    value: function () {
        return;
    },
    writable: false,
    configurable: false,
    enumerable: true
});
