// ==UserScript==
// @name WGA Workaround
// @namespace d09733c0-fe4c-11d9-8cd6-0800200c9a66
// @description Windows Genuine Advantage Workaround (IE)
// @include http*://*.microsoft.com/*
// ==/UserScript==

(function ()
{
var js = document.createElement("script");
js.setAttribute("language", "JavaScript");
js.setAttribute("type", "text/javascript");
js.text = 'document.cookie="WinGenCookie=validation=0";'
document.getElementsByTagName('head').item(0).appendChild(js);
window.g_sDisableWGACheck='all';
}
)(); 