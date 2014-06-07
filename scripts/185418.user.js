// ==UserScript==
// @name TVComQuoteRig
// @namespace TVComQuoteRig
// @include http://www.tv.com/features/best-of-2013/best-quotes/
// @version 1.0
// @grant none
// ==/UserScript==

var rigIt = function () {
    setTimeout(function(){ $("div[data-user='cappergeneral'] div.vote_up_action").click(); },3000);
    setTimeout(function(){ location.reload(); },6000);
};

var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + rigIt.toString() + ')();';
document.body.appendChild(script);