// Library Flexible Proxy Forwarder script
// version 0.01.
// Date: Sun, 21 Nov 2010 17:36:22 -0500
// Copyright (c) 2010 Jesse Tov
// Copyright (c) 2005,2006,2007,2008 Andrew Perry
// Released under the GPL license v 3 and higher
// http://www.gnu.org/copyleft/gpl.html
// Modified to use redirects instead of url rewriting so that it works
// for the first page. Jonathan Hunt <jjh@42quarks.com>
// Modified slightly to work with NUS Libraries proxy by Aaron Tay
//
// YOU NEED TO EDIT THE VARIABLE proxyname (SEE BELOW) WITH THE DOMAIN
// FOR YOU INSTITUTION'S LIBRARY PROXY ...
//
// Notes:
//
// This is a modified version of Library Ezproxy Forwarder script by
// James Campos:
// http://userscripts.org/scripts/show/90125
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
// select "Library Flexible Proxy Forwarder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flexible Proxy Forwarder
// @namespace     http://www.ccs.neu.edu/home/tov/greasemonkey/
// @description   *** You MUST edit to add your library's proxy, or it won't work
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
// @include       http://www.nature.com/*
// @include       http://www.jstor.org


// ==/UserScript==

// @copyright      2010 Jesse Tov; 2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/

// PUT YOUR INSTITUTION'S DOMAIN IN HERE
var proxyaddress = "http://0-%h.ilsprod.lib.neu.edu%p"
/*
  %h will be replaced by the hostname
  %p will be replaced by the full pathname
*/

function substUrl(loc) {
  var fullpath = loc.pathname
  if (loc.search) fullpath += loc.search;
  if (loc.target) fullpath += loc.target;

  var res      = proxyaddress;
  res = res.replace(/%h/g, loc.hostname);
  res = res.replace(/%p/g, fullpath);
  return res;
}

// This should stop an infinite redirection loop when we are inside the 
// university and the proxy redirects us back to the page.
var pagereferrer = String(document.referrer);
var thispage = String(window.location.href);
GM_log('location.href "' + thispage + '"');
GM_log('document.referrer "' + pagereferrer + '"');

// We are not going through the proxy already, so redirect
if(pagereferrer == "" || thispage.indexOf(pagereferrer) == -1) {
  GM_log('Redirecting through proxy');
  location.href = substUrl(location);
} else {
  // We have been redirected back after trying to use the proxy.
  // This is a hack to reduce the number of redirects when we are inside 
  // the university.
  GM_Log('Not using proxy.');
}
/*
*/
