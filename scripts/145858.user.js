// ==UserScript==
// @name           IframeKiller (Neobux)
// @description    Kill Iframes on Neobux Ads
// @include        http://*.neobux.com/*
// @grant 		   none
// ==/UserScript==


var iF = document.getElementById('iF');
iF.width = "0%";
