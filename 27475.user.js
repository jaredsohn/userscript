// ==UserScript==
// @name           Yahoo Mail cleaner
// @namespace      http://userscripts.org/yahoomailcleaner
// @description    Removes ads from Yahoo Mail (AJAX)
// @include        http://*.mail.yahoo.com/dc/launch*
// ==/UserScript==

if (window.wrappedJSObject.kPartner) {
    window.wrappedJSObject.kPartner.bucket = 0;
}

if(window.yzq_d!=null) {
	window.yzq_d=null;
}
