// ==UserScript==
// @name        overdrive library - btik links
// @namespace   diff
// @include     http*://*.lib.overdrive.com/*/SearchResultsList.htm*
// @include     http*://*.lib.overdrive.com/*/SearchResults.htm*
// @include     http*://*.lib.overdrive.com/*/SearchResultsGrid.htm*
// @include     http*://*.lib.overdrive.com/*/Default.htm*
// @version     0.2
// @grant       none
// ==/UserScript==

var title = document.querySelectorAll('div[class*="trunc-title-line"]');
for (i=0; elm=title[i]; i++) {
	var str = elm.textContent.trim();
	str = str.replace(/\s+/gi,"+");
	str = escape(str);
	var link = "https://bibliotik.org/torrents/?search=%40title+%22"
		+ str + "%22";
 	elm.innerHTML += " <a href='" + link + "' style='font-size:90%'>[btik]</a>";
}