// ==UserScript==
// @name           Remove Obnoxious Gawker Header
// @namespace      http://dodesign.us/
// @description    Removes the huge header (above the logo) from all Gawker sites including Lifehacker, Valleywag, Consumerist, Gizmodo, and more.
// @include        http://lifehacker.com/*
// @include        http://valleywag.com/*
// @include        http://jalopnik.com/*
// @include        http://consumerist.com/*
// @include        http://gizmodo.com/*
// @include        http://jezebel.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://io9.com/*
// @include        http://*.gawker.com/*
// @include        http://gawker.com/*
// @include        http://defamer.com/*
// @include        http://fleshbot.com/*
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
addGlobalStyle(

'#header_container {' +
' display:none !important;' +
'}' +

'#menubar {' +
' margin-top: 25px !important;' +
'}' +


'}');
})(); 