// Library Ezproxy Forwarder script
// version 0.01.
// Date: 2005-08-25
// Copyright (c) 2005,2006,2007,2008 Andrew Perry
// Released under the GPL license v 3 and higher
// http://www.gnu.org/copyleft/gpl.html
// Modified to use redirects instead of url rewriting so that it works
// for the first page. Jonathan Hunt <jjh@42quarks.com>
// Modified slightly to work with NUS Libraries proxy by Aaron Tay
//
// YOU NEED TO EDIT THE VARIABLE proxyname (SEE BELOW) WITH THE DOMAIN
// FOR YOU INSTITUTIONS EZPROXY / LIBRARY PROXY ....
//
// Notes:
// Ezproxy (http://www.usefulutilities.com/) is a common proxy program used by
// university libraries to allow access to subscription based full-text in journals.
// This plugin adds the proxy domain to outgoing links from journal sites 
// This allows users to automatically follow links through their institutional 
// library proxy for seamless access to journal fulltext (if they are subscribed). 
//
// Could be easily modified to work with other similar proxies like the CoralCDN ..
//
// This is a modified version of Library Ezproxy Forwader script by aarontay.
// http://userscripts.org/users/87321
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Library Ezproxy Forwarder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          EZProxy forwarder
// @namespace     http://greasemonkey.pansapiens.com/
// @description   **** You MUST edit to add your libraries proxy, else it won't work !! Automatically redirects paywalled websites to an Ezyproxy (used by many libraries) to allow access.
// 
// Run as soon as possible on page load (Chrome).
// @run-at document-start 
//
// @include       http://*.wiley.com/*
// @include       http://*.sciencedirect.com/*
// @include       http://*.springerlink.com/*
// @include       http://*.umi.com/*
// @include       http://*.blackwell-synergy.com/*
// @include       http://*.nature.com/*
// @include       http://*.tandf.co.uk/*
// @include       http://*.portlandpress.co.uk/*
// @include       http://*.portlandpress.com/*
// @include       http://*.oxfordjournals.org/*
// @include       http://*.bmjjournals.com/*
// @include       http://scitation.aip.org/*
// @include       http://*apc.org/*
// @include       http://*.biophysj.org/*
// @include       http://*.sciencemag.org/*
// @include       http://*.ingentaconnect.com/*
// @include       http://www.ncbi.nlm.nih.gov/entrez/query.fcgi*
// @include       http://*.annualreviews.org/*
// @include       http://*.proteinscience.org/*
// @include       http://*.informaworld.com/*
// @include       http://portal.acm.org/*
// @include       http://www.mitpressjournals.org/*
// @include       http://*sagepub.com/*
// @include       http://proquest.umi.com/*
// @include       http://muse.jhu.edu/*
// @include       http://www.emeraldinsight.com/*
// @include	    http://www.nature.com/*
// @include       http://www.pnas.org/*


// ==/UserScript==

// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	 GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}



// PUT YOUR INSTITUTIONS EZPROXY DOMAIN IN HERE
var proxyaddress = "http://ezproxy.library.uq.edu.au/login?url="


// This should stop an infinite redirection loop when we are inside the 
// university and the proxy redirects us back to the page.
var pagereferrer = String(document.referrer);
var thispage = String(window.location.href);
GM_log('location.href "' + thispage + '"');
GM_log('document.referrer "' + pagereferrer + '"');

// We are not going through the proxy if this script has run redirect us
if(pagereferrer == "" || thispage.indexOf(pagereferrer) == -1) {
  GM_log('Redirecting through proxy');
  location.href = (proxyaddress + location.href);
} else {
    // We have been redirect back after trying to use the proxy.
    // This is a hack to reduce the number of redirects when we are inside 
    // the university.
  GM_Log('Not using proxy.');
}





