// ==UserScript==
// @name           Facebook Ticker Remover
// @namespace      http://www.userscripts.org
// @description    Removes the ticker sidebar
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;

window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

	// Removes the ticker that appears on the page
	var fbTickerSidebar = document.getElementById('pagelet_rhc_ticker');
	if (fbTickerSidebar) {
		fbTickerSidebar.parentNode.removeChild(fbTickerSidebar);
	}
	// Removes the ticker that appears in the dynamic chat sidebar
	var fbTickerSidebar2 = document.getElementById('pagelet_ticker');
	if (fbTickerSidebar2) {
		fbTickerSidebar2.parentNode.removeChild(fbTickerSidebar2);
	}
}

function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 1); //-- 1ms, adjust as necessary
}