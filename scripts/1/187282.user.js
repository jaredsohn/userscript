// ==UserScript==
// @name           fxxk isp redirct
// @namespace      joyfun.net
// @description    too old theme
// ==/UserScript==
var ourl = window.location.href;
if(ourl.indexOf('https')<0&&ourl.indexOf('?')<0){
window.location=ourl+'?k=1';
}
