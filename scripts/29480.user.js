// ==UserScript==
// @name           hideBanners
// @namespace      fTools
// @description    nasconde i banners dai forum
// @include        http://*.forumcommunity.net/*
// @include        http://*.forumfree.net/*
// ==/UserScript==

function hideBanners() {
var piframes = window.document.getElementsByTagName("IFRAME");
for (var i = 0; i < piframes.length; i++) {piframes[i].style.display = 'none';}
var phref = window.document.getElementsByTagName("A");
for (var i = 0; i < phref.length; i++) if (phref[i].href.indexOf('banner') != -1 || phref[i].href.indexOf('http://ypn') != -1) phref[i].parentNode.style.display = 'none';
}

hideBanners();