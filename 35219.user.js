// ==UserScript==
// @name            Kill Piu
// @author          cv
// @namespace       http://web.infomoney.com.br
// @description     Kill Piu vol.1
// @include         http://forum.infomoney.com.br/*
// ==/UserScript==

(function() {

	// usuarios ignorados (modifique a vontade)
	var ignore = ["POA-SANGUEEEEEEE", "SuisseMan", "Konga", "Executivo"];

	var ignoreUsers = function() {
		for(i=0; i < ignore.length; i++) {
			var username = ignore[i];
			var xpath = "//tr[td/span/b/text()='" + username + "']/td/span[@class='postbody']";
			var res = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var linkIndex, tr;

			for (linkIndex = 0; linkIndex < res.snapshotLength; linkIndex++) {
				tr = res.snapshotItem(linkIndex);

				// HTML a ser exibido no lugar dos posts ignorados
				tr.innerHTML = "http://www.google.com";
			}
		}
	}

	window.addEventListener("load", ignoreUsers, false);

})();
