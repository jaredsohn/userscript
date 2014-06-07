// ==UserScript==
// @name              Remove Facebook Sidebar Ticker II
// @namespace         
// @description       Remove the new annoying ticker from the sidebar
// @author            Peter K (@miproduction.se)
// @license           GPL3+ (http://www.gnu.org/copyleft/gpl.html)
// @version           1.0.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*

// ==/UserScript==
function removeSidebarTicker(){
	// document.getElementById('pagelet_rhc_ticker').style.display = "none";
  var tickerDivSidebar = document.getElementById('pagelet_ticker');
  var tickerDiv = document.getElementById('pagelet_rhc_ticker');
  tickerDivSidebar.style.display = "none";
  tickerDivSidebar.nextSibling.style.display = "none";
  tickerDiv.style.display = "none";
}
removeSidebarTicker();
setInterval(removeSidebarTicker,2000);