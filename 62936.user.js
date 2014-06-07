// ==UserScript==
// @name			Last.fm Flash Music Player Remover
// @author			Erik Vold
// @namespace		lastFMPlayerRemover
// @include			http://*.last.fm*
// @include			http://last.fm*
// @include			https://*.last.fm*
// @include			https://last.fm*
// @match			http://*.last.fm*
// @match			http://last.fm*
// @match			https://*.last.fm*
// @match			https://last.fm*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-27
// @lastupdated		2009-12-18
// @description		This userscript will attempt to remove the LastFM flash music player from the site. If it misses something let me know.
// ==/UserScript==

(function(){
	var tempEle = document.getElementById("player");
	if (tempEle) tempEle.parentNode.removeChild(tempEle);
})();