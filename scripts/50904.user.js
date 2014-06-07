// ==UserScript==
// @name           Digg.com Disable Announcements and Promos
// @namespace      http://www.sernerdalot.com
// @description Disables Announcements and Promos
// @version     1.0.1
// @date        2010-2-13
// @creator     mikec20
// @include     http://digg.com/*
// @include     http://*.digg.com/*
// ==/UserScript==



var allDivs = document.getElementsByTagName('div');
var topDivs = new Array();
for (var i=0; i < allDivs.length; i++) {
    if(allDivs[i].getAttribute('id') == 'announce' || allDivs[i].getAttribute('class') == 'promo' || allDivs[i].getAttribute('class') == 'rec-info' ) {
        topDivs.push(allDivs[i]);
        allDivs[i].style.display = 'none';
    }
}


//allDivs[i].getAttribute('id') == 'recommended-list' || allDivs[i].getAttribute('class') == 'promo' || allDivs[i].getAttribute('class') == 'side-container' 