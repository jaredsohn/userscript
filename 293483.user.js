// ==UserScript==
// @name          CSS Relative
// @description   Forces CSS to be relative to current transfer type.
// @version       1.0.1
// @author        c_14
// @include       https://*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var link = head.getElementsByTagName('link');
var script = head.getElementsByTagName('script');

for (var i in link) {
    link[i].href = link[i].href.replace("http://", "https://");
}

for (var i in script) {
    script[i].src = script[i].src.replace("http://", "https://");
}
