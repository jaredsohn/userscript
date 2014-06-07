// ==UserScript==
// @name        Netflix Canada VS USA
// @author      Richard Pratt
// @namespace   http://netflixcanadavsusa.blogspot.com
// @include     http://netflixcanadavsusa.blogspot.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/381043.user.js
// @downloadURL http://userscripts.org/scripts/source/381043.user.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	$('.listings tr').each(function(){
		if ($(this).find('td').eq(1).find('img').length==1)
			$(this).detach();
	})
});