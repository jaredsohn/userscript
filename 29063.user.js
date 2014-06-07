// ==UserScript==
// @name           DocBook CSS-enabler
// @namespace      db.style
// @description    This script complements DocBook Styler (http://userstyles.org/styles/8302)
// @author         Arnau Siches
// @homepage       http://blog.esbudellat.net
// ==/UserScript==


(function() {
	var root = document.documentElement;
	if ( root.tagName == "article" | root.tagName == "book" | root.tagName == "chapter" | root.tagName == "part" ) {
		var pi = document.createProcessingInstruction('xml-stylesheet', 'type="text/css"');
		document.getElementsByTagName( root.tagName )[0].appendChild(pi);
	}
})();
