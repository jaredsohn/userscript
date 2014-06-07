// ==UserScript==
// @name           Facebook Remove Friends Ticker
// @namespace      wouther
// @description    Removes the friends ticker from the sidebar.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        0.2 - September 22nd, 2011
// ==/UserScript==

function hideTicker()
{
  var tickerDivSidebar = document.getElementById('pagelet_ticker');
  var tickerDiv = document.getElementById('pagelet_rhc_ticker');
  tickerDivSidebar.style.display = "none";
  tickerDivSidebar.nextSibling.style.display = "none";
  tickerDiv.style.display = "none";
}

window.onload = hideTicker();