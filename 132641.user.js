// ==UserScript==
// @name	LeMonde Without Live Window
// @description	Disable lemonde.fr live window
// @include     http://www.lemonde.fr/*
// ==/UserScript==

(function() {
    try {
	// Drop the live feed anchors from parent documents
	var xpath = '//div[@class="conteneur_en_continu" or @class="conteneur_lives" ' +
                    'or contains(@class, "conteneur_alerte")]';
	var iter = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
	// For some reasons I could not get a snapshot in my mozilla version
	var nodes = []
	var n = iter.iterateNext();
	while (n) {
	    nodes.push(n);
	    n = iter.iterateNext();
	}
	for(var i=0; i != nodes.length; i+=1) {
	    nodes[i].parentNode.removeChild(nodes[i]);
	}
    } catch(e) {
	GM_log(e);
    }
})()