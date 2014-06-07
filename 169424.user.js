// ==UserScript==
// @name        bib - highlight retail
// @namespace   diff
// @include     http*://bibliotik.org/*torrents*
// @include     http*://bibliotik.org/collections/*
// @include     http*://bibliotik.org/uploads*
// @include     http*://bibliotik.org/users/*
// @grant	none
// @version     0.6
// ==/UserScript==

var spans = document.querySelectorAll('span.title');
for (i=0; cell=spans[i].parentNode; i++) {
	if (cell.textContent.indexOf("[Retail]") != -1) {
		cell.style.backgroundColor='#D4D4FF';
	}
}