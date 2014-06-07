// ==UserScript==
// @name           Kill Windowless Flash
// @namespace      http://www.jantrid.net/axSGrease/
// @description    Makes windowless (transparent or opaque) Adobe Flash objects windowed so they have a chance of being accessible.
// @author James Teh <jamie@jantrid.net>
// @copyright 2011-2012 James Teh
// @license GNU General Public License version 2.0
// @version 0.20120724.01
// @include *
// ==/UserScript==

function reloadFlash(elm) {
	// We need to remove the node from the document and add it again to reload Flash.
	// In some cases, it's not sufficient to simply replace with the same node,
	// as this seems to get optimised and does nothing.
	// Therefore, use a clone of the node.
	elm.parentNode.replaceChild(elm.cloneNode(), elm);
}

function killWindowlessFlash(target) {
	// First, deal with embed elements.
	var elms = target.getElementsByTagName("embed");
	for (var i = 0; i < elms.length; ++i) {
		var elm = elms[i];
		if (elm.getAttribute("type") != "application/x-shockwave-flash")
			continue;
		if (elm.getAttribute("wmode") == "window")
			continue;
		elm.setAttribute("wmode", "window");
		// Parameters are only read when Flash is loaded.
		reloadFlash(elm);
	}

	// Now, deal with object elements.
	var elms = target.getElementsByTagName("object");
	for (var i = 0; i < elms.length; ++i) {
		var elm = elms[i];
		if (elm.getAttribute("type") != "application/x-shockwave-flash")
			continue;
		var params = elm.getElementsByTagName("param");
		for (var j = 0; j < params.length; ++j) {
			var param = params[j];
			if (param.getAttribute("name") != "wmode")
				continue;
			if (param.getAttribute("value") == "window")
				continue;
			param.setAttribute("value", "window");
			// Parameters are only read when Flash is loaded.
			reloadFlash(elm);
			break;
		}
	}
}

function onLoad(evt) {
	killWindowlessFlash(document);
}

window.addEventListener("load", onLoad);
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		killWindowlessFlash(mutation.target);
	});
});
observer.observe(document, {childList: true, subtree: true});
