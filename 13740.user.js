// ==UserScript==
// @name           Facebook highlight news feed ads
// @namespace      http://www.glump.net
// @author         Brendan Kidwell
// @description    Highlight news feed ads on Facebook so you can more easily ignore them.
// @include        http://*facebook.tld/*
// @include        https://*facebook.tld/*
// ==/UserScript==

(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.ad_capsule { background-color: #aef; }');

})();
