// ==UserScript==
// @name          DevExpress trial bar remover
// @namespace     http://userscripts.org/users/428460
// @description   Removes DexExpress trial bar from the top of the page
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include       http://localhost*
// ==/UserScript==

$('div').each(function (i, div) 
{
	if ($(div).css('z-index') == 100000 &&
		$(div).css('position') == 'absolute')
	{
		$(div).remove();
	}
});


