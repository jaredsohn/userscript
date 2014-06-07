// ==UserScript==
// @name			New York Times: Remove 'Inside NYTimes.com'
// @author			Erik Vold
// @namespace		nytRemoveInsideNYTimes
// @include			http://*.nytimes.com*
// @include			http://nytimes.com*
// @include			https://*.nytimes.com*
// @include			https://nytimes.com*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2010-01-16
// @description		This userscript automatically removes the 'Inside NYTimes.com' junk.
// ==/UserScript==

(function(){
	var ele = document.getElementById('insideNYTimes');
	if (ele) ele.parentNode.removeChild(ele);
})();