// Odloty Linkify
// Inspired by: UPS Tracking Linkify (http://plutor.org/files/upslinkify.user.js) by Logan Ingalls
// and SunRocket VoIP Dial Linkify.
//
// Match these patterns:
//
// 800-555-121
// 800 555 121
// 800555121
// 0800555121
// +48800555121
//
// REQUIRES REMOVAL AND BLOCKING OF ODLOTY.PL COOKIES
//
// ==UserScript==
// @name	   odloty linkify
// @namespace      http://*.garsoniera.com.pl/*
// @description    Looks for phone numbers in the page and hyperlinks them to odloty.pl search engine 
// @include        http://*.garsoniera.com.pl/*
// @include        http://*.roksa.pl/*
// @include        http://roksa.pl/*
// @include        http://*.odloty.pl/*
// @include        http://odloty.pl/*
// @include        http://*.odloty.warszawa.pl/*
// @include        http://odloty.warszawa.pl/*
// @include        http://*.sekretki.pl/*
// @include        http://*.grzesznice.pl/*
// @include        http://*.goldenladies.com.pl/*
// @include        http://*.kochanka.pl/*
// @include        http://kochanka.pl/*
// @include        http://*.sexatlas.pl/*
// @include        http://*.romansik.pl/*
// @include        http://*.godzinka.pl/*
// @include        http://*.roxan.pl/*
// @include	   	   https://*.swintuszek.pl/*
// ==/UserScript==


(function () {
	const trackRegex = /\+48\d{9}|[0]\d{9}|\d{9}|\d{3}-\d{3}-\d{3}|\d{3}\s\d{3}\s\d{3}/g;

	function trackUrl(tel) {
		var t = tel.replace(/\s|[-]/, '').replace(/\s|[-]/, '').replace(/^0|^\+48/, '');
		var ph = t.substr(0,3) + t.substr(3,3) + t.substr(6,3);
		
		return "http://www.odloty.pl/search/offers/results.html?cat=women&cat_women=1&cat_women_vip=1&cat_double=1&cat_massage=1&cat_bdsm=1&cat_les=1&cat_pair=1&cat_striptiz_women=1&cat_men=1&cat_gay=1&cat_striptiz_men=1&is_club=1&cat_striptiz_club=1&phone=" + ph;
	}
    // tags we will scan looking for numbers
    var allowedParents = [
	  "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body", 
	  "caption", "center", "cite", "code", "dd", "del", "div", "DIV", "dfn", "dt", "em", 
	  "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
	  "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike", 
	  "s", "strong", "sub", "sup", "td", "table", "tr", "th", "tt", "u", "var"
	  ];
	
    var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" + "]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
	  if (trackRegex.test(cand.nodeValue)) {
	    	var span=document.createDocumentFragment();  
		var source = cand.nodeValue;
		
		trackRegex.lastIndex = 0;
		for (var match = null, lastLastIndex = 0; (match = trackRegex.exec(source)); ) {
		    span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index))); 
		    
		    var a = document.createElement("a");
		    a.setAttribute("href", trackUrl(match[0]));
		    a.appendChild(document.createTextNode(match[0]));
		    span.appendChild(a);

		    lastLastIndex = trackRegex.lastIndex;
		}

		span.appendChild(document.createTextNode(source.substring(lastLastIndex))); 
		span.normalize();
		cand.parentNode.replaceChild(span, cand);
	  }
    }
})();