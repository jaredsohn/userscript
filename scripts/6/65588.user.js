// ==UserScript==
// @name			Digg Remove Newsletter Signup
// @author			Erik Vold
// @namespace		diggRemoveNewsletterSignup
// @include			http*://*.digg.com*
// @include			http*://digg.com*
// @match			http*://*.digg.com*
// @match			http*://digg.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-02
// @lastupdated		2010-01-02
// @description		This userscript removes the newsletter sign-up form
// ==/UserScript==

(function(){
	var tempEles = document.getElementsByClassName('newsletter');

	// remove known ad class names
	for (var j = tempEles.length-1; j > -1; j++) {
		tempEles[j].parentNode.removeChild(tempEles[j]);
	}
})();