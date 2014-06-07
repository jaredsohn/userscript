// ==UserScript==
// @name        Netflix UK VS USA
// @author      Richard Pratt
// @namespace   http://netflixukvsusa.blogspot.com
// @include     http://netflixukvsusa.blogspot.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @updateURL   http://userscripts.org/scripts/source/381044.user.js
// @downloadURL http://userscripts.org/scripts/source/381044.user.js
// @version     1
// @grant       none
// ==/UserScript==

$(document).ready(function(){
	$('.listings tr').each(function(){
		if ($(this).find('td').eq(0).find('img').length==1)
			$(this).detach();
	})
});