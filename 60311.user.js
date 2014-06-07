// ==UserScript==
// @name		Remove Top Ad From IMDB
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-22
// @namespace	imdbRemoveTopAd
// @include		http://imdb.com*
// @include		http://www.imdb.com*
// @include		https://imdb.com*
// @include		https://www.imdb.com*
// @version		0.1
// @description	This userscript will remove the top ad from IMDB.
// ==/UserScript==

(function(){
	var a=document.getElementById("supertab");
	if(a) a.parentNode.removeChild(a);
})();