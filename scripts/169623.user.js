// ==UserScript==
// @name         sacem. ISWC PERMALINKS
// @version      2013.0604.1206
// @description  sacem.fr/oeuvres: handy ISWC permalinks
// @namespace    http://userscripts.org/scripts/show/169623
// @author       Tristan DANIEL (PATATE12 aka. jesus2099/shamo)
// @licence      CC BY-NC-SA 3.0 FR (http://creativecommons.org/licenses/by-nc-sa/3.0/fr/)
// @grant        none
// @include      http://www.sacem.fr/oeuvres/oeuvre/*
// @run-at       document-end
// ==/UserScript==
(function(){"use strict";
	var cats = document.querySelectorAll("dd > span.categorie");
	for (var c=0; c<cats.length; c++) {
		if (cats[c].textContent.match(/iswc/i)) {
			var iswc = cats[c].nextSibling;
			iswc.replaceChild(createTag("a",{"a":{"title":"permalink","href":"/oeuvres/oeuvre/rechercheOeuvre.do?q="+iswc.textContent.replace(/[-.]/g,"")}},iswc.textContent), iswc.firstChild);
		}
	}
	function createTag(tag, gadgets, children) {
		var t = document.createElement(tag);
		if(t.tagName) {
			if (gadgets) {
				for (var attri in gadgets.a) { if (gadgets.a.hasOwnProperty(attri)) { t.setAttribute(attri, gadgets.a[attri]); } }
				for (var style in gadgets.s) { if (gadgets.s.hasOwnProperty(style)) { t.style.setProperty(style.replace(/!/,""), gadgets.s[style], style.match(/!/)?"important":""); } }
				for (var event in gadgets.e) { if (gadgets.e.hasOwnProperty(event)) { t.addEventListener(event, gadgets.e[event], false); } }
			}
			if (t.tagName == "A" && !t.getAttribute("href") && !t.style.getPropertyValue("cursor")) { t.style.setProperty("cursor", "pointer"); }
			if (children) { var chldrn = children; if (typeof chldrn == "string" || chldrn.tagName) { chldrn = [chldrn]; } for(var child=0; child<chldrn.length; child++) { t.appendChild(typeof chldrn[child]=="string"?document.createTextNode(chldrn[child]):chldrn[child]); } t.normalize(); }
		}
		return t;
	}
})();