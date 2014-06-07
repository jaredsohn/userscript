// ==UserScript==
// @name         uso. TAG CLOUD LINKS
// @version      2013.0904.1311
// @description  userscripts.org. makes each tag in tag clouds a clickable link (linkify tags)
// @namespace    http://userscripts.org/scripts/show/156083
// @author       Tristan DANIEL (PATATE12 aka. jesus2099/shamo)
// @licence      CC BY-NC-SA 3.0 FR (http://creativecommons.org/licenses/by-nc-sa/3.0/fr/)
// @grant        none
// @include      http://userscripts.org/users/*
// @include      https://userscripts.org/users/*
// @exclude      http*://userscripts.org/users/*/*
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";
	var tags = document.querySelectorAll("div#tag-cloud > ol > li");
	for (var t=0; t<tags.length; t++) {
		tags[t].replaceChild(tagLink(tags[t].textContent.trim()), tags[t].firstChild);
	}
	function tagLink(t) {
		var a = document.createElement("a");
		a.setAttribute("href", "/tags/"+t);
		a.style.setProperty("text-decoration", "underline");
		a.appendChild(document.createTextNode(t));
		return a;
	}
})();