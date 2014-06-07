// ==UserScript==
// @name           jString
// @version        0.2
// @description    Extension to JavaScript String object. 
// @license        GPL v2
// @match          *
// ==/UserScript==

if (typeof String.prototype.startsWith === 'undefined') {
	String.prototype.startsWith = function(s) {
		return this.slice(0, s.length) == s;
	};
}

if (typeof String.prototype.endsWith === 'undefined') {
	String.prototype.endsWith = function(s) {
		return this.slice(-s.length) == s;
	};
}

if (typeof String.prototype.contains === 'undefined') {
	String.prototype.contains = function(s) {
		return this.indexOf(s) !== -1;
	};
}