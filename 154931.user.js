// ==UserScript==
// @name        NoSelect Killer
// @namespace   kahltor
// @description Finds noselectable text and removes this property.
// @include     *
// @version     0.2
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function fixUserSelect (userAgent) {
	$('*').filter(function() {
		return $(this).css(userAgent) == 'none';
	}).css(userAgent, 'text');
}

$(document).ready(function() {
	var userAgent = navigator.userAgent;
	if (userAgent.indexOf('Chrome') != -1) {
		fixUserSelect('webkitUserSelect');
	} else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		fixUserSelect('MozUserSelect');
	} else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
		fixUserSelect('msUserSelect');
	} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		fixUserSelect('userSelect');
	} else fixUserSelect('userSelect');
});