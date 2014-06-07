// ==UserScript==
// @name        disable_moz_css
// @namespace   http://userscripts.org/users/disable_moz_css
// @description disable mozilla extensions css
// @include     *
// @exclude     about:addons
// @version     1
// @grant       none
// ==/UserScript==

function removeMozRule(node) {
	if (typeof(node.cssRules) !== 'undefined') {
		for (var i = 0; i < node.cssRules.length; i++) {
			if (node.cssRules[i] instanceof CSSMozDocumentRule) {
				node.deleteRule(i);
			} else {
				removeMozRule(node.cssRules[i]);
			}
		}
	}
}

for (var i = 0; i < document.styleSheets.length; i++) {
	removeMozRule(document.styleSheets[i]);
}
