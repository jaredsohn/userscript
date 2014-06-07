// ==UserScript==
// @name           woot! ad-hider
// @namespace      vpoet
// @description    Hides ads on all woot! homepages, using ThatOneGuy's facebook script as a base.
// @include        http://*.woot.com/*
// ==/UserScript==

//uses ThatOneGuy's hide all facebook ads script (userscripts.org/scripts/show/32045) as a base.

window.addEventListener("load", function(e) {
  mynewtext=document.createElement('style');
  mynewtext.innerHTML = '.googleAd, .premiumGoogleAd { display: none !important; }';
  document.getElementsByTagName("body")[0].appendChild(mynewtext);
  }, false);