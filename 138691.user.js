// ==UserScript==
// @name       Compatible
// @namespace  http://skunkfrukt.se/
// @version    0.2
// @description  Fixes compatibility issues. That is, the issues people seem to be having with the word "compatibility" itself.
// @match      http://*/*
// @match      https://*/*
// @copyright  2012+, Namida Aneskans
// ==/UserScript==

String.prototype.reverse = function () {
	return this.split('').reverse().join('');
};

var fixed = document.body.innerHTML.reverse().replace(/(ytilib|elb|seitilib)(apmoc)(?![^>]*\<)/gi, "$1>u/<it>u<$2").reverse();
document.body.innerHTML = fixed;