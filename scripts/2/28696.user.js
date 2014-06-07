// ==UserScript==
// @name            Allow autocomplete for all sites
// @namespace       tag:smashlong.info,2008-06-18:allowautocomplete
// @description     Removes autocomplete="off" attributes
// @include         *
// @version         0.2
// @changelog				Forms added to remove list, removeAttr function added
// ==/UserScript==

/**
 * Removes autocomplete=off thus allowing password saving in Firefox.
 */

var removeAttr = function(nodes) {
	for (var i = 0, l = nodes.length; i < l; i++) {
		nodes[i].setAttribute('autocomplete', 'on');
	}
}
removeAttr(document.getElementsByTagName('input'));
removeAttr(document.getElementsByTagName('form'));