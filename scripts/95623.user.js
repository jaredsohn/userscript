// ==UserScript==
// @name           String Extensions
// @namespace      script.betterday.co.uk
// @description    STRING Object Extension
// ==/UserScript==

/* author: Nick Sewell ( contact: script@betterday.co.uk ) */

/*
	use @require in your userscript header to include this module 

	@require http://script.betterday.co.uk/modules/string.js

	please do not copy/paste this code into your script
	if you must please include a link back to the original!

	if you have any ideas, comments or problems please mail them to me
*/

/* Released under the GPL license - http://www.gnu.org/copyleft/gpl.html */

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};

String.prototype.getArgument = function(s) {
	var regExp = (new RegExp("[\\?&]"+s+"=([^&#]*)")).exec(this);
	return (regExp == null ? "" : regExp[1]);
};

String.prototype.getCoordinate = function() {
	var result = (new RegExp("\\[(\\s+):(\\d:)\\]")).exec(this);
	return (result.length == 3 ? { x: result[1], y: result[2] } : false);

};

String.prototype.replaceAll = function(pcFrom, pcTo){
	var i = this.indexOf(pcFrom);
	var c = this;
	while (i > -1) { c = c.replace(pcFrom, pcTo); i = c.indexOf(pcFrom); }
	return c;
};