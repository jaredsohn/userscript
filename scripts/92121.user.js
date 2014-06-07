// ==UserScript==
// @name Automatic DevMode for GWT
// @description Automatically redirects all local pages to use GWT DevMode.  (NB: You should modify the includes to your application's GWT URLs only.)  Script by Jeremy Sharpe: http://blog.publicobject.com/2010/07/gwt-devmode-bookmarklet.html?showComment=1279846393763#c4758518539439096675
// @include http://localhost:8888/*
// @include http://127.0.0.1:8888/*
// 
// ==/UserScript==

var is_in_iframe = function() {
return (window.location != window.parent.location);
}

var enable_devmode =
function() {
if (!is_in_iframe() && window.location.href.indexOf("?gwt.codesvr=127.0.0.1:9997") == -1) {
window.location.replace(window.location + "?gwt.codesvr=127.0.0.1:9997");
}
};

enable_devmode();