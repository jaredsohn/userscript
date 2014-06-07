// ==UserScript==
// @name           Techeblog
// @namespace      http://www.techeblog.com
// @description    Techeblog.com has lots and lots of ads. Remove them from the page to make the website viewable.
// @include        http://www.techeblog.com/*
// ==/UserScript==

var wrap = document.getElementById('wrap');
var divs = wrap.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    if (div.className == 'adblock' || div.id == 'adblock') {
        div.parentNode.removeChild(div);
    }
}
var iframes = wrap.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    iframe.parentNode.removeChild(iframe);
}
