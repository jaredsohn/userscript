// ==UserScript==
// @name          Gigapedia
// @namespace     http://martinmr.scripts.mit.edu
// @description	  removes ads and sets default search engine to gigapedia
// @author        Martin Mtz
// @include       http*://*gigapedia.com/*
// @include       http*://*gigapedia.info/*
// ==/UserScript==

document.getElementById("searchTypeSelect").value="gigapedia";
document.getElementById("esn2").style.visibility="hidden";
document.getElementById("esn3").style.visibility="hidden";
document.getElementById("gigle").style.visibility="hidden";
document.getElementById("esn2").style.height=0;
document.getElementById("esn3").style.height=0;
document.getElementById("gigle").style.height=0;


