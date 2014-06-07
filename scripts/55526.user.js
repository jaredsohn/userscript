// ==UserScript==
// @name           Push Google Search Ads Right
// @namespace      http://dodesign.us
// @description    Google recently pushed their search ads left to make more money from search results. Push the ads back to the right with this script.
// @include        http://google.com/*
// @include        http://*.google.com/*
// @include        http://google.com.*/*
// @include        http://google.*/*
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

' #cnt {' +
' max-width:100% !important;' +
'}' + 

' #mbEnd {' +
' width:25% !important;' +
'}' +


'}');
})();