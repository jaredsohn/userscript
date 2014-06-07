// ==UserScript==
// @name        bib - move author
// @namespace   diff
// @include     http*://bibliotik.org/*torrents*
// @include     http*://bibliotik.org/collections/*
// @grant	GM_addStyle
// @version     0.4
// ==/UserScript==

GM_addStyle("span.title { font-weight: normal !important; }");
GM_addStyle("span.torYear, span.torFormat, span.torRetail, span.taglist { font-size: 85%; }");

var spans = document.querySelectorAll('span.title');
for (i=0; span=spans[i]; i++) {
	cell=span.parentNode;
	cell.style.padding = "0.5em";

	//var p = document.createElement('p');
	//p.style.fontSize = '40%';
	//span.parentNode.insertBefore(p, span.parentNode.firstChild);	
	
	var linkos = span.parentNode.querySelectorAll('a');
	var newlinks = new Array();
	for (a=(linkos.length-1); a>0; a--) {
		var src = linkos[a].href;
		if (src.indexOf("/creators/") != -1) {
			linkos[a].style.fontWeight = 'bold';
			newlinks.unshift(linkos[a].outerHTML);
			linkos[a].parentNode.removeChild(linkos[a]);
		}
	}
	
	if (newlinks.length > 0) {
		var s = document.createElement('span');
		s.style.fontSize = "85%";
		s.innerHTML = newlinks.join(', ');
		s.innerHTML += "<p style='fontsize:30%;'></p>";
		span.parentNode.insertBefore(s, span.parentNode.firstChild);
	}
}
