// ==UserScript==
// @name          Multi Engine Searcher
// @description	  Adds links to other search engines when searching for something on google.
// @namespace     http://www.geocities.com/binnyva
// @include       http://google.co*/*
// @include       http://www.google.co*/*

//by Binny V A (http://www.geocities.com/binnyva/)
// ==/UserScript==

(function() {
	var loc = document.location.href.toString();
	var parts = loc.split("?")[1].split("&");
	var total = parts.length;
	var bits;
	var query = "";
	for(var i=0;i<total;i++) {
		if(parts[i].indexOf("q=")!=-1) {
			bits = parts[i].split("=");
			if(bits[0] == "q") {
				query = bits[1];
				break;
			}
		}
	}

	if(query) {
		var writing = '<span style="font-size: small;">Try your search on \
<a href="http://search.yahoo.com/search?p='+query+'&amp;ei=UTF-8">Yahoo</a>, \
<a href="http://web.ask.com/web?q='+query+'">Ask Jeeves</a>, \
<a href="http://www.alltheweb.com/search?q='+query+'&amp;cs=utf-8">AllTheWeb</a>, \
<a href="http://s.teoma.com/search?q='+query+'">Teoma</a>, \
<a href="http://search.msn.com/results.aspx?q='+query+'">MSN</a>, \
<a href="http://search.lycos.com/default.asp?query='+query+'">Lycos</a>, \
<a href="http://www.technorati.com/cosmos/search.html?url='+query+'">Technorati</a>, \
<a href="http://www.feedster.com/search.php?q='+query+'">Feedster</a>, \
<a href="http://www.bloglines.com/search?t=1&amp;q='+query+'">Bloglines</a>, \
<a href="http://www.altavista.com/web/results?q='+query+'">Altavista</a></span>';
		var ps = document.getElementsByTagName("p");
		var first_result;
		for(var i=0; i<ps.length; i++) {
			if(ps[i].className == 'g') {
				first_result = ps[i];
				break;
			}
		}
		if(!first_result) first_result = ps[0];
		
		if (first_result) {
			newElement = document.createElement('span');
			first_result.parentNode.insertBefore(newElement, first_result);
			newElement.innerHTML = writing;
		}
	}
})();
