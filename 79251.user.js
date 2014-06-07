// ==UserScript==
// @name           No Ads on XING
// @description    Hide Ads on XING for Non-Premium User
// @author         Stephan Schmitz - code.eyecatch-up.de
// @version        1.0
// @namespace      http://userscripts.org/scripts/show/79251
// @include        http*://www.xing.com/*
// ==/UserScript==


function Clean_XING() {

    var ads = document.getElementById('advertising');
    if (ads && ads.style.display != 'none') { 
    ads.style.display = 'none';  
    }
}

document.addEventListener("DOMNodeInserted", Clean_XING, true);