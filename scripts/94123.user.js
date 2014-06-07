// ==UserScript==
// @name           Prevent Clickjacking
// @namespace      http://userscripts.org/users/10897
// @version        1.1
// @include        http://*
// @include        https://*
// ==/UserScript==

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML = "iframe { opacity: 1 !important; filter:alpha(opacity=100) !important; }";
document.getElementsByTagName('head')[0].appendChild(style);

var iframes = document.getElementsByTagName('iframe');
for (var i in iframes) {
    if (iframes[i].tagName.toLowerCase() == 'iframe') {
        var oldstyle = iframes[i].getAttribute('style');
        if (oldstyle == null) oldstyle = ''; else oldstyle = oldstyle + ';'
        iframes[i].setAttribute('style', oldstyle + 'opacity: 1 !important; filter:alpha(opacity=100) !important;');
    }
}