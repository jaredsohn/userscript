// ==UserScript==
// @name		Google Translate - No Suggest Popup
// @namespace		
// @author		NettiCat
// @include		*74.*.*.*/translate*
// @include		*.translate.google.com/translate*
// @description	Suppresses annoying suggest popups on Google translated pages
// @date	  	01-03-2009
// @version	  	1.0
// ==/UserScript==







    document.addEventListener("mouseover", function(event){ event.stopPropagation(); event.preventDefault();}, true);