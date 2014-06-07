// ==UserScript==
// @name			Times Colonist: Remove 'Inside Times Colonist'
// @author			Erik Vold
// @namespace		timescolonistRemoveInsideTC
// @include			http://timescolonist.com*
// @include			https://timescolonist.com*
// @include			http://www.timescolonist.com*
// @include			https://www.timescolonist.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-16
// @lastupdated		2010-01-16
// @description		This userscript automatically removes the 'Inside Times Colonist' junk.
// ==/UserScript==

(function(){
	var ele = document.getElementById('footerfeature');
	if (ele) ele.parentNode.removeChild(ele);
})();