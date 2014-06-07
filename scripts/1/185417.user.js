// ==UserScript==
// @name TVComAnimRig
// @namespace TVComAnimRig
// @include http://www.tv.com/m/features/best-of-2013/vote/poll/SpecialFeatures:list:best-animated-series-2013
// @version 1.0
// @grant none
// ==/UserScript==

var rigIt = function () {
    setTimeout(function(){ $("div[data-itemid='s:79180'] div.checkbox").click(); },2000);
    setTimeout(function(){ location.reload(); },4000);
};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + rigIt.toString() + ')();';
document.body.appendChild(script);