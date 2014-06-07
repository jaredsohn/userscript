// ==UserScript==
// @name           IMDb Plot Keywords alphabetizer
// @namespace      http://userscripts.org/users/67626
// @description    View title plot keywords in alphabetical order. Highlight custom keywords.
// @include        http://*.imdb.com/title/*/keywords*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/36469.meta.js
// @version        2013.05.02
// ==/UserScript==

(function() {
if (window.top != window.self) return; //iframes


var Custom_keywords = new Array();
var Highlight_color = "#CC0000";

/*
To highlight custom keywords, add them to the above "Array", like this:
var Custom_keywords = new Array("maniac", "murder", "wax museum");
(The keywords should be wrapped in quote marks and separated by commas.)

You can also change the highlight color by replacing its code.
Various color codes can be found here: http://w3schools.com/tags/ref_colorpicker.asp
*/



function highlight(x) {
	for (i in x) {
		for (j in Custom_keywords) {
			if (x[i].toLowerCase().match(Custom_keywords[j].toLowerCase())) {
				x[i] = x[i].replace('<a', '<a style="color: ' + Highlight_color + '"');
				break;
			}
		}
	}
}

if (window.location.hostname == "pro.imdb.com") {
	var Keywords = document.getElementsByTagName("br")[1].nextSibling.nextSibling;
	var K = Keywords.innerHTML.split("/ ");
	K.sort();
	if (Custom_keywords[0]) highlight(K);
	Keywords.innerHTML = K.join("<br />");
}
else {
	var KW_content = document.getElementById("keywords_content");
	var L1 = KW_content.getElementsByTagName("a");
	var L2 = new Array();
	for (i = 0; i < L1.length; i++) L2[i] = '<a href="/keyword/' + L1[i].innerHTML.replace(/ /g, "-") + '">' + L1[i].innerHTML + '</a>';
	L2.sort();
	if (Custom_keywords[0]) highlight(L2);
	KW_content.removeChild(document.getElementsByClassName("dataTable")[0]);
	KW_content.innerHTML += '<table class="dataTable evenWidthTable2Col"><tr class="even"><td>' + L2.join('</td></tr><tr class="even"><td>') + '</td></tr></table>';
}
})();