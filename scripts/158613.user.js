// ==UserScript==
// @name           Saltar publicidad feedsportal.com
// @copyright      JoniJnm.es
// @description    Salta la publicidad de feedsportal.com
// @grant          none
// @include        http://da.feedsportal.com/*
// @version        1.1
// ==/UserScript==

(function () {
    var onLoad = document.body.onload;
    if (onLoad) {
        var url = onLoad.toString() .match(/http[^'|\\]+/);
        if (url && url.length > 0) {
            window.location = url[0];
            return;
        }
    }
    var iframes = document.getElementsByTagName('iframe');
    if (iframes.length === 1) {
        var src = iframes[0].src;
        if (src.match(/https?:\/\//)) {
            window.location = src;
            return;
        }
    }
}) ();
