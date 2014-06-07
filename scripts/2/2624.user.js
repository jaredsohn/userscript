// ==UserScript==
// @name          sport1 ad removal
// @namespace     http://yuppx.net/userscripts
// @description	  removes ad areas on sport1.de
// @include       http://www.sport1.de/*
// ==/UserScript==
// Notes:
//   * is a wildcard character
//   .tld is magic that matches all top-level domains (e.g. .com, .co.uk, .us,etc.)


document.getElementsByTagName("BODY")[0].removeChild(document.getElementById("skyscraper"));
document.getElementsByTagName("BODY")[0].removeChild(document.getElementById("fbl"));
document.getElementsByTagName("BODY")[0].removeChild(document.getElementById("sky"));
document.getElementsByTagName("BODY")[0].removeChild(document.getElementById("adpopup"));

