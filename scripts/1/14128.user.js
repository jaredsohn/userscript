// ==UserScript==
// @name           Remove Naver Ads
// @namespace      sanxiyn@gmail.com
// @include        http://*.naver.com/*
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    if (!/naver.com\/adshow/.test(iframe.src))
        continue;
    var container = iframe.parentNode
    var replacement = document.createElement('div');
    container.insertBefore(replacement, iframe);
    replacement.innerHTML = 'Naver Ads Removed';
    container.removeChild(iframe);
    i--;
}
