// ==UserScript==
// @name           Neopet Autoplayer
// @namespace      userscripts.org
// @description    Autoplayer for neopet game
// @include        http://www.neopets.com/space/gormball.phtml*
// @include        http://www.neopets.com/space/gormball2.phtml*
// ==/UserScript==

if (window.location.toString().indexOf('gormball2.phtml') != -1) {
	if (document.forms.namedItem('gormform')) { // exploded?
		var x = document.evaluate("//form[@action='gormball2.phtml']//input[@type='submit']/@onclick", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		if (x.singleNodeValue != null) { // Next
			window.location.href = "javascript:void((function(){" + x.singleNodeValue.textContent + "})());";
		} else { // Continue
			x = document.evaluate("//form[@action='gormball2.phtml']//input[@type='button']/@onclick", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			if (x.singleNodeValue != null) window.location.href = "javascript:void((function(){" + x.singleNodeValue.textContent + "})());";
		}
		//
	} else { // Play again?
		var f = document.evaluate("//form[@action='gormball.phtml']//input[@type='submit']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		f.singleNodeValue.parentNode.submit();
	}
} else {
	var s = document.getElementsByName('player_backed')[0];
	s.options[4].value = 0;
	s.options[4].selected = true;
}