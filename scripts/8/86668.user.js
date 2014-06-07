// ==UserScript==
// @name          TPB Google Search
// @author        Alia_Erenel
// @description   Add Custom Google Search to TPB
// @include       http://www.google.*
// @exclude       http://www.google.ca/imghp*
// ==/UserScript==

var gsearch = document.createElement('div');
gsearch.innerHTML =
    '<form action=http://www.google.com/cse id=cse-search-box target=_blank>' +
    '<input name=cx type=hidden value=008094591875970302321:aitcu1xylui />' +
    '<input name=q size=68 />' +
    '<p><input name=sa type=submit value="Pirate Search" /></p>' +
    '</form>';
	gsearch.style.textAlign = 'center';


	var gloc = document.getElementById("lga");
	gloc.parentNode.insertBefore(gsearch, gloc.nextSibling);