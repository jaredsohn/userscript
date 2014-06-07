// ==UserScript==
// @name           Torrentleech Adremove
// @namespace      http://www.stud.ntnu.no/~aase/
// @description    Removes the entire ad box from Torrentleech.org
// @include        http://www.torrentleech.org*
// @include        http://torrentleech.org*
// ==/UserScript==

(function() {
	var res = document.evaluate("//iframe/../../../../../../..", document, null, XPathResult.ANY_TYPE,null).iterateNext();
	if (res) res.innerHTML = "";
})();