// ==UserScript==
// @name			DDG++
// @description		        Replace header's links with contents oriented links.
// @include			https://www.duckduckgo.com/*
// @include			https://duckduckgo.com/*
// @include			http://duckduckgo.com/*
// @author			nabeschin
// @version			1.0.5
// @lastupdated		        11-02-2011
// ==/UserScript==

var hfi = document.getElementById("hfi");
var query = hfi.value;
var hbw = document.getElementById("hbw");
var hb1 = document.getElementById("hb");
var hb2 = document.createElement("ul");

GM_addStyle("hb2 { list-style: none; margin:0 auto; } li { display:inline; font-size: 13px; } li a { color: #1168CC; } li a:link { text-decoration:none; } li a:hover { color:white; background-color: #71B9EA; } ");
hbw.removeChild(hb1);
hb2.innerHTML = '<li><a href="http://www.bing.com/images/search?q=' + query + '&FORM=BIFD" title="Bing Images">Images</a> - </li><li><a href="http://maps.google.com/maps?q=' + query + '" title="Google Maps">Maps</a> - </li><li><a href="http://www.bing.com/news/search?q=' + query + '&FORM=BNFD" title="Bing News">News</a> - </li><li><a href="http://www.youtube.com/results?search_query=' + query + '&aq=f" title="YouTube">Videos</a> - </li><li><a href="http://www.kurrently.com/search/' + query + '" title="Kurrently">Real-time</a> - </li><li><a href="http://www.pricegrabber.com/' + query + '/products.html/form_keyword=' + query + '/st=query/sv=search_top/" title="PriceGrabber.com">Shopping</a></li>';
hbw.appendChild(hb2);