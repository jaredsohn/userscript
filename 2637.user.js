/*
    Hide Yahoo Groups Ads
    Copy, use, modify, spread as you see fit.
    
    Thanks to Hide Google Adsense Ads, by
    Carlo Zottmann
*/

// ==UserScript==
// @name            Hide Yahoo Groups Ads
// @description     (01-16-2006) Hides Yahoo Groups Ads.
// @include         http://groups.yahoo.com/*
// ==/UserScript==

function RemoveYahooGroupsAds() {
  currentDoc = document;

  try {
      if (currentDoc.getElementById("ygrp-sponsored-links"))  {
        injectCSS("div#ygrp-sponsored-links { display: none; }");
      }
  }
  catch(e) {}
}

function injectCSS(css) {
  head = document.getElementsByTagName("head")[0];
  style = document.createElement("style");
  style.setAttribute("type", 'text/css');
  style.innerHTML = css;
  head.appendChild(style);
}
	
RemoveYahooGroupsAds();