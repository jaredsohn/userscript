// ==UserScript==
// @name           IMDb Plot Keywords index
// @namespace      http://userscripts.org/users/67626
// @description    For keyword contributors. Provides 2 formats of vertical lists of IMDb keywords index.
// @include        http://*.imdb.com/Sections/Keywords/
// @include        http://*.imdb.com/keyword/by_*
// @include        http://widgets.imdb.com/updates/field/keywords/value*
// @grant          GM_addStyle
// @updateURL      http://userscripts.org/scripts/source/88694.meta.js
// @version        2013.04.30
// ==/UserScript==

(function() {
if (window.top != window.self) return; //iframes
switch (window.location.pathname) {
	case "/Sections/Keywords/":
		var ByLetter = document.createElement("div");
		var ByCount = document.createElement("div");
		ByLetter.align = "center";
		ByCount.align = "center";
		ByLetter.innerHTML = '<br />Table view: <a href="http://widgets.imdb.com/updates/field/keywords/value?alpha">A-Z</a> <a href="http://widgets.imdb.com/updates/field/keywords/value?-alpha">Z-A</a>';
		ByCount.innerHTML = '<br />Table view: <a href="http://widgets.imdb.com/updates/field/keywords/value?count" title="descending">&#x25BC;</a> <a href="http://widgets.imdb.com/updates/field/keywords/value?-count" title="ascending">&#x25B2;</a>';
		document.getElementsByClassName("a_to_z_links")[0].appendChild(ByLetter);
		document.getElementsByClassName("a_to_z_links")[2].appendChild(ByCount);
		break;
	case "/updates/field/keywords/value":
		GM_addStyle(".field:link {color: #003399 !important} .field {text-decoration: underline !important}");
		var A = document.getElementsByTagName("a");
		for (i = 0; i < A.length; i++) {
			with (A[i]) {
				if (className == "field" && getAttribute("href") == "#")
					href = "http://www.imdb.com/keyword/" + innerHTML;
			}
		}
		break;
	default:
		with (document.getElementById("main")) {
			innerHTML = innerHTML.replace(/&nbsp;&nbsp; /g, "<br />");
		}
}
})();