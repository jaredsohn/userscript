// ==UserScript==
// @name           Remove Live Mail Ads
// @namespace      allieus.net@gmail.com
// @description    Remove Live Mail Ads
// @include        http://*.mail.live.com/*
// ==/UserScript==

var iframes = document.getElementsByTagName('iframe');
for (var i = 0; i < iframes.length; i++) {
    var iframe = iframes[i];
    if(/^dapIfM/.test(iframe.id)) {
        var container = iframe.parentNode;
        container.style.display = "none";
    }
}
