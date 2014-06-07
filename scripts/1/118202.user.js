// ==UserScript==
// @name           Default monospace font
// @description    Replaces most monospace fonts with your default monospace font on all web pages
// @namespace      use_my_monospace
// @version        103
// @date           2013-12-30
// @include        *
// @exclude        http://localhost:4242/*
// ==/UserScript==
// Inspired by "Sans-Serif Default" from Peter Farmer

var mentionsMonospace = function(fontString) {
	return /(Courier|Consolas|monospace|Fixedsys|Inconsolata|Andale Mono|Sans Mono|Lucida Console|Lucida Mono|Monaco|Ubuntu Mono|UbuntuBeta Mono)/i.test(fontString);
};

var obviousVariableWidth = function(fontString) {
	return /^(Verdana|Tahoma|Arial)/i.test(fontString);
};

var fixFonts = function() {
	var elementList = document.querySelectorAll('*'); // non-live list
	var changeElements = [];
	for (var i=0; i < elementList.length; i++) {
		var elementItem = elementList[i];
		var computedStyle = getComputedStyle(elementItem, '');

		if((computedStyle != null && mentionsMonospace(computedStyle.fontFamily) && !obviousVariableWidth(computedStyle.fontFamily))
		|| (mentionsMonospace(elementItem.style.fontFamily) && !obviousVariableWidth(elementItem.style.fontFamily))) {
			changeElements.push(elementItem);
		}
	}

	delete i;

	for (var i=0; i < changeElements.length; i++) {
		var elem = changeElements[i];
		elem.style.setProperty("font-family", "monospace", "important");
	}
}

/**
 * GreaseMonkey scripts are run after the DOM is ready, but our script
 * is looking at style information, and external stylesheets may not have
 * been loaded/applied yet.
 *
 * Sample pages that need the setTimeout:
 * http://freedreno.github.io/
 * https://bugs.launchpad.net/xmir/+bug/1192843
 */

fixFonts();
unsafeWindow.setTimeout(fixFonts, 1000);
