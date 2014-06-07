// ==UserScript==
// @name           Facebook Remove Friends Ticker
// @namespace      nl.choong
// @description    Removes the friends ticker on the right hand side of your screen.
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @version        0.4 - September 25th, 2011
// ==/UserScript==

function doAllTheHardWork()
{
  // Remove "regular" ticker
  var tickerDiv = null;
  if (tickerDiv = document.getElementById('pagelet_rhc_ticker'))
  {
    var reg = new RegExp('(\\s|^)tickerOnTop(\\s|$)');
    tickerDiv.parentNode.parentNode.className = tickerDiv.parentNode.parentNode.className.replace(reg, ' ');
    tickerDiv.parentNode.removeChild(tickerDiv);
  }

  // Remove ticker above chat sidebar
  var sidebarTickerDiv = null;
  if (sidebarTickerDiv = document.getElementById('pagelet_ticker'))
  {
    sidebarTickerDiv.parentNode.removeChild(sidebarTickerDiv);
  }

  if (document.addEventListener)
  {
    document.addEventListener("DOMNodeInserted", doAllTheHardWork, false);
  }
}

window.onload = doAllTheHardWork();