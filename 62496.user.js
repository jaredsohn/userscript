// ==UserScript==
// @name           Userscripts.org Search Enhancer
// @namespace      #aVg
// @description    Enhances the searcing experience on userscripts.
// @include        http://userscripts.org/*
// @version        0.1
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
function $(A) {return document.getElementById(A)}
var label = $("script_q_label").firstChild, query = $("script_q"), search = $("script_search");
(function() {
	if(!search) return;
	GM_addStyle("#script_search > * {float:left}");
	var alt = document.createElement("input");
	alt.type = "checkbox";
	alt.addEventListener("click", function() {
		query.value = label.nodeValue = "Search all " + (this.checked ? "posts" : "scripts");
		search.action = "/" + (this.checked ? "pos" : "scrip") + "ts/search";
	}, false);
	search.insertBefore(alt, search.firstChild);
	function remove(A) {A.parentNode.removeChild(A)}
	var fsearch = document.evaluate("//form[@action='/posts/search']", document, null, 9, null).singleNodeValue;
	if(fsearch) {
		if(fsearch.nextElementSibling) remove(fsearch);
		else {
			remove(fsearch.parentNode);
			$("content").style.width = "100%";
		}
	}
})();