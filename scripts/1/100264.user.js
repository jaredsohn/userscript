// ==UserScript==
// @name           Remove IMDB craps
// @namespace      http://userscripts.org/scripts/show/74736
// @description    remove ads
// @include        http://*.imdb.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#top_ad_wrapper,.mediastrip_container,.mediastrip_big,.cast_list{height:0px ! important;visiblity:hidden ! important;display:none ! important}');
