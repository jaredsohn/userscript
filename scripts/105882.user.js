/*
Geocaching Quick GCNumberQuickLookup


--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GCNumberQuickLookup
// @description   Inserts an input field on geocaching.com websites for quickly listing changes
// @namespace     matthias71
// @version       1.2
// @copyright     2011 Matthias Bertram
// @license       
// @include    	  http://geocaching.com/*
// @include    	  http://*.geocaching.com/*

// ==/UserScript==


var newURL, cacheCodeWidget, newElement;

newElement=document.createElement("span");
newURL='http://www.geocaching.com/seek/cache_details.aspx?wp=';

cacheCodeWidget = document.getElementById('ctl00_Breadcrumbs');
if (cacheCodeWidget) {
    newElement.innerHTML = '<span style="text-align:right;margin: 0 auto 0 auto; ' +
    'margin-bottom: 5px; ' +
    'font-size: small; background-color: #ffffff;">' +
    '<form action ="http://www.geocaching.com/seek/cache_details.aspx" name="greaseForm" method="get"> ' +
    '<input type = "text" name ="wp" value="GC" /> ' +
    '<input type = "submit" name ="action" value="Go" /> ' +
    '</span>';

    cacheCodeWidget.parentNode.insertBefore(newElement, cacheCodeWidget.nextSibling);
}


