// ==UserScript==
// @name              Remove Facebook Sidebar Ticker
// @namespace         
// @description       Remove the new annoying ticker from teh sidebar
// @author            Eyal Shahar (@eyalshahar)
// @license           GPL3+ (http://www.gnu.org/copyleft/gpl.html)
// @version           1.0.1
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*

// ==/UserScript==
function removeSidebarTicker(){
	document.getElementById('pagelet_rhc_ticker').style.display = "none";
}
removeSidebarTicker();
setInterval(removeSidebarTicker,2000);