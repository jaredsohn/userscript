// ==UserScript==
// @name           TED.com show full titles
// @namespace      http://www.davidfichtmueller.de
// @description    replaces the incomplete titles (the ones which end with "...") with the corresponding full titles
// @include        http://www.ted.com/talks
// @include        http://www.ted.com/talks/
// @include        http://www.ted.com/talks/list
// @include        http://www.ted.com/talks/list/*
// @include        http://www.ted.com/talks/list?page=*
// @include        http://www.ted.com/talks/list/page/*
// @include        http://www.ted.com/index.php/talks
// @include        http://www.ted.com/index.php/talks/
// @include        http://www.ted.com/index.php/talks/list
// @include        http://www.ted.com/index.php/talks/list/*
// @include        http://www.ted.com/index.php/talks/list?page=*
// @include        http://www.ted.com/index.php/talks/list/page/*
// ==/UserScript==

var links = document.evaluate("id('container')/div[2]//dd/h4/a", document, null, 6, null);
for (var i = 0; i < links.snapshotLength; i++) {
	var element = links.snapshotItem(i);
	if(element.innerHTML.substr(-3) == "..." ) {
		element.innerHTML = element.title;
	}
}